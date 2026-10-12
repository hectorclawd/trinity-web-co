// SessionStart hook: shows the Trinity Web Co. checklist at the top of every session in this repo.
// Edit CHECKLIST.md (at the repo root); this script only reads it.
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "..", "CHECKLIST.md");
let md;
try {
  md = fs.readFileSync(file, "utf8");
} catch {
  process.exit(0);
}

// "## DONE" holds older history. Under "## TO DO", each bold line (**Group**) starts a group,
// and items are ticked in place inside their group.
let doneEarlier = 0;
const groups = [];
let section = "";
for (const line of md.split(/\r?\n/)) {
  const h = line.match(/^##\s+(.*)/);
  if (h) {
    section = h[1].trim().toLowerCase();
    continue;
  }
  const item = line.match(/^\s*-\s*\[( |x|X)\]\s+(.*)/);
  if (section === "done") {
    if (item) doneEarlier++;
  } else if (section === "to do") {
    const g = line.match(/^\*\*(.+?)\*\*\s*$/);
    if (g) groups.push({ title: g[1].trim(), open: [], done: 0 });
    else if (item && groups.length) {
      const s = groups[groups.length - 1];
      item[1] === " " ? s.open.push(item[2]) : s.done++;
    }
  }
}

// Top 3: the first open items in launch order, skipping groups that are on hold.
const next = groups.filter((s) => !/^on hold/i.test(s.title)).flatMap((s) => s.open).slice(0, 3);

const out = ["", "🔷 TRINITY WEB CO. — pick ONE and go", ""];
if (next.length) {
  next.forEach((t, i) => out.push(`  ${i + 1}. ${t}`));
} else {
  out.push("  Nothing open. Ask Claude: \"what's next?\"");
}
out.push("");

for (const s of groups) {
  const total = s.open.length + s.done;
  if (!total) continue;
  const tail = s.open.length ? `→ ${s.open[0]}` : "✓ all done";
  out.push(`  ${s.title} (${s.done}/${total})  ${tail}`);
}
if (doneEarlier) out.push(`  Done earlier (${doneEarlier})`);
const shown = path.resolve(file).replace(/\\/g, "/");
out.push("", `  Full list: ${shown}`);

const display = out.join("\n");
process.stdout.write(
  JSON.stringify({
    systemMessage: display,
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext:
        `The user's Trinity Web Co. checklist lives at ${shown}. It was just shown to them:\n${display}\n\n` +
        "When the user finishes an item, tick it in place inside its group (- [x]) with the date or commit; " +
        "don't move it to DONE. Add new to-dos to the right group under TO DO, in launch order. " +
        "Keep the 'Last updated' date current.",
    },
  })
);
