/* On-chain USDT payment verification (static frontend + public RPC) */
(function (global) {
  const MERCHANT = '0x33e9064426Ea2B1Bd4830946c8D8b010d4Ef8A12';
  const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
  const USED_TX_KEY = 'crypto_mall_used_txs_v1';
  const ORDER_KEY = 'crypto_mall_pending_order_v1';
  const VERIFIED_KEY = 'crypto_mall_verified_order_v1';

  const ADDRESSES = {
    BEP20: MERCHANT,
    ERC20: MERCHANT,
    XLAYER: MERCHANT,
  };

  const NETWORKS = {
    BEP20: {
      label: 'BSC（BEP20）',
      usdt: '0x55d398326f99059fF775485246999027B3197955',
      decimals: 18,
      kind: 'evm',
      rpcs: [
        'https://bsc-dataseed.binance.org',
        'https://bsc-dataseed1.defibit.io',
        'https://bsc-dataseed1.ninicoin.io',
        'https://rpc.ankr.com/bsc',
      ],
      explorer: 'https://bscscan.com/tx/',
    },
    ERC20: {
      label: '以太坊（ERC20）',
      usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6,
      kind: 'evm',
      rpcs: [
        'https://ethereum.publicnode.com',
        'https://cloudflare-eth.com',
        'https://eth.llamarpc.com',
        'https://rpc.ankr.com/eth',
      ],
      explorer: 'https://etherscan.io/tx/',
    },
    XLAYER: {
      label: 'X Layer',
      usdt: '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
      decimals: 6,
      kind: 'evm',
      rpcs: [
        'https://rpc.xlayer.tech',
        'https://xlayerrpc.okx.com',
        'https://rpc.ankr.com/xlayer',
      ],
      explorer: 'https://www.okx.com/web3/explorer/xlayer/tx/',
    },
  };

  function getAddress(network) {
    return String(ADDRESSES[network] || '').trim();
  }

  function normAddr(a) {
    return String(a || '').trim().toLowerCase();
  }
  function normTx(h) {
    let s = String(h || '').trim();
    if (!s) return '';
    if (!s.startsWith('0x') && !s.startsWith('0X')) s = '0x' + s;
    return s.toLowerCase();
  }
  function isTxHash(h) {
    return /^0x[0-9a-f]{64}$/.test(normTx(h));
  }

  function loadUsed() {
    try {
      const raw = localStorage.getItem(USED_TX_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.map(normTx) : [];
    } catch {
      return [];
    }
  }
  function markUsed(tx) {
    const list = loadUsed();
    const n = normTx(tx);
    if (!list.includes(n)) {
      list.push(n);
      localStorage.setItem(USED_TX_KEY, JSON.stringify(list.slice(-500)));
    }
  }
  function isUsed(tx) {
    return loadUsed().includes(normTx(tx));
  }

  async function rpcCall(rpcUrl, method, params) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 18000);
    try {
      const res = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error('RPC HTTP ' + res.status);
      const j = await res.json();
      if (j.error) throw new Error(j.error.message || 'RPC error');
      return j.result;
    } finally {
      clearTimeout(timer);
    }
  }

  async function rpcFirst(rpcs, method, params) {
    let lastErr = null;
    for (const url of rpcs) {
      try {
        return await rpcCall(url, method, params);
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error('所有 RPC 均不可用');
  }

  function topicToAddress(topic) {
    if (!topic || topic.length < 66) return '';
    return ('0x' + topic.slice(26)).toLowerCase();
  }

  /**
   * Verify USDT Transfer to merchant for >= amountUsdt
   */
  async function verifyTxHash({ network, txHash, amountUsdt }) {
    const net = NETWORKS[network];
    if (!net) throw new Error('不支持的网络');
    const payTo = getAddress(network);
    if (!payTo) throw new Error('该网络收款地址未配置，请改选 BSC / 以太坊 / X Layer');
    const hash = normTx(txHash);
    if (!isTxHash(hash)) throw new Error('请输入正确的交易哈希（0x + 64 位）');
    if (isUsed(hash)) throw new Error('该交易哈希已被使用，请勿重复提交');

    const amount = Number(amountUsdt);
    if (!(amount > 0)) throw new Error('支付金额无效');

    const receipt = await rpcFirst(net.rpcs, 'eth_getTransactionReceipt', [hash]);
    if (!receipt) throw new Error('链上未找到该交易，请确认网络与哈希后重试');
    if (String(receipt.status).toLowerCase() !== '0x1') {
      throw new Error('交易未成功（status ≠ success）');
    }

    const merchant = normAddr(payTo);
    const usdt = normAddr(net.usdt);
    const minRaw = BigInt(10) ** BigInt(net.decimals) * BigInt(Math.ceil(amount));
    // allow exact amount; if float, use floor of amount * 10^decimals carefully
    // amount is integer USDT in this mall
    let paid = 0n;
    const logs = receipt.logs || [];
    for (const log of logs) {
      if (normAddr(log.address) !== usdt) continue;
      const t0 = (log.topics && log.topics[0] ? String(log.topics[0]).toLowerCase() : '');
      if (t0 !== TRANSFER_TOPIC) continue;
      if (!log.topics || log.topics.length < 3) continue;
      const to = topicToAddress(log.topics[2]);
      if (to !== merchant) continue;
      try {
        paid += BigInt(log.data || '0x0');
      } catch {
        /* ignore bad data */
      }
    }

    if (paid < minRaw) {
      throw new Error(
        `未检测到向收款地址转入 ≥ ${amount} USDT（当前网络 ${network}）。请确认打的是 USDT 且地址正确。`
      );
    }

    markUsed(hash);
    return {
      ok: true,
      network,
      txHash: hash,
      paidRaw: paid.toString(),
      decimals: net.decimals,
      amountUsdt: amount,
      merchant: MERCHANT,
      usdt: net.usdt,
      explorer: net.explorer + hash,
    };
  }

  function makeOrderId() {
    const t = Date.now().toString(36).toUpperCase();
    const r = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `JM${t}${r}`;
  }

  function savePending(order) {
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
  }
  function loadPending() {
    try {
      return JSON.parse(sessionStorage.getItem(ORDER_KEY) || 'null');
    } catch {
      return null;
    }
  }
  function saveVerified(order) {
    sessionStorage.setItem(VERIFIED_KEY, JSON.stringify(order));
  }
  function loadVerified() {
    try {
      return JSON.parse(sessionStorage.getItem(VERIFIED_KEY) || 'null');
    } catch {
      return null;
    }
  }
  function clearVerified() {
    sessionStorage.removeItem(VERIFIED_KEY);
  }

  global.CryptoMallPay = {
    MERCHANT,
    ADDRESSES,
    NETWORKS,
    getAddress,
    makeOrderId,
    savePending,
    loadPending,
    saveVerified,
    loadVerified,
    clearVerified,
    verifyTxHash,
    isTxHash,
    normTx,
    isUsed,
  };
})(window);
