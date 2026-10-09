# Trinity Web Co. checklist

Shown at the start of every Claude Code session in this repo (see `CLAUDE.md`). Tick items off with the date or commit when done, and add new to-dos under TO DO. Longer context is in `HANDOFF.md`.

Last updated: 2026-10-08

## DONE

- [x] Readiness checklist + spotlight card merged to main (c1a812d, merge 8b325c0)
- [x] main at 0ff56f4, also includes cosmetic-polish, site-design-notes, ignore-agents-md
- [x] Spotlight card + checklist verified at 360px and 1440px after merges (2026-10-08: stacks at 360, two columns at 1440, all 7 items, no sideways scroll)
- [x] Old "trinity-web-co updates" folder deleted, nothing was unpushed
- [x] Repo now lives at C:\Users\hlmpr\projects\trinity-web-co; main is the only branch on GitHub
- [x] Delete the merged local branch project-readiness-checklist if it still exists (already deleted in both folders and on GitHub, 2026-10-08)

## TO DO

- [ ] Check the cosmetic-polish .btn-arrow buttons (only shared style the merge changed)
- [ ] Deploy a preview of main, on Cloudflare (Astro site), not Vercel. Note: this conflicts with `CLAUDE.md` and playbook §5, which say the site moved from Cloudflare to Vercel on 2026-10-07. Decide first; if switching back, log it in the playbook decisions log and update `CLAUDE.md`
- [ ] Before launch: recheck touch, reduced motion, and JS-off
- [ ] Sync focus-forward-site and desktop-tutorial
- [ ] Restart the dev server if needed (astro dev on port 4321 was stopped during cleanup)
- [ ] Sync template to trinitywebco-sites (noscript menu fix + CTABand fix)
