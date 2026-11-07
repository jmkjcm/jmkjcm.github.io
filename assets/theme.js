/* Auto day / night theme: X Premium Lights Out at night, luxury white by day. No manual toggle. */
(function () {
  var DAY_START = 6;
  var DAY_END = 18;

  function isDay(now) {
    var h = now.getHours();
    return h >= DAY_START && h < DAY_END;
  }

  function apply() {
    var dark = !isDay(new Date());
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#000000' : '#ffffff');
  }

  function msUntilNextBoundary() {
    var now = new Date();
    var next = new Date(now);
    next.setSeconds(0, 0);
    if (isDay(now)) {
      next.setHours(DAY_END, 0, 0, 0);
    } else if (now.getHours() < DAY_START) {
      next.setHours(DAY_START, 0, 0, 0);
    } else {
      next.setDate(next.getDate() + 1);
      next.setHours(DAY_START, 0, 0, 0);
    }
    var ms = next.getTime() - now.getTime();
    return ms < 1000 ? 1000 : ms;
  }

  function schedule() {
    apply();
    setTimeout(schedule, msUntilNextBoundary());
  }

  /* Overlay a light ring + slight brighten on near-black logos in dark theme. Does not rewrite image files. */
  function markBlendingLogos(root) {
    (root || document).querySelectorAll('.logo-circle img').forEach(function (img) {
      if (img.getAttribute('data-logo-checked') === '1') return;
      function sample() {
        img.setAttribute('data-logo-checked', '1');
        var wrap = img.closest('.logo-circle');
        if (!wrap) return;
        try {
          var w = 32, h = 32;
          var c = document.createElement('canvas');
          c.width = w;
          c.height = h;
          var ctx = c.getContext('2d', { willReadFrequently: true });
          ctx.drawImage(img, 0, 0, w, h);
          var data = ctx.getImageData(0, 0, w, h).data;
          var lum = 0, n = 0;
          var y, x, i, edge;
          for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
              edge = x < 3 || y < 3 || x >= w - 3 || y >= h - 3;
              if (!edge) continue;
              i = (y * w + x) * 4;
              if (data[i + 3] < 20) continue;
              lum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
              n++;
            }
          }
          var src = (img.getAttribute('src') || img.src || '').toLowerCase();
          if (/upbit/.test(src) || (n && (lum / n) < 36)) wrap.classList.add('logo-ring');
          else wrap.classList.remove('logo-ring');
        } catch (err) {
          /* canvas tainted or not ready — leave unmarked */
        }
      }
      if (img.complete && img.naturalWidth) sample();
      else img.addEventListener('load', sample, { once: true });
    });
  }

  function watchLogos() {
    markBlendingLogos(document);
    if (!window.MutationObserver) return;
    var pending = false;
    var obs = new MutationObserver(function () {
      if (pending) return;
      pending = true;
      setTimeout(function () {
        pending = false;
        markBlendingLogos(document);
      }, 40);
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  apply();
  schedule();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watchLogos);
  } else {
    watchLogos();
  }
})();
