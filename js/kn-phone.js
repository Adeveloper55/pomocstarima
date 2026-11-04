(function () {
  var number = "+381603273705";
  document.querySelectorAll("a.kn-call").forEach(function (link) {
    link.setAttribute("href", "tel:" + number);
  });
})();
