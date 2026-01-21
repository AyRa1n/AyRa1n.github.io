(function () {
  function enableOnThisPage() {
    var p = location.pathname.replace(/^\//, '');
    return (
      p.startsWith('archives/') ||
      p.startsWith('categories/') ||
      p.startsWith('link/') ||
      p.startsWith('about/')
    );
  }

  function mount() {
    if (!enableOnThisPage()) return;

    var header = document.getElementById('page-header');
    if (!header) return;

    // 防止重复插入
    if (header.querySelector('#video-top-wrap')) return;

    var wrap = document.createElement('div');
    wrap.id = 'video-top-wrap';
    wrap.innerHTML =
      '<video id="video-top" autoplay muted loop playsinline preload="auto">' +
        '<source src="/vedio/bg.mp4" type="video/mp4">' +
      '</video>';

    header.prepend(wrap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
