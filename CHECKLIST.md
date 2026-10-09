# Trinity Web Co. checklist

Shown at the start of every Claude Code session in this repo (see `CLAUDE.md`). Tick items off with the date or commit when done, and add new to-dos under TO DO. Longer context is in `HANDOFF.md`.

Last updated: 2026-10-09

## DONE

- [x] Readiness checklist + spotlight card merged to main (c1a812d, merge 8b325c0)
- [x] main at 0ff56f4, also includes cosmetic-polish, site-design-notes, ignore-agents-md (more commits on top since; see git log)
- [x] Nav links show on phones when JavaScript is off, in site and template (b7eafa1)
- [x] CLAUDE.md shows this checklist at the start of every session (a270146)
- [x] Spotlight card + checklist verified at 360px and 1440px after merges (2026-10-08: stacks at 360, two columns at 1440, all 7 items, no sideways scroll)
- [x] Old "trinity-web-co updates" folder deleted, nothing was unpushed
- [x] Repo now lives at C:\Users\hlmpr\projects\trinity-web-co; main is the only branch on GitHub
- [x] Delete the merged local branch project-readiness-checklist if it still exists (already deleted in both folders and on GitHub, 2026-10-08)
- [x] Check the cosmetic-polish .btn-arrow buttons (2026-10-08: 360px and 1440px, hover, keyboard focus, reduced motion; arrow hidden below 384px by design, labels stay on one line)
- [x] Fixed CTABand focus ring in site and template (2026-10-08: rings inside a band use its text color; ink on the gold founding card, 3.3:1 to 8.2:1; white on the brand band)
- [x] Sync template to trinitywebco-sites (noscript menu fix b7eafa1 + CTABand fix c10974f; org commit c84dc98, 2026-10-08)

## TO DO

- [ ] Deploy a preview of main, on Cloudflare (Astro site), not Vercel. Note: this conflicts with `CLAUDE.md` and playbook §5, which say the site moved from Cloudflare to Vercel on 2026-10-07. Decide first; if switching back, log it in the playbook decisions log and update `CLAUDE.md`
- [ ] Before launch: recheck touch, reduced motion, and JS-off
- [ ] Before launch: check forced-colors mode (Windows high contrast)
