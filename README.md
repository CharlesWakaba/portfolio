# Charles Wakaba — Portfolio

## What's included
- `index.html` — main portfolio landing page
- `builds/clearhome/` — cleaning business website concept, enquiry form and local demo inbox
- `builds/apexflow/` — home services contractor concept, enquiry form and local demo inbox
- `builds/haven/` — property management concept, enquiry form and local demo inbox
- `builds/home-cleaning/`, `builds/property-maintenance/`, `builds/clinic-intake/` — earlier prototypes retained
- `config.js` and `lib/form.js` — shared configuration and form handler for the portfolio and earlier prototypes
- `automation/BLUEPRINT.md` — proposed workflow designs and integration checklist

## Run locally
Open `index.html` in a browser, or serve this folder with a local static web server. For the demo inboxes, open the matching website and admin page in the same browser and on the same origin.

## What is functional now
- Main portfolio navigation and project links
- Responsive featured demo websites
- Required-field and email validation
- Demo form submission and local browser inbox for ClearHome, ApexFlow and Haven
- CSV export and clear-demo-data controls for each featured project
- Earlier prototype forms use the shared handler and clearly show demo mode if no endpoint is configured

## What is not connected yet
The three featured projects use browser local storage by default. Their test records do not leave the visitor's browser. No real CRM, Airtable, Make scenario, email, SMS, booking calendar, payment, technician dispatch or tenant notification is connected by this package.

The portfolio contact form uses FormSubmit at the configured address. FormSubmit requires the recipient to confirm its first activation email before ongoing delivery is enabled. This external service has not been verified from this package.

To connect a featured demo to Make, configure its webhook key in the root `config.js` under `WEBHOOKS`. The webhook must be tested from the deployed site; browser-to-webhook requests may also require provider-side CORS configuration. For production, prefer a secure server-side endpoint, validate data again on the server, add spam protection, and publish a privacy notice. Never put private API keys in frontend JavaScript.

## Publish on GitHub Pages
1. Extract the ZIP contents into the root of the existing `portfolio` repository, preserving the folder structure.
2. Review the changes locally and commit/push to the repository's publishing branch (`main`, if that is the configured branch).
3. In GitHub, open **Settings → Pages** and confirm the publishing source points to the repository root on the correct branch.
4. Wait for the Pages deployment to finish, then test the main page and each featured project URL.
5. Test the contact form and confirm the FormSubmit activation email before advertising it as a working contact channel.

## Important portfolio accuracy
OpenBoat is presented as the live product supplied in the existing portfolio. ClearHome, ApexFlow and Haven are fictional independent concept builds. Do not present demo inbox records as customer leads or describe external automations as live until their actual runs have been tested.
