// TDD-lite tests for the Funniest Out-of-Office entry.
// Run: node --test tests/entry.test.mjs  (from the entry directory)
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(dirname(fileURLToPath(import.meta.url)));
const mainTs = join(repoDir, "main.ts");

function runMain(outDir) {
  execFileSync("node", [mainTs], {
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    cwd: repoDir,
    stdio: "pipe",
  });
  return readFileSync(join(outDir, "entry.txt"), "utf8");
}

test("gate: entry.txt is UTF-8 text of 1 to 140 characters, not only whitespace", () => {
  const outDir = mkdtempSync(join(tmpdir(), "ooo-out-"));
  try {
    const text = runMain(outDir);
    assert.ok(text.length >= 1 && text.length <= 140, `length ${text.length} outside 1..140`);
    assert.ok(text.trim().length > 0, "entry must not be only whitespace");
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
});

test("format: entry is a single line, no link, no second line", () => {
  const outDir = mkdtempSync(join(tmpdir(), "ooo-out-"));
  try {
    const text = runMain(outDir);
    assert.ok(!text.includes("\n"), "entry must be one line");
    assert.ok(!/https?:\/\//.test(text), "entry must contain no link");
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
});

test("determinism: two runs write byte-identical entry.txt", () => {
  const outA = mkdtempSync(join(tmpdir(), "ooo-a-"));
  const outB = mkdtempSync(join(tmpdir(), "ooo-b-"));
  try {
    const a = runMain(outA);
    const b = runMain(outB);
    assert.equal(a, b);
  } finally {
    rmSync(outA, { recursive: true, force: true });
    rmSync(outB, { recursive: true, force: true });
  }
});

test("stdlib-only: main.ts imports only node: builtins", () => {
  const src = readFileSync(mainTs, "utf8");
  const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
  assert.ok(imports.length > 0, "main.ts should import node builtins");
  for (const spec of imports) {
    assert.ok(spec.startsWith("node:"), `non-stdlib import: ${spec}`);
  }
});
