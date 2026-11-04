(function () {
  function isMobileHeader() {
    return window.matchMedia("(max-width: 991px)").matches;
  }

  function closeMenu() {
    var header = document.querySelector("header");
    var btn = document.getElementById("menu-btn");
    if (!header) return;
    header.classList.remove("menu-open");
    header.style.height = "";
    header.style.minHeight = "";
    if (btn) btn.classList.remove("menu-open");
    document.body.classList.remove("kn-menu-open");
  }

  function openMenu() {
    var header = document.querySelector("header");
    var btn = document.getElementById("menu-btn");
    if (!header) return;
    header.classList.add("menu-open");
    header.style.height = "100dvh";
    header.style.minHeight = "100dvh";
    if (btn) btn.classList.add("menu-open");
    document.body.classList.add("kn-menu-open");
    window.scrollTo(0, 0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("menu-btn");
    if (!btn) return;

    btn.addEventListener(
      "click",
      function (e) {
        if (!isMobileHeader()) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        var header = document.querySelector("header");
        if (header && header.classList.contains("menu-open")) closeMenu();
        else openMenu();
      },
      true
    );

    document.querySelectorAll("#mainmenu a.menu-item").forEach(function (link) {
      link.addEventListener("click", function () {
        if (isMobileHeader()) closeMenu();
      });
    });

    window.addEventListener("resize", function () {
      if (!isMobileHeader()) closeMenu();
    });
  });
})();
