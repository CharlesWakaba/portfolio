# ClearHome — portfolio concept

This is an interactive, responsive concept website included in the Charles Wakaba portfolio.

## Working in this demo
- Responsive service website and navigation
- Required-field and email validation
- Enquiry form capture
- Browser-local demo inbox at `admin.html`
- CSV export and clear-demo-data controls

## Demo limitations
Submissions are stored in the same browser and on the same origin only. They are not sent to a real CRM, email inbox, booking calendar, payment provider or dispatch system by default. A Make webhook can be configured in the root `config.js` under `WEBHOOKS.clearhome`, but it must be configured and tested separately. For production use, connect a secure server-side endpoint, add spam protection and privacy controls, and do not collect sensitive information in this demo.
