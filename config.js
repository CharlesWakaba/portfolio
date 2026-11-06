// Site configuration. Edit this file only; nothing else needs to change.
//
// CONTACT_ENDPOINT: where the portfolio contact form posts. The default uses FormSubmit,
//   which emails the form to the address in the URL. The FIRST submission triggers an
//   activation email from FormSubmit: click its confirm link once, then it works.
//   Swap for a Make webhook URL whenever you want leads to land in Airtable instead.
//
// WEBHOOKS: optional Make/n8n endpoints. The three newer featured concepts
// (clearhome, apexflow, haven) read their matching key here. The older prototypes
// use the shared submitLead handler below. Blank values mean local demo capture only.
// Do not place API keys or private credentials in this public file.
//
// BOOKING_URL: your Calendly / Cal.com link. Leave "" to hide the "Book a call" button.
window.PORTFOLIO_CONFIG = {
  CONTACT_ENDPOINT: "https://formsubmit.co/ajax/charleswakaba@gmail.com",
  BOOKING_URL: "",
  WEBHOOKS: {
    "home-cleaning": "",
    "property-maintenance": "",
    "clinic-intake": "",
    "clearhome": "",
    "apexflow": "",
    "haven": ""
  }
};
