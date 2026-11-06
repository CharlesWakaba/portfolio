# Automation blueprint

One pattern, three scenarios. Every concept build posts the same kind of JSON to a Make webhook.
The page you see in the browser is only the front end; the scenarios below are the product.

## The shared pattern

```
Site form  ->  Make webhook  ->  Validate + enrich  ->  Airtable row  ->  Email to sender  ->  Alert owner (if needed)  ->  Status-driven follow-ups
```

Every payload already includes `source`, `submitted_at` and `page` (added by `lib/form.js`).
Reuse one Airtable base ("Portfolio demos") with one table per build, and one Make scenario per table.

## Setup order (same for all three)

1. Airtable: create the table and fields listed below.
2. Make: new scenario, first module **Webhooks > Custom webhook**. Copy the URL.
3. Paste the URL into `config.js` under `WEBHOOKS` for that build.
4. Submit once from the live page so the webhook learns the data structure, then build the remaining modules.
5. Re-run the proof checklist at the bottom before calling it done.

---

## 1. property-maintenance

**Airtable table: `Maintenance Tickets`**

| Field | Type | Notes |
|---|---|---|
| Ticket ID | Autonumber | |
| Submitted at | Date and time | from `submitted_at` |
| Unit | Single line text | |
| Category | Single select | Plumbing, Heating or cooling, Electrical, Appliance, Doors/locks/windows, Pests, Other |
| Description | Long text | |
| Active hazard | Checkbox | |
| Priority | Single select | Emergency, Urgent, Routine. **Set by Make, not trusted from the browser** |
| Status | Single select | New, Assigned, Closed |
| Tenant name | Single line text | |
| Tenant email | Email | |
| Vendor | Single line text | filled on assignment |

**Make scenario**

1. Custom webhook.
2. Set variable `priority`: Emergency if `active_hazard` is true or the description contains any of: gas, flood, fire, smoke, sparking, sewage, burst, carbon monoxide, no heat, exposed wire. Urgent if it contains: leak, no hot water, locked out, no ac, refrigerator, toilet, clog, mold. Otherwise Routine. (Same keyword lists as the page preview, so tenant and system agree.)
3. Airtable: Create a record in `Maintenance Tickets` with `Priority` from step 2 and `Status` = New.
4. Router:
   - Priority = Emergency: SMS or push to the owner (Twilio, or an email-to-SMS gateway for a free demo) and email the on-call vendor.
   - Priority = Urgent: email the property manager and vendor.
   - Priority = Routine: no alert, the row is enough.
5. Email to tenant: ticket number, priority, response target (Emergency 1 hour, Urgent 4 hours, Routine 3 business days).
6. Second scenario, trigger **Airtable: Watch records** on `Status`: when it becomes Assigned or Closed, email the tenant.

---

## 2. clinic-intake

Demo only. The form collects **no health details** on purpose: visit type is a list, there is no free-text reason. Do not add one to a public demo.

**Airtable table: `Appointment Requests`**

| Field | Type |
|---|---|
| Request ID | Autonumber |
| Submitted at | Date and time |
| Visit type | Single select |
| Preferred day | Date |
| Time window | Single select (Morning, Afternoon, Any time) |
| Patient name | Single line text |
| Phone | Phone number |
| Email | Email |
| Status | Single select (Requested, Confirmed, Cancelled) |
| Confirmed slot | Date and time (set by staff) |

**Make scenario**

1. Custom webhook, then Airtable: Create record with Status = Requested.
2. Email to the front-desk inbox: "New request: {visit type}, {preferred day}, {time window}".
3. Second scenario, **Airtable: Watch records** on `Status` = Confirmed: email the patient the confirmed slot.
4. Third scenario, scheduled daily: find records where `Confirmed slot` is tomorrow, email a reminder.

Staff view: an Airtable grid view filtered to Status = Requested, sorted by Preferred day.

---

## 3. home-cleaning

**Airtable table: `Cleaning Leads`**

| Field | Type |
|---|---|
| Lead ID | Autonumber |
| Submitted at | Date and time |
| Service | Single select |
| Bedrooms / Bathrooms | Number |
| Size tier | Single line text |
| Frequency | Single select |
| Quote total (USD) | Currency |
| Name / Email / ZIP | text, email, text |
| Preferred date | Date |
| Status | Single select (New, Booked, Completed, Lost) |
| Follow-up sent | Checkbox |

**Make scenario**

1. Custom webhook, then Airtable: Create record with Status = New.
2. Email to the lead: the quote, the date they asked for, and what happens next.
3. Email to the owner: new lead with the quote total.
4. Second scenario, scheduled hourly: find records where Status = New, `Follow-up sent` is unchecked and `Submitted at` is more than 24 hours ago. Send the follow-up email, then tick `Follow-up sent`. Stops automatically once Status changes.

Re-calculate the total in Make from the inputs instead of trusting `quote_total_usd`, and flag a mismatch. The browser value is a convenience, not a source of truth.

---

## Proof checklist (per build, before it counts as done)

- [ ] Screenshot of the live page's address bar, then a test submission
- [ ] Screenshot of the new Airtable row, with the Priority/Status set by Make
- [ ] Screenshot of the confirmation email in the inbox
- [ ] Screenshot of the Make run history showing every module green
- [ ] For Make edits: OK, Save, hard refresh, reopen the scenario, screenshot it
- [ ] Delete test rows, or mark them `source = test`, so demo data never reads as real leads

Drop the screenshots into `assets/proof/` and link them from the matching build card on the portfolio. Screenshots of working runs are the strongest evidence on the page.
