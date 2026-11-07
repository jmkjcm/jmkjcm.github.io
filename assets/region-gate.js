(function () {
  var TITLE = '403 — Service Unavailable';
  var LINE_EN = 'EN This service is not available in your region.';
  var LINE_ZH = 'ZH 该服务在您所在的地区不可用。';
  var settled = false;

  function parseLoc(text) {
    var m = String(text).match(/(?:^|\n)loc=([A-Za-z]{2})/);
    return m ? m[1].toUpperCase() : '';
  }

  function paintUnavailable() {
    document.title = TITLE;
    document.documentElement.setAttribute('data-region', 'cn');
    document.documentElement.removeAttribute('data-region-pending');
    document.body.className = '';
    document.body.innerHTML =
      '<main style="min-height:100dvh;margin:0;background:#ffffff;display:flex;align-items:center;justify-content:center;padding:32px 24px;box-sizing:border-box">' +
        '<div style="max-width:560px;width:100%">' +
          '<h1 style="margin:0 0 22px;font-family:Inter,system-ui,-apple-system,sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#c62828;line-height:1.3">' + TITLE + '</h1>' +
          '<p style="margin:0 0 10px;font-family:Inter,system-ui,-apple-system,sans-serif;font-size:16px;line-height:1.65;color:#5f5f5f">' + LINE_EN + '</p>' +
          '<p style="margin:0;font-family:Inter,system-ui,-apple-system,sans-serif;font-size:16px;line-height:1.65;color:#5f5f5f">' + LINE_ZH + '</p>' +
        '</div>' +
      '</main>';
  }

  function showUnavailable() {
    if (document.body) paintUnavailable();
    else document.addEventListener('DOMContentLoaded', paintUnavailable);
  }

  function allow() {
    document.documentElement.removeAttribute('data-region-pending');
  }

  function finish(block, loc) {
    if (settled) return;
    settled = true;
    window.__CF_LOC = loc || window.__CF_LOC || '';
    if (window.CryptoMallI18n && typeof CryptoMallI18n.onRegion === 'function') {
      try { CryptoMallI18n.onRegion(window.__CF_LOC); } catch (e) {}
    }
    if (block) showUnavailable();
    else allow();
  }

  try {
    if (new URLSearchParams(location.search).get('view') === 'unavailable') {
      finish(true);
      return;
    }
  } catch (e) {}

  function checkUrl(url) {
    return fetch(url, { cache: 'no-store', credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error('bad');
      return r.text();
    }).then(parseLoc);
  }

  var urls = ['/cdn-cgi/trace', 'https://www.cloudflare.com/cdn-cgi/trace'];
  var i = 0;
  function next() {
    if (settled) return;
    if (i >= urls.length) { finish(false); return; }
    checkUrl(urls[i++]).then(function (loc) {
      if (settled) return;
      if (loc === 'CN') finish(true, loc);
      else if (loc) finish(false, loc);
      else next();
    }).catch(function () { next(); });
  }

  setTimeout(function () { finish(false); }, 3000);
  next();
})();
