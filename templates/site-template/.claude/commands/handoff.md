---
description: Write the client's "Your website" handoff document from site.ts
---

Write `docs/your-website.md`, the "Your website" document from the playbook (section 4, Handoff), using `src/content/site.ts`, `CLAUDE.md` and `docs/intake.md`. Write it for the business owner: plain English, no jargon, short.

Include:

1. **Your site:** the live URL, and the date it launched.
2. **Your domain:** which registrar it's with, and that the account is in the client's name. Never include a password. Refer to the Bitwarden shared item by name.
3. **Who to contact:** Hector, Trinity Web Co., the email and phone from Trinity's details, and the response time for their care plan (Care Essential: 3 business days; Care Standard: 1 business day; Care Plus: same business day).
4. **What your care plan covers:** the plan name, price, edit time per month, report, Google Business Profile posts and anything else included, from playbook section 3. Also say how to request an edit: one email with everything in it.
5. **Renewal:** the 3 bundled months of Care Standard end on {{date}}, then the plan renews monthly by auto-charge, with 30 days' notice to cancel.
6. **Your accounts:** Google Business Profile, Search Console, analytics and booking tool. Say who owns each (the client) and who has manager access (Trinity Web Co.).
7. **Your review link:** `site.googleReviewUrl`, and a note that the printed QR code points there.
8. **If you ever leave:** the code transfers to their GitHub account, with help moving hosting, for a one-time $150 fee.

End with a reminder of the day-7 check-in (testimonial and Google review) and the day-30 results email. Don't invent any fact that isn't in the source files. Mark anything missing as `{{TO FILL}}` and list it at the end.
