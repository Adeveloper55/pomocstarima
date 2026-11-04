(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector("header");
    var button = document.getElementById("menu-btn");
    var nav = document.querySelector(".header-col-mid");
    if (!header || !button || !nav) return;
    var mobile = window.matchMedia("(max-width: 993px)");
    var background = Array.from(document.querySelectorAll("#content, footer"));
    var savedScroll = 0;
    var open = false;
    document.querySelectorAll("#mainmenu a").forEach(function (link) {
      if (new URL(link.href).pathname.replace(/\/$/, "") === location.pathname.replace(/\/$/, "").replace(/\.html$/, "")) {
        link.setAttribute("aria-current", "page");
      }
    });
    function setOpen(next, restoreFocus) {
      if (next && !mobile.matches) return;
      if (next && !open) savedScroll = window.scrollY;
      open = next;
      header.classList.toggle("menu-open", open);
      button.classList.toggle("menu-open", open);
      document.body.classList.toggle("kn-menu-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Zatvori meni" : "Otvori meni");
      header.style.height = "";
      header.style.minHeight = "";
      nav.inert = mobile.matches && !open;
      background.forEach(function (element) { element.inert = open; });
      if (!open) {
        if (restoreFocus) {
          window.scrollTo(0, savedScroll);
          button.focus({preventScroll: true});
        }
        header.scrollTop = 0;
      }
    }
    button.addEventListener("click", function (event) {
      if (!mobile.matches) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setOpen(!open, true);
    }, true);
    header.addEventListener("keydown", function (event) {
      if (!open) return;
      if (event.key === "Escape") { event.preventDefault(); setOpen(false, true); }
      if (event.key === "Tab") {
        var items = Array.from(header.querySelectorAll("a[href], button")).filter(function (el) { return el.getClientRects().length && !el.closest("[inert]"); });
        var first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a") && mobile.matches) setOpen(false, false);
    });
    mobile.addEventListener("change", function () { setOpen(false, false); });
    setOpen(false, false);
  });
})();
