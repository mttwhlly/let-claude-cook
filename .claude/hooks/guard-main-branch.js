#!/usr/bin/env node
/**
 * Hook: guard-main-branch.js
 * Event: PreToolUse (Bash)
 *
 * Blocks: git push to main/master, git reset --hard
 */

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");

  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const command = input?.tool_input?.command || "";

  const blocked = [
    { pattern: /git\s+push\s+.*\bmain\b/, reason: "pushing directly to main is not allowed" },
    { pattern: /git\s+push\s+.*\bmaster\b/, reason: "pushing directly to master is not allowed" },
    { pattern: /git\s+push\s+--force/, reason: "force push is not allowed" },
    { pattern: /git\s+reset\s+--hard/, reason: "git reset --hard is not allowed — use a branch or stash instead" },
  ];

  for (const { pattern, reason } of blocked) {
    if (pattern.test(command)) {
      const output = {
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          decision: {
            behavior: "block",
            message: [
              `🚫 Blocked: ${reason}.`,
              "",
              "Branch convention: feature/<pod>/<ticket-id>-<short-description>",
              "Open a PR instead of pushing directly to main.",
            ].join("\n"),
          },
        },
      };
      process.stdout.write(JSON.stringify(output));
      process.exit(0);
    }
  }

  process.exit(0);
}

main().catch(() => process.exit(0));
