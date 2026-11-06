// Shared lead submission used by the portfolio contact form and all concept builds.
// kind: "contact" | "home-cleaning" | "property-maintenance" | "clinic-intake"
(function () {
  var cfg = window.PORTFOLIO_CONFIG || { WEBHOOKS: {} };

  window.submitLead = function (kind, payload) {
    var record = Object.assign(
      { source: kind, submitted_at: new Date().toISOString(), page: location.href },
      payload
    );
    var url = kind === "contact" ? cfg.CONTACT_ENDPOINT : (cfg.WEBHOOKS || {})[kind];

    if (!url) {
      return Promise.resolve({ ok: true, demo: true, record: record });
    }
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(record)
    })
      .then(function (res) {
        return res.json().catch(function () { return null; }).then(function (data) {
          var soft = data && String(data.success).toLowerCase() === "false";
          return { ok: res.ok && !soft, demo: false, record: record, status: soft ? "not activated" : res.status };
        });
      })
      .catch(function () { return { ok: false, demo: false, record: record, status: 0 }; });
  };

  // Writes the outcome into an element. Errors say what happened and what to do next.
  window.showResult = function (el, result, successText) {
    el.hidden = false;
    el.className = "result " + (result.ok ? "ok" : "bad");
    if (!result.ok) {
      el.textContent = "The request didn't go through (" + (result.status || "no connection") +
        "). Check your connection and send it again, or email charleswakaba@gmail.com.";
      return;
    }
    if (result.demo) {
      el.innerHTML = "";
      var p = document.createElement("p");
      p.textContent = "Demo mode: no webhook is connected, so nothing was sent. " +
        "This is the record the automation receives:";
      var pre = document.createElement("pre");
      pre.textContent = JSON.stringify(result.record, null, 2);
      el.appendChild(p);
      el.appendChild(pre);
      return;
    }
    el.textContent = successText;
  };
})();
