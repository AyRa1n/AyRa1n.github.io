(function () {
  const lines = [
    "欢迎来到 AyRa1n's farm 🌿
     记录 / 分享 / 学习,
    今天也要好好生活"
  ];

  const typeSpeed = 50;
  const startDelay = 200;
  const lineDelay = 600;

  function runTypedLines() {
    const subtitleEl =
      document.querySelector("#site-info .subtitle") ||
      document.querySelector("#site-info #subtitle") ||
      document.querySelector("#site-info .site-subtitle");

    if (!subtitleEl) return;

    // ✅ 防止重复初始化（比如页面重载/切换）
    if (subtitleEl.dataset.typedLinesInited === "1") return;
    subtitleEl.dataset.typedLinesInited = "1";

    subtitleEl.innerHTML = `
      <div id="typed-lines"></div>
      <div id="typed-current"></div>
    `;

    const linesBox = subtitleEl.querySelector("#typed-lines");
    const currentBox = subtitleEl.querySelector("#typed-current");

    function typeOne(i) {
      if (i >= lines.length) return;

      new Typed(currentBox, {
        strings: [lines[i]],
        typeSpeed,
        showCursor: true,
        cursorChar: "|",
        startDelay: i === 0 ? startDelay : 0,
        onComplete: (self) => {
          // ✅ 把已完成的句子追加到上面
          const finished = document.createElement("div");
          finished.className = "typed-line";
          finished.textContent = lines[i];
          linesBox.appendChild(finished);

          // 清空当前行
          currentBox.textContent = "";
          self.destroy();

          // ✅ 下一句继续打
          setTimeout(() => typeOne(i + 1), lineDelay);
        }
      });
    }

    typeOne(0);
  }

  // ✅ 首次加载
  function boot() {
    // 有些主题会晚一点渲染 #site-info，延迟一下更稳
    setTimeout(runTypedLines, 100);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  // ✅ 如果你后面开启了 pjax，这句能保证切页后也会重新生效
  document.addEventListener("pjax:complete", function () {
    boot();
  });
})();
