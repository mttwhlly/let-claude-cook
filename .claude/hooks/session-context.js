#!/usr/bin/env node
/**
 * Hook: session-context.js
 * Event: SessionStart
 *
 * Prints current git branch and status so Claude starts each session
 * with immediate awareness of where we are.
 */

const { execSync } = require("child_process");

function run(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch {
    return null;
  }
}

function main() {
  const branch = run("git rev-parse --abbrev-ref HEAD");
  const status = run("git status --short");
  const lastCommit = run("git log -1 --format='%h %s'");

  const lines = [
    "─── Session Context ───────────────────────────────",
    `Branch:      ${branch || "(unknown)"}`,
    `Last commit: ${lastCommit || "(none)"}`,
    `Status:      ${status ? `\n${status}` : "clean"}`,
    "────────────────────────────────────────────────────",
  ];

  // SessionStart hooks output to stdout as plain text
  process.stdout.write(lines.join("\n") + "\n");
  process.exit(0);
}

main();
