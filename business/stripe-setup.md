# Stripe setup

How to set up Stripe for deposits, invoices and care-plan billing (playbook §6, "Invoicing and admin tools"). Prices come from playbook §2–4; if they change there, change them here too.

Written 2026-10-14, before the account exists. Stripe fees and screens checked that day against stripe.com/pricing and docs.stripe.com.

## Before you start

Stripe needs all four of these. Each one is on `CHECKLIST.md`.

- [ ] **Business name decided.** It goes on every invoice, receipt and card statement. Changing it later means redoing the public details and the statement descriptor.
- [ ] **Texas LLC and EIN.** Stripe asks for the business type, legal name and tax ID. Sign up as the LLC with the EIN, not as an individual with your SSN.
- [ ] **Business checking account.** Payouts go here, never to a personal account (playbook §6).
- [ ] **Business email and a website.** Stripe shows the email on receipts and asks for a website when you sign up.

Sales tax is a fifth question, but it doesn't block setup. See "Sales tax" below.

## What it costs

| Fee | Amount |
| --- | --- |
| Card | 2.9% + 30¢ |
| ACH bank transfer | 0.8%, capped at $5 |
| Stripe Invoicing (one-off invoices) | 0.4% per paid invoice |
| Stripe Billing (care-plan subscriptions) | 0.7% of what's billed |
| Dispute (chargeback) | $15, plus $15 if you respond (refunded if you win) |
| Refunds | Free to send, but **Stripe keeps the original fees** |

What that means on real invoices:

| Invoice | By card | By ACH |
| --- | --- | --- |
| Launch deposit, $249.50 (half of $499) | about $8.53 | about $2.99 |
| Growth deposit, $499.50 (half of $999) | about $16.78 | about $5.99 |
| Care plan, $49/mo | about $2.06 | about $0.73 |

Two things follow from the table:

- **Ask for ACH on build invoices.** Keep cards on as a fallback, and add a line to each invoice: "Paying by bank transfer (ACH) is easiest for both of us."
- **A refunded deposit still costs you its fees.** If a Growth client at $999 cancels before kickoff and gets the $499.50 deposit back, you're out about $16.78 by card, or $5.99 by ACH.

## One-time account setup

Do these once, in order, in the Stripe Dashboard.

