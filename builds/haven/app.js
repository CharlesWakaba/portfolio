// Haven Property Group: interactive portfolio demonstration.
// Demo records are stored in this browser only. Configure a secure backend or webhook
// before using this as a real business intake system. Never put private API keys here.
(() => {
  "use strict";
  const STORAGE_KEY = "haven_demo_leads";
  const WEBHOOK_URL = (window.PORTFOLIO_CONFIG?.WEBHOOKS || {})["haven"] || "";
  const form = document.getElementById("leadForm");
  const status = document.getElementById("success");
  if (!form || !status) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const show = (message, kind = "success") => {
    status.textContent = message;
    status.dataset.state = kind;
    status.setAttribute("role", "status");
    status.hidden = false;
    status.style.display = "block";
    status.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form.elements._website?.value) return;
    if (!form.reportValidity()) {
      show("Please complete the required fields and check the email address.", "error");
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    delete data._website;
    const lead = {
      ...data,
      project: "Haven Property Group",
      createdAt: new Date().toISOString(),
      status: "New",
      environment: "Portfolio demo"
    };

    submitButton.disabled = true;
    const originalLabel = submitButton.textContent;
    submitButton.textContent = "Submitting…";
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(existing)) throw new Error("Stored demo inbox data is invalid.");
      existing.unshift(lead);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (error) {
      show("This browser could not save the demo enquiry. Check that local storage is enabled, then try again.", "error");
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
      return;
    }

    let message = "Your demo enquiry has been captured in this browser. Open the demo inbox below to review or export it. No real email, booking or dispatch was triggered.";
    if (WEBHOOK_URL) {
      try {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead)
        });
        if (!response.ok) throw new Error("Webhook returned " + response.status);
        message = "Your demo enquiry is saved in this browser and the configured workflow accepted the request.";
      } catch (error) {
        message = "Your demo enquiry is saved locally, but the external workflow could not be reached. Check the webhook configuration.";
      }
    }
    show(message);
    form.reset();
    submitButton.disabled = false;
    submitButton.textContent = originalLabel;
  });
})();
