#!/usr/bin/env node
/**
 * Hook: log-file-change.js
 * Event: PostToolUse (Write | Edit | MultiEdit)
 *
 * Appends a JSONL entry to .claude/logs/changes.jsonl for every file Claude writes.
 */

const fs = require("fs");
const path = require("path");

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

  const toolName = input?.tool_name || "unknown";
  const filePath =
    input?.tool_input?.file_path ||
    input?.tool_input?.path ||
    input?.tool_input?.new_path ||
    "unknown";

  const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const logDir = path.join(projectDir, ".claude", "logs");
  const logFile = path.join(logDir, "changes.jsonl");

  try {
    fs.mkdirSync(logDir, { recursive: true });
    const entry = JSON.stringify({
      ts: new Date().toISOString(),
      tool: toolName,
      file: filePath,
    });
    fs.appendFileSync(logFile, entry + "\n");
  } catch {
    // Never block on logging failure
  }

  process.exit(0);
}

main().catch(() => process.exit(0));
