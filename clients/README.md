# Clients

One folder per client, named with the client slug: `<business>-<area>`, lowercase, hyphens (e.g. `rivera-hvac-garland`). See playbook §5, naming conventions.

```
<client-slug>/
  admin/                   Business paperwork. Never goes in the site repo.
    brief.md               Contact info, goals, decisions, status
    proposal.md            What we quoted
    content-checklist.md   What they owe us, and what's arrived
    notes.md               Running log of calls, emails and change requests (newest first)
    (contract, invoices and intake answers go here too)
  site/                    The client's site repo, cloned from trinitywebco-sites (git-ignored here)
```

## Starting a new client

1. **After the discovery call:** copy `_template/` to `clients/<client-slug>/` and fill in `admin/brief.md` and `admin/proposal.md`.
2. **Once the contract is signed and the deposit clears:** on GitHub, open `trinitywebco-sites/site-template` and click "Use this template". Name the new repo `site-<client-slug>` in the `trinitywebco-sites` org.
3. **Clone it into this folder:**
   ```
   git clone https://github.com/trinitywebco-sites/site-<client-slug>.git clients/<client-slug>/site
   ```
4. Paste the intake form answers into `site/docs/intake.md`, then run `/new-site` in that repo. The repo's own `CLAUDE.md` takes it from there.
5. Create the Vercel project with the same name as the repo (`site-<client-slug>`).

The site repo has its own git history. This repo ignores `clients/*/site/`, so client code is never committed here.

Lead tracking (before anyone's a client) lives in `business/sales/prospect-tracker.csv`.

**Never store passwords or card numbers here.** Reference credentials by their item name in Bitwarden.
