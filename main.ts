// The Funniest Out-of-Office — make.fun entry program.
//
// Writes one line of an out-of-office auto-reply, the funniest we could
// make it, to $MAKEFUN_OUTPUT_DIR/entry.txt. Node 22, stdlib only,
// deterministic: the same run always writes the same bytes.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository directory from this script's own location,
// never from the process working directory.
const repoDir = dirname(fileURLToPath(import.meta.url));
void repoDir;

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? "/input";
void inputDir; // This competition ships no input data; the entry is fixed text.

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The entry: one line, 84 characters, no link, no second line.
// Twist: the auto-reply itself did the work — the sender did not.
const ENTRY =
  "I'm out of office until Monday. This auto-reply is the hardest I've worked all week.";

// Ensure the output directory exists without deleting or recreating it.
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
