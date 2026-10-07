# Clients

One folder per client, named in kebab-case after the business (e.g. `oak-cliff-tacos/`).

**To start a new client:** copy `_template/` and rename it. Once the contract is signed, copy `templates/starter-site/` into `<client>/site/`.

```
<client>/
  brief.md               Contact info, goals, decisions, status
  proposal.md            What we quoted
  content-checklist.md   What they owe us, and what's arrived
  notes.md               Running log of calls, emails and change requests (newest first)
  site/                  Their website (its own git repo when it goes live)
```

Lead tracking (before anyone's a client) lives in `business/sales/prospect-tracker.csv`.

**Never store passwords or card numbers here.** Reference credentials by their name in the password manager.
