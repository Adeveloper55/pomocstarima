(function () {
  var n = "";
  if (!n) return;
  var href = "tel:" + String(n).replace(/\s+/g, "");
  document.querySelectorAll("a.kn-call").forEach(function (a) {
    a.setAttribute("href", href);
  });
})();
