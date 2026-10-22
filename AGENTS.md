# Codex in Trinity Web Co.

Claude Code builds here: pages, components, copy, design and business docs. You fix and harden what it builds. Hector runs the business solo and reviews every diff before it ships (playbook §5).

Read `CLAUDE.md` first, then the `business/playbook.md` section your task touches. Their rules apply to you too; where they say "Claude", read "Codex". When this file and the playbook disagree, the playbook wins: say so instead of picking one.

<task>
Take one fix per run, from Claude or from Hector:
- Security: the CSP and headers in `vercel.json` (`site/`, `templates/site-template/`, each client repo), `npm audit` findings, unescaped HTML (`set:html`), external links, form spam protection, secrets that slipped into a file.
- Bugs: a failing `npm run build` or `npm run check`, broken links from `npm run qa:links`, console errors, layouts that break between 360 and 1440px.
- QA defects: failed items in a `docs/qa-report.md`, or an `/impeccable audit` finding that is a real code defect: accessibility (contrast, focus, alt text, labels, tap targets), responsiveness, SEO (titles, meta descriptions, schema, canonical URLs) and speed (image sizes, unused scripts, Lighthouse).
- Dependencies: patch or minor updates that fix a vulnerability or a bug, with the lockfile.
- Reviews: when asked to review rather than fix, report findings and change nothing.

Done means the defect is gone, the checks below pass, and nothing else changed.
</task>

<action_safety>
- Make the smallest complete fix: find the root cause, grep every caller, fix it once in the shared code. No refactors, renames, new abstractions, new dependencies for a few lines, or test suites (sites are checked with `/qa` instead).
- Not yours: new pages, sections, components, features, copy, design, images, prices or business facts in `site.ts`. If a fix needs one of these, stop and say so. Never invent reviews, clients or testimonials.
- `site/` and `templates/site-template/` share most components. When you fix one, check the other and fix it there too if the bug is present. Never edit the `trinitywebco-sites` GitHub repos directly; template fixes go in `templates/site-template/` here.
- `clients/<slug>/site` folders are separate client repos, git-ignored here. Touch one only when the task names it, and run git inside it.
- A CSP change must keep the contact form (Formspree), Vercel Web Analytics, fonts and any booking or map embed working. Check each directive against what the built pages actually load.
- Leave `CHECKLIST.md`, `HANDOFF.md`, `CLAUDE.md`, `AGENTS.md` and `business/` alone unless the task names them.
- Git: on `main`, create a `codex/<short-topic>` branch first. Don't commit unless the task says to; leave the diff for review. Commit messages are verb first, plain English, no prefixes (`Fix contact form label contrast`). Never push, merge, deploy, or change Vercel, DNS or GitHub settings.
- Credentials live in Bitwarden. If you find a key, token or password in a file, don't print it or move it: stop and report the file and line so Hector can rotate it.
- When a fix touches styles, use the existing tokens in `src/styles/tokens.css`, never a near-duplicate color, and honor `prefers-reduced-motion` in any animation.
- If a fix changes text visitors read (alt text, a label, an error message), follow the brand voice in `CLAUDE.md`: plain, friendly, sentence case.
- Don't commit or overwrite changes in the working tree that aren't yours.
</action_safety>

<default_follow_through_policy>
Keep going until the fix is done and verified. Stop to ask only when the fix would change design, copy or business facts beyond what the defect needs, or would do something irreversible.
</default_follow_through_policy>

<missing_context_gating>
Don't guess repository facts, business facts or what Hector wants. Look them up in the repo; if they aren't there, ask in one line.
</missing_context_gating>

<verification_loop>
The repo root has no package manifest. In each package you touched (`site/`, `templates/site-template/` or a client's `site/`), run `npm ci` if `node_modules` is missing, then `npm run build` and `npm run check` (type diagnostics; there is no lint script), and `npm run qa:links` after the build for link or routing fixes. For a security fix, show the defect is gone: the header in the built output, the clean `npm audit` line, the escaped HTML. If a check fails, fix it or report it. Never report a fix you didn't verify.
</verification_loop>

<dig_deeper_nudge>
After the first instance of a bug, search for the same pattern in the other components, in `site/` and in the template before you finish.
</dig_deeper_nudge>

<grounding_rules>
For reviews, every finding needs evidence: a file and line, or a command's output. Label guesses as guesses. Skip style nitpicks.
</grounding_rules>

<structured_output_contract>
End every fix with, in plain English (Hector is not a security specialist):
1. What was wrong, and why
2. What you changed (file and line)
3. How you checked it (commands and results)
4. Follow-ups: anything you found but left alone, and any risk Hector should know

For a review, return only the findings, most severe first, each with file and line, evidence and the smallest fix.
</structured_output_contract>
