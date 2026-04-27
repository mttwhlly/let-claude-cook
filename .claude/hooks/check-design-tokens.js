#!/usr/bin/env node
/**
 * Hook: check-design-tokens.js
 * Event: PreToolUse (Write | Edit | MultiEdit)
 *
 * Reads the file content Claude is about to write and blocks the write
 * if it contains hardcoded color values (hex, rgb, rgba) in .ts/.tsx files.
 *
 * Cross-platform: runs on Mac (bash) and Windows (node in PATH).
 */

const readline = require("readline");

const HEX_COLOR = /#([0-9a-fA-F]{3,8})\b/;
const RGB_COLOR = /\brgba?\s*\(/;

// Colors that are acceptable (e.g. in comments or test files)
const EXEMPT_PATTERNS = [/\.test\.(ts|tsx)$/, /\.spec\.(ts|tsx)$/, /\.md$/];

function isExempt(filePath) {
  if (!filePath) return false;
  return EXEMPT_PATTERNS.some((p) => p.test(filePath));
}

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");

  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    // If we can't parse input, don't block
    process.exit(0);
  }

  const filePath = input?.tool_input?.file_path || input?.tool_input?.path || "";
  const content = input?.tool_input?.content || input?.tool_input?.new_content || "";

  if (isExempt(filePath)) {
    process.exit(0);
  }

  // Only check TypeScript/TSX files
  if (!filePath.match(/\.(ts|tsx)$/)) {
    process.exit(0);
  }

  const lines = content.split("\n");
  const violations = [];

  lines.forEach((line, i) => {
    // Skip comment lines
    if (line.trim().startsWith("//") || line.trim().startsWith("*")) return;

    if (HEX_COLOR.test(line)) {
      violations.push(`Line ${i + 1}: Hardcoded hex color detected → "${line.trim()}"`);
    }
    if (RGB_COLOR.test(line)) {
      violations.push(`Line ${i + 1}: Hardcoded rgb/rgba detected → "${line.trim()}"`);
    }
  });

  if (violations.length > 0) {
    const message = [
      "🚫 Design token violation — hardcoded colors are not allowed in TypeScript files.",
      "",
      "Violations found:",
      ...violations.map((v) => `  • ${v}`),
      "",
      "✅ Fix: use theme.palette.* or import from '@caqh/design-tokens'",
      "   Example: color: theme.palette.primary.main",
      "   See .claude/skills/mui-patterns/SKILL.md for full guide.",
    ].join("\n");

    const output = {
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        decision: {
          behavior: "block",
          message,
        },
      },
    };

    process.stdout.write(JSON.stringify(output));
    process.exit(0);
  }

  process.exit(0);
}

main().catch(() => process.exit(0));
