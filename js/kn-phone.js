(function () {
  var n = "";
  // Call controls are visual placeholders until the phone number is provided.
  if (!n) {
    document.querySelectorAll("a.kn-call").forEach(function (a) {
      a.addEventListener("click", function (event) { event.preventDefault(); });
    });
    return;
  }
  var href = "tel:" + String(n).replace(/\s+/g, "");
  document.querySelectorAll("a.kn-call").forEach(function (a) {
    a.setAttribute("href", href);
  });
})();
