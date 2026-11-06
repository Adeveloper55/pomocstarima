(function () {
  var number = "+381603273705";
  var href = "tel:" + number;
  window.gtag_report_conversion = function (url) {
    var completed = false;
    var continueToCall = function () {
      if (completed) return;
      completed = true;
      if (typeof url !== "undefined") window.location = url;
    };
    var fallback = window.setTimeout(continueToCall, 1500);

    if (typeof window.gtag !== "function") {
      window.clearTimeout(fallback);
      continueToCall();
      return false;
    }

    window.gtag("event", "conversion", {
      send_to: "AW-18482209563/_1H4CMCPpLMdEJvGgO1E",
      event_callback: function () {
        window.clearTimeout(fallback);
        continueToCall();
      }
    });
    return false;
  };

  document.querySelectorAll("a.kn-call, a[href^='tel:']").forEach(function (a) {
    a.setAttribute("href", href);
    a.setAttribute("onclick", "return gtag_report_conversion(this.href);");
  });
})();
