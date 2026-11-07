/* zh / en overlay. Auto by region; manual override via #btn-lang. Product names overlay in English; catalog JSON unchanged. */
(function (global) {
  var STORAGE_KEY = 'mall-lang';
  var ZH_LOCS = { CN: 1, HK: 1, MO: 1, TW: 1 };
  var lang = 'zh';

  var DICT = {
    zh: {
      'title.index': '加密货币商城 · 加密科技传媒',
      'title.pay': '付款验证 · 加密货币商城',
      'title.inquire': '询价确认 · 加密货币商城',
      'title.contact': '人工联系 · 加密货币商城',
      'title.terms': '服务条款 · 加密货币商城',
      'nav.support': '人工客服',
      'nav.support_title': 'Telegram 人工客服',
      'nav.cart': '购物车',
      'nav.close': '关闭',
      'nav.back': '← 返回',
      'nav.back_mall': '← 返回商城',
      'nav.home': '回商城',
      'nav.terms': '服务条款',
      'nav.contacts': '联系方式',
      'nav.lang': '语言',
      'hero.title': '加密货币商城',
      'hero.tagline': '购买流程 - 选择业务 - 付USDT - 有任何问题直接联系人工客服',
      'cat.current': '当前分类',
      'cat.all': '全部分类',
      'cat.all_items': '全部',
      'cat.pick': '选择业务分类',
      'cat.tabs': '业务分类',
      'cat.avatar': '头像信息收录',
      'cat.hotsearch': '热搜和广告',
      'cat.listing_spot': '交易所上现货',
      'cat.listing_spot_futures': '上合约',
      'cat.alpha': 'Alpha',
      'cat.bot': '机器人',
      'cat.audit': '审计报告',
      'cat.media': '媒体宣发和直播',
      'cat.dev': '网站和DAPP开发',
      'cat.app_publish': 'APP上架',
      'cat.incubate': '其他业务',
      'hot.label': '热门',
      'hot.nav': '热门分类',
      'hotcat.avatar': '头像信息收录',
      'hotcat.listing_spot': '交易所上线',
      'hotcat.listing_spot_futures': '上合约',
      'hotcat.alpha': 'Alpha',
      'section.hot': '热门业务',
      'section.more': '更多业务',
      'section.all': '全部业务',
      'tag.hot': '热门',
      'btn.inquire': '询价',
      'btn.buy': '购买',
      'btn.add': '加购',
      'btn.add_aria': '加入购物车',
      'empty.cat': '该分类暂无服务',
      'empty.cart': '购物车是空的',
      'empty.cart_hint': '挑选业务后点「加购」',
      'meta.suffix': '价格以列表为准，询价项请联系人工客服',
      'meta.all': '{n} 项业务 · {suffix}',
      'meta.cat': '{name} · {n} 项业务 · {suffix}',
      'close.note': '本分类目前 {n} 项。如需其他上架或定制服务，请联系人工客服',
      'close.cta': '联系人工客服',
      'toast.copied': '已复制',
      'toast.select': '请先选择业务',
      'toast.need_inquire': '该业务需联系人工客服询价',
      'toast.added': '已加入购物车',
      'toast.cleared': '已清空',
      'toast.cart_empty': '购物车是空的',
      'toast.catalog_fail': '目录加载失败，请刷新',
      'toast.wechat': '微信号已复制',
      'toast.paid': '付款已确认',
      'toast.need_price': '请先联系人工客服确认价格',
      'toast.addr_missing': '该网络地址未配置',
      'toast.summary': '询价摘要已复制',
      'toast.order_summary': '订单摘要已复制',
      'toast.wechat_manual': '请手动复制 The666TH',
      'cart.title': '购物车',
      'cart.total': '合计',
      'cart.checkout': '去付款',
      'cart.clear': '清空',
      'cart.minus': '减少',
      'cart.plus': '增加',
      'pay.page': '付款 · 链上验证',
      'pay.steps': '付款步骤',
      'pay.step1': '确认订单',
      'pay.step2': '转账 USDT',
      'pay.step3': '链上验证',
      'pay.amount': '应付金额',
      'pay.amount_sub': '金额以订单为准',
      'pay.amount_sub_ok': '请按下方金额转账 USDT',
      'pay.amount_sub_q': '含询价业务 · 请先联系人工客服确认价格',
      'pay.oid': '订单号',
      'pay.copy': '复制',
      'pay.copy_addr': '复制地址',
      'pay.transfer_title': '选择网络并转账',
      'pay.transfer_hint': '请自主选择转账网络。默认 BSC（BEP20），也可选以太坊、X Layer。请确保钱包网络与所选一致。',
      'pay.net_group': '选择 USDT 网络',
      'pay.addr_prefix': 'USDT 收款地址（',
      'pay.addr_suffix': '）',
      'pay.addr_missing': '该网络收款地址暂未配置',
      'pay.addr_missing_warn': '该网络收款地址尚未配置，请改选 BSC / 以太坊 / X Layer。',
      'pay.warn_before': '请向上述地址转入',
      'pay.warn_after': '。转错网络或金额不足将无法通过验证。',
      'pay.verify_title': '粘贴交易哈希并验证',
      'pay.verify_hint': '付款成功后，在钱包或区块浏览器复制 Tx Hash，粘贴到下方。验证通过后才会显示客服联系方式。',
      'pay.tx_ph': '0x… 交易哈希',
      'pay.verify': '验证付款',
      'pay.verifying': '链上验证中…',
      'pay.verify_note': '不会因点击「我已付款」解锁 · 必须链上验证成功',
      'pay.contact_title': '价格待确认 · 联系人工客服',
      'pay.contact_hint': '该业务价格显示为 888 USDT，需人工确认后才能付款。请通过以下方式联系客服，确认金额后再转账。',
      'pay.copy_wx': '复制微信 The666TH',
      'pay.contact_warn': '请勿自行猜测金额转账。确认价格前，页面金额保持为 888 USDT。',
      'pay.hint_mixed': '{n} USDT（询价项另计，请先联系客服）',
      'pay.ok': '验证成功！正在进入人工联系页…',
      'pay.fail': '验证失败',
      'pay.no_auto': '询价业务无法自动验证，请联系人工客服',
      'net.BEP20': 'BSC（BEP20）',
      'net.ERC20': '以太坊（ERC20）',
      'net.XLAYER': 'X Layer',
      'inquire.page': '询价确认',
      'inquire.h1': '联系客服确认价格',
      'inquire.lead': '该业务需联系人工客服确认价格后再付款，当前无需转账。',
      'inquire.empty': '未找到询价业务，请返回商城重新选择。',
      'inquire.biz': '询价业务',
      'inquire.ref': '参考报价',
      'inquire.ref_note': '参考报价，最终以客服确认为准',
      'inquire.hint': '请通过下方方式联系客服，告知业务名称。价格确认后，再按确认金额付款。',
      'inquire.warn': '请勿按参考报价自行转账。',
      'inquire.cta': 'Telegram 人工客服',
      'inquire.open_chat': '点击打开对话',
      'inquire.open_x': '点击打开主页',
      'inquire.wx_hint': '复制微信号添加好友',
      'inquire.copy_summary': '复制询价摘要',
      'inquire.wx_label': '微信',
      'inquire.summary_title': '【加密货币商城 · 询价】',
      'inquire.summary_biz': '业务：',
      'inquire.summary_ref': '参考报价：888 USDT（最终以客服确认为准）',
      'contact.page': '人工联系',
      'contact.locked': '联系方式未解锁',
      'contact.locked_p': '请先完成 USDT 付款并在付款页通过链上验证。',
      'contact.go': '去选业务',
      'contact.verified': '付款已验证',
      'contact.order': '订单：',
      'contact.net': '网络：',
      'contact.amt': '金额：',
      'contact.help': '请任选一种方式联系客服，发送订单号与交易哈希以便交付：',
      'contact.copy_summary': '复制订单摘要（方便发给客服）',
      'contact.summary_title': '【加密货币商城 · 已验证订单】',
      'contact.s_order': '订单号：',
      'contact.s_net': '网络：',
      'contact.s_amt': '金额：',
      'contact.s_tx': 'Tx：',
      'contact.s_biz': '业务：',
      'wx.footer_title': '微信 The666TH（点击复制）',
      'wx.aria': '微信',
      'err.rpc': '所有 RPC 均不可用',
      'err.net': '不支持的网络',
      'err.addr': '该网络收款地址未配置，请改选 BSC / 以太坊 / X Layer',
      'err.hash': '请输入正确的交易哈希（0x + 64 位）',
      'err.used': '该交易哈希已被使用，请勿重复提交',
      'err.bad_amt': '支付金额无效',
      'err.not_found': '链上未找到该交易，请确认网络与哈希后重试',
      'err.failed_tx': '交易未成功（status ≠ success）',
      'err.amount': '未检测到向收款地址转入 ≥ {amount} USDT（当前网络 {network}）。请确认打的是 USDT 且地址正确。',
      'terms.updated': '最近更新：2026年11月7日（Asia/Shanghai）'
    },
    en: {
      'title.index': 'Crypto Mall · 加密科技传媒',
      'title.pay': 'Payment · Crypto Mall',
      'title.inquire': 'Inquiry · Crypto Mall',
      'title.contact': 'Contact · Crypto Mall',
      'title.terms': 'Terms of Service · Crypto Mall',
      'nav.support': 'Support',
      'nav.support_title': 'Telegram support',
      'nav.cart': 'Cart',
      'nav.close': 'Close',
      'nav.back': '← Back',
      'nav.back_mall': '← Back to mall',
      'nav.home': 'Back to mall',
      'nav.terms': 'Terms of Service',
      'nav.contacts': 'Contact',
      'nav.lang': 'Language',
      'hero.title': 'Crypto Mall',
      'hero.tagline': 'How to buy — choose a service — pay in USDT — contact support if you have any questions',
      'cat.current': 'Current category',
      'cat.all': 'All categories',
      'cat.all_items': 'All',
      'cat.pick': 'Choose a category',
      'cat.tabs': 'Categories',
      'cat.avatar': 'Profile listing',
      'cat.hotsearch': 'Trending & ads',
      'cat.listing_spot': 'Spot listing',
      'cat.listing_spot_futures': 'Futures listing',
      'cat.alpha': 'Alpha',
      'cat.bot': 'Bots',
      'cat.audit': 'Audit reports',
      'cat.media': 'Media & livestream',
      'cat.dev': 'Website & DApp development',
      'cat.app_publish': 'App publishing',
      'cat.incubate': 'Other services',
      'hot.label': 'Featured',
      'hot.nav': 'Featured categories',
      'hotcat.avatar': 'Profile listing',
      'hotcat.listing_spot': 'Exchange listing',
      'hotcat.listing_spot_futures': 'Futures listing',
      'hotcat.alpha': 'Alpha',
      'section.hot': 'Featured',
      'section.more': 'More services',
      'section.all': 'All services',
      'tag.hot': 'Featured',
      'btn.inquire': 'Inquire',
      'btn.buy': 'Buy',
      'btn.add': 'Add',
      'btn.add_aria': 'Add to cart',
      'empty.cat': 'No services in this category',
      'empty.cart': 'Your cart is empty',
      'empty.cart_hint': 'Choose a service, then tap Add',
      'meta.suffix': 'Prices as listed; contact support to inquire',
      'meta.all': '{n} services · {suffix}',
      'meta.cat': '{name} · {n} services · {suffix}',
      'close.note': 'This category currently has {n} items. Contact support for other listings or custom work.',
      'close.cta': 'Contact support',
      'toast.copied': 'Copied',
      'toast.select': 'Please choose a service first',
      'toast.need_inquire': 'Please contact support for a quote',
      'toast.added': 'Added to cart',
      'toast.cleared': 'Cart cleared',
      'toast.cart_empty': 'Your cart is empty',
      'toast.catalog_fail': 'Could not load the catalog. Please refresh.',
      'toast.wechat': 'WeChat ID copied',
      'toast.paid': 'Payment confirmed',
      'toast.need_price': 'Please contact support to confirm the price first',
      'toast.addr_missing': 'This network address is not configured',
      'toast.summary': 'Inquiry summary copied',
      'toast.order_summary': 'Order summary copied',
      'toast.wechat_manual': 'Please copy The666TH manually',
      'cart.title': 'Cart',
      'cart.total': 'Total',
      'cart.checkout': 'Checkout',
      'cart.clear': 'Clear',
      'cart.minus': 'Decrease',
      'cart.plus': 'Increase',
      'pay.page': 'Payment · on-chain verification',
      'pay.steps': 'Payment steps',
      'pay.step1': 'Confirm order',
      'pay.step2': 'Transfer USDT',
      'pay.step3': 'Verify on-chain',
      'pay.amount': 'Amount due',
      'pay.amount_sub': 'Amount follows your order',
      'pay.amount_sub_ok': 'Transfer this USDT amount',
      'pay.amount_sub_q': 'Includes quote items · confirm pricing with support first',
      'pay.oid': 'Order ID',
      'pay.copy': 'Copy',
      'pay.copy_addr': 'Copy address',
      'pay.transfer_title': 'Choose a network and transfer',
      'pay.transfer_hint': 'Please choose the transfer network yourself. BSC (BEP20) is the default; Ethereum and X Layer are also available. Make sure your wallet network matches.',
      'pay.net_group': 'Choose a USDT network',
      'pay.addr_prefix': 'USDT receiving address (',
      'pay.addr_suffix': ')',
      'pay.addr_missing': 'Receiving address not configured for this network',
      'pay.addr_missing_warn': 'Receiving address is not configured for this network. Please switch to BSC, Ethereum, or X Layer.',
      'pay.warn_before': 'Please send',
      'pay.warn_after': ' to the address above. A wrong network or insufficient amount will fail verification.',
      'pay.verify_title': 'Paste the transaction hash to verify',
      'pay.verify_hint': 'After paying, copy the Tx Hash from your wallet or block explorer and paste it below. Support details appear only after verification succeeds.',
      'pay.tx_ph': '0x… transaction hash',
      'pay.verify': 'Verify payment',
      'pay.verifying': 'Verifying on-chain…',
      'pay.verify_note': 'Clicking “I paid” will not unlock this · on-chain verification is required',
      'pay.contact_title': 'Price to confirm · contact support',
      'pay.contact_hint': 'This service shows 888 USDT as a reference quote and needs support confirmation before payment. Contact us below, then transfer the confirmed amount.',
      'pay.copy_wx': 'Copy WeChat The666TH',
      'pay.contact_warn': 'Do not guess an amount and transfer it. Until the price is confirmed, the page amount stays at 888 USDT.',
      'pay.hint_mixed': '{n} USDT (quote items billed separately — contact support first)',
      'pay.ok': 'Verified. Opening the contact page…',
      'pay.fail': 'Verification failed',
      'pay.no_auto': 'Quote items cannot be verified automatically. Please contact support.',
      'net.BEP20': 'BSC (BEP20)',
      'net.ERC20': 'Ethereum (ERC20)',
      'net.XLAYER': 'X Layer',
      'inquire.page': 'Inquiry',
      'inquire.h1': 'Contact support to confirm the price',
      'inquire.lead': 'This service requires a confirmed price from support before payment. No transfer is needed now.',
      'inquire.empty': 'No inquiry item was found. Please return to the mall and choose again.',
      'inquire.biz': 'Inquiry items',
      'inquire.ref': 'Reference quote',
      'inquire.ref_note': 'Reference only. The final amount is confirmed by support.',
      'inquire.hint': 'Contact support below and share the service name. After the price is confirmed, pay the confirmed amount.',
      'inquire.warn': 'Do not transfer the reference quote on your own.',
      'inquire.cta': 'Telegram support',
      'inquire.open_chat': 'Open chat',
      'inquire.open_x': 'Open profile',
      'inquire.wx_hint': 'Copy the WeChat ID to add a friend',
      'inquire.copy_summary': 'Copy inquiry summary',
      'inquire.wx_label': 'WeChat',
      'inquire.summary_title': '[Crypto Mall · Inquiry]',
      'inquire.summary_biz': 'Services: ',
      'inquire.summary_ref': 'Reference quote: 888 USDT (final amount confirmed by support)',
      'contact.page': 'Contact',
      'contact.locked': 'Contact details are locked',
      'contact.locked_p': 'Please complete the USDT payment and pass on-chain verification first.',
      'contact.go': 'Choose a service',
      'contact.verified': 'Payment verified',
      'contact.order': 'Order: ',
      'contact.net': 'Network: ',
      'contact.amt': 'Amount: ',
      'contact.help': 'Contact support with your order ID and transaction hash so we can deliver:',
      'contact.copy_summary': 'Copy order summary (to send to support)',
      'contact.summary_title': '[Crypto Mall · Verified order]',
      'contact.s_order': 'Order ID: ',
      'contact.s_net': 'Network: ',
      'contact.s_amt': 'Amount: ',
      'contact.s_tx': 'Tx: ',
      'contact.s_biz': 'Services: ',
      'wx.footer_title': 'WeChat The666TH (tap to copy)',
      'wx.aria': 'WeChat',
      'err.rpc': 'All RPC endpoints are unavailable',
      'err.net': 'Unsupported network',
      'err.addr': 'Receiving address not configured. Please switch to BSC, Ethereum, or X Layer',
      'err.hash': 'Enter a valid transaction hash (0x + 64 hex characters)',
      'err.used': 'This transaction hash has already been used',
      'err.bad_amt': 'Invalid payment amount',
      'err.not_found': 'Transaction not found on-chain. Check the network and hash, then try again.',
      'err.failed_tx': 'Transaction did not succeed (status ≠ success)',
      'err.amount': 'No transfer of ≥ {amount} USDT to the receiving address was found on {network}. Confirm you sent USDT to the correct address.',
      'terms.updated': 'Last updated: 7 November 2026 (Asia/Shanghai)',
      'prod.dev-binance-ai': "Binance AI mode DApp website",
      'prod.app-google': "Google Play app publishing",
      'prod.app-apple': "Apple App Store publishing",
      'prod.alpha-binance': "Binance Alpha",
      'prod.au-ck': "CertiK (CK) audit",
      'prod.dev-dapp': "DApp development",
      'prod.ls-upbit-spot': "Upbit spot listing",
      'prod.ls-binance-sf': "Binance futures listing",
      'prod.av-tp': "TokenPocket (TP) profile",
      'prod.av-dextools': "DEXTools profile",
      'prod.av-ave': "Ave.ai (AVE) profile",
      'prod.av-dexs': "DexScreener Eagle profile",
      'prod.av-bitget': "Bitget profile",
      'prod.av-feixiaohao': "FeiXiaoHao profile",
      'prod.av-cg': "CoinGecko profile",
      'prod.av-cmc': "CoinMarketCap (CMC) profile",
      'prod.av-okx': "OKX Web3 profile",
      'prod.av-binance': "Binance Wallet profile",
      'prod.av-metamask': "MetaMask profile (Fox wallet)",
      'prod.av-trust': "Trust Wallet profile",
      'prod.av-debox': "DeBox profile",
      'prod.hs-ave': "Ave.ai trending",
      'prod.hs-ave-banner': "Ave.ai banner ad",
      'prod.hs-dextools': "DEXTools trending",
      'prod.hs-eagle': "DexScreener Eagle trending",
      'prod.hs-debox-banner': "DeBox banner / red packet / ads",
      'prod.alpha-okx': "Zhimen Alpha",
      'prod.alpha-bybit': "Bybit Alpha (GET)",
      'prod.bot-pump-sol': "Pump.fun inner-pool instant fill / instant trade (SOL)",
      'prod.bot-bsc': "BSC all-platform inner-pool instant fill",
      'prod.bot-mcap': "Market-cap bot",
      'prod.au-lianan': "Beosin audit",
      'prod.au-pink': "Pink Audit",
      'prod.au-slowmist': "SlowMist audit",
      'prod.au-other': "Other audit reports",
      'prod.md-jinse': "Jinse Finance news promotion",
      'prod.md-odaily': "Odaily promotion",
      'prod.md-chaincatcher': "ChainCatcher promotion",
      'prod.md-binance-live': "Binance livestream",
      'prod.md-huobi-live': "HTX livestream",
      'prod.md-youtube': "YouTube video promotion matrix",
      'prod.md-whitepaper': "Whitepaper / video / website materials",
      'prod.dev-official': "Official website development",
      'prod.dev-exchange': "Exchange development",
      'prod.dev-game': "Blockchain game development",
      'prod.inc-hatch': "Project incubation",
      'prod.inc-shell': "Major-exchange shell trading",
      'prod.inc-msb': "Overseas company / foundation / MSB license",
      'prod.inc-endorse': "Institutional endorsement",
      'prod.inc-legal': "Legal compliance opinion",
      'prod.inc-ceo': "Foreign CEO / project meetings",
      'prod.ls-binance-spot': "Binance spot listing",
      'prod.ls-coinbase-spot': "Coinbase spot listing",
      'prod.ls-okx-spot': "OKX spot listing",
      'prod.ls-bybit-spot': "Bybit spot listing",
      'prod.ls-bitget-spot': "Bitget spot listing",
      'prod.ls-zhimen-spot': "Zhimen spot listing",
      'prod.ls-kucoin-spot': "KuCoin spot listing",
      'prod.ls-mexc-spot': "MEXC spot listing",
      'prod.ls-htx-spot': "HTX spot listing",
      'prod.ls-cryptocom-spot': "Crypto.com spot listing",
      'prod.ls-bitfinex-spot': "Bitfinex spot listing",
      'prod.ls-bingx-spot': "BingX spot listing",
      'prod.ls-kraken-spot': "Kraken spot listing",
      'prod.ls-lbank-spot': "LBank spot listing",
      'prod.ls-bitstamp-spot': "Bitstamp spot listing",
      'prod.ls-bithumb-spot': "Bithumb spot listing",
      'prod.ls-xt-spot': "XT.COM spot listing",
      'prod.ls-bitflyer-spot': "bitFlyer spot listing",
      'prod.ls-gemini-spot': "Gemini spot listing",
      'prod.ls-coinbase-fut': "Coinbase futures listing",
      'prod.ls-upbit-fut': "Upbit futures listing",
      'prod.ls-okx-sf': "OKX futures listing",
      'prod.ls-bybit-fut': "Bybit futures listing",
      'prod.ls-bitget-sf': "Bitget futures listing",
      'prod.ls-zhimen-fut': "Zhimen futures listing",
      'prod.ls-kucoin-fut': "KuCoin futures listing",
      'prod.ls-mexc-fut': "MEXC futures listing",
      'prod.ls-htx-sf': "HTX futures listing",
      'prod.ls-cryptocom-fut': "Crypto.com futures listing",
      'prod.ls-bitfinex-fut': "Bitfinex futures listing",
      'prod.ls-bingx-fut': "BingX futures listing",
      'prod.ls-kraken-fut': "Kraken futures listing",
      'prod.ls-lbank-fut': "LBank futures listing",
      'prod.ls-bitstamp-fut': "Bitstamp futures listing",
      'prod.ls-bithumb-fut': "Bithumb futures listing",
      'prod.ls-xt-fut': "XT.COM futures listing",
      'prod.ls-bitflyer-fut': "bitFlyer futures listing",
      'prod.ls-gemini-fut': "Gemini futures listing",
      'prod.ls-cmc': "CoinMarketCap listing",
      'prod.ls-cg': "CoinGecko listing",
      'prod.ls-fxh': "FeiXiaoHao listing",
      'prod.ls-rootdata': "RootData media listing"
    }
  };

  var ERR_MAP = {
    '所有 RPC 均不可用': 'err.rpc',
    '不支持的网络': 'err.net',
    '该网络收款地址未配置，请改选 BSC / 以太坊 / X Layer': 'err.addr',
    '请输入正确的交易哈希（0x + 64 位）': 'err.hash',
    '该交易哈希已被使用，请勿重复提交': 'err.used',
    '支付金额无效': 'err.bad_amt',
    '链上未找到该交易，请确认网络与哈希后重试': 'err.not_found',
    '交易未成功（status ≠ success）': 'err.failed_tx',
    '询价业务无法自动验证，请联系人工客服': 'pay.no_auto'
  };

  function fill(s, vars) {
    if (!vars || typeof vars !== 'object') return s;
    return String(s).replace(/\{(\w+)\}/g, function (_, k) {
      return vars[k] != null ? vars[k] : _;
    });
  }

  function t(key, vars) {
    var d = DICT[lang] || DICT.zh;
    var s = d[key];
    if (s == null && typeof vars === 'string') return vars;
    if (s == null) s = DICT.zh[key];
    if (s == null) return key;
    return fill(s, typeof vars === 'object' ? vars : null);
  }

  function translateError(msg) {
    if (!msg) return t('pay.fail');
    if (ERR_MAP[msg]) return t(ERR_MAP[msg]);
    var m = String(msg).match(/^未检测到向收款地址转入 ≥ (.+) USDT（当前网络 (.+)）。请确认打的是 USDT 且地址正确。$/);
    if (m) return t('err.amount', { amount: m[1], network: m[2] });
    return msg;
  }

  function apply() {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.documentElement.setAttribute('data-lang', lang);
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    }
    nodes = document.querySelectorAll('[data-i18n-placeholder]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key));
    }
    nodes = document.querySelectorAll('[data-i18n-aria]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      key = el.getAttribute('data-i18n-aria');
      if (key) el.setAttribute('aria-label', t(key));
    }
    nodes = document.querySelectorAll('[data-i18n-title]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      key = el.getAttribute('data-i18n-title');
      if (key) el.setAttribute('title', t(key));
    }
    nodes = document.querySelectorAll('[data-lang-panel]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      var panel = el.getAttribute('data-lang-panel');
      var on = panel === lang;
      el.hidden = !on;
      el.style.display = on ? '' : 'none';
    }
    var btn = document.getElementById('btn-lang');
    if (btn) btn.setAttribute('aria-label', t('nav.lang'));
  }

  function readSaved() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      return v === 'zh' || v === 'en' ? v : '';
    } catch (e) {
      return '';
    }
  }

  function langFromLoc(loc) {
    if (!loc) return '';
    return ZH_LOCS[String(loc).toUpperCase()] ? 'zh' : 'en';
  }

  function langFromNavigator() {
    var n = String((typeof navigator !== 'undefined' && (navigator.language || navigator.userLanguage)) || '').toLowerCase();
    return n.indexOf('zh') === 0 ? 'zh' : 'en';
  }

  function setLang(next, manual) {
    if (next !== 'zh' && next !== 'en') return;
    lang = next;
    if (manual) {
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    }
    apply();
    try {
      document.dispatchEvent(new CustomEvent('mall-langchange', { detail: { lang: lang } }));
    } catch (e) {}
  }

  function onRegion(loc) {
    if (readSaved()) {
      apply();
      return;
    }
    setLang(langFromLoc(loc) || langFromNavigator(), false);
  }

  function bindLangButton() {
    var btn = document.getElementById('btn-lang');
    if (!btn || btn.getAttribute('data-bound') === '1') return;
    btn.setAttribute('data-bound', '1');
    btn.addEventListener('click', function () {
      setLang(lang === 'zh' ? 'en' : 'zh', true);
    });
  }

  var saved = readSaved();
  if (saved) lang = saved;
  else if (global.__CF_LOC) lang = langFromLoc(global.__CF_LOC) || langFromNavigator();
  else lang = langFromNavigator();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      apply();
      bindLangButton();
    });
  } else {
    apply();
    bindLangButton();
  }

  function productName(id, fallback) {
    return t('prod.' + id, fallback || id);
  }

  global.CryptoMallI18n = {
    t: t,
    error: translateError,
    apply: apply,
    setLang: setLang,
    onRegion: onRegion,
    productName: productName,
    get lang() { return lang; }
  };
  global.t = t;
})(window);