1. **Sign up** as the LLC: business type "Single-member LLC", the legal name from the Certificate of Formation, the EIN, and the business address. Turn on two-step login. Save the login in Bitwarden.
2. **Bank account:** add the business checking account. Leave payouts on the automatic daily schedule.
3. **Public details** (Settings → Business → Public details): business name, the business email and phone for receipts, and the website.
4. **Statement descriptor:** what shows on the client's card statement. Use the business name, up to 22 characters. A clear one prevents "I don't recognize this charge" disputes.
5. **Branding:** logo, River `#1D6B66` as the brand color, Ink `#13262B` as the accent. These show on invoices, receipts and the payment page.
6. **Payment methods:** turn on cards and ACH Direct Debit (US bank account). Leave the others off.
7. **Invoice defaults** (Settings → Billing → Invoices): due in 15 days unless the scope says otherwise; send reminders before and after the due date; footer: "Questions about this invoice? Text or email [name] at [phone] / [email]."
8. **Failed care-plan payments** (Billing → Revenue recovery → Retries): Smart Retries, 8 tries within 2 weeks (Stripe's default). When retries run out: **"Leave the subscription past-due."** Don't pick cancel or pause. Playbook §3 says a care plan ends only by your written notice after 60 days unpaid, never automatically, and the site never goes offline. Also turn on retries for ACH (Local payment methods).
9. **Customer emails** (Settings → Billing → Subscriptions and emails): send receipts and failed-payment emails with a link to update the card. There are no trials: the care plan bills from launch day.
10. **Customer portal** (Settings → Billing → Customer portal): turn it on so clients can update their card or bank and see past invoices. **Turn off canceling and switching plans** in the portal. The contract needs 30 days' written notice to cancel (MSA §7.7), and plan changes go through a new scope page.

## Product catalog

Create these once (Product catalog → Add product). Names are what clients see on invoices.

**Website builds** (one-time):

| Product | Price |
| --- | --- |
| Launch website | From $499: set the price from the signed scope page on each invoice |
| Growth website | From $999: set the price from the signed scope page on each invoice |

**Care plan** (recurring, monthly):

| Product | Price |
| --- | --- |
| Care plan | $49/month |

**Add-ons and extra work** (one-time):

| Product | Price |
| --- | --- |
| Extra page | $150 |
| Extra revision round | $150 |
| Logo refresh (simple wordmark) | $250 |
| Google Business Profile full optimization | $250 |
| Extra work, per 30 minutes | $37.50 ($75/hour in 30-minute blocks) |
| Site handoff | $150 |

The Spanish version (+40%) and rush delivery (+25%) are percentages of the price the client actually pays (playbook §2), so type those as a line with the worked-out amount on each invoice.

## Invoicing a build

Each payment is its own invoice, sent when the scope page says it's due. Create the customer first: legal business name, the approver's email, and the client slug in the description so it matches the repo.

| Package | Invoice 1 (at signing) | Invoice 2 | Invoice 3 |
| --- | --- | --- | --- |
| Launch, Growth | Deposit, 50% | Final, 50%, before the domain points to the site | — |

Line wording, so the client can match each invoice to the scope page:

- "Growth website: deposit (50% of $[scope price])"
- "Growth website: final payment (50% of $[scope price])"

Add-ons go on the deposit invoice when they're agreed at signing, or on their own invoice when they're change orders.

**Timing:**

- An ACH payment takes about 4 business days to clear. Work starts only when the deposit has cleared (MSA §3.2), so book the kickoff call after that.
- Send the final invoice when the client approves the site, and don't touch DNS until Stripe shows it paid (playbook §4 launch checklist).

**Late fee:** Stripe doesn't add one by itself. If a balance is more than 15 days overdue, add the late fee as a line on the next invoice. The rate waits on the attorney review (MSA §3.5, playbook example 1.5% a month).

## Starting a care plan

The care plan is $49 a month and starts billing on launch day. There are no free or included months (playbook §3, MSA §7.2–7.3).

1. **At launch**, create a subscription for the customer on the Care plan product, set to charge automatically, with no trial. The first charge lands on launch day, and later ones on the same day each month. Put that date on the scope page ("billed on the ____ of each month").
2. **Edits are separate**: bill them on their own invoices with the "Extra work, per 30 minutes" product, quoted first.
3. **Get a payment method on file**: send the client the customer portal link so they can add a card or bank account. Ask for ACH; it costs them nothing extra and you about $0.73 a month instead of $2.06.
4. **If they declined a care plan** on the scope page, don't create a subscription. Do the handoff at launch instead ($150, playbook §4).

**When a care-plan payment fails:**

- Days 1–14: Stripe retries and emails the client. Nothing else to do.
- Day 15 and still unpaid: pause edits and care work (playbook §3). Hosting, forms and the site keep running.
- Day 60 after the due date: you may end the plan by written notice and hand off the site (MSA §7.6a). Cancel the subscription in Stripe yourself. The unpaid invoices stay open, and the $150 handoff fee goes on its own invoice.

**When a client cancels** (30 days' written notice): in Stripe, set the subscription to cancel on the date 30 days out. Invoice the $150 handoff fee if they want the repo transferred.

**Raising a price:** give 60 days' written notice (MSA §7.9), then update the subscription to a new price on the date the notice gives.

## Sales tax

Still open: whether Texas sales tax applies to the hosting in care plans (playbook §6, decisions log). Don't charge any until the Texas Comptroller or a CPA answers.

If it applies, there are two ways to add it:

- A manual tax rate on the care-plan subscriptions. Free, but you track the rate yourself.
- Stripe Tax: works out the rate for you, at 0.5% per transaction where you're registered.

At a handful of Dallas clients, a manual rate is enough. Fill the same answer into the blank on the scope page (§7).

## Dry run before the first client

New Stripe accounts come with a test mode (a sandbox). Fake cards and bank accounts work there, and nothing is charged. Run these once:

- [ ] Send a test Growth deposit invoice to your own email. Pay one copy with test card `4242 4242 4242 4242` and another by test ACH. Check the email, the invoice page and the receipt for the right name, logo and wording.
- [ ] Create a test care plan subscription ($49/month) starting today, with no trial. Confirm it charges today and on the same day next month.
- [ ] Open the customer portal link: you can update the payment method, and there's no cancel button.
- [ ] Refund a test payment and check what it costs.

Then switch to live mode and recreate the product catalog there.
