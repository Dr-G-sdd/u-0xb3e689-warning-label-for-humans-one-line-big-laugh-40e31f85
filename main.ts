// Warning Label for Humans: One Line, Big Laugh
// Writes a single original warning label for humans to entry.txt.
// Deterministic: the same bytes on every run. Standard library only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "WARNING: Do not operate while tired, hungry, or convinced you are right \u2014 this unit has never been wrong, according to this unit.";

// The gate requires 1-160 characters, a single line, and non-blank text.
// Fail loudly instead of shipping an entry the gate would reject.
if (LINE.length < 1 || LINE.length > 160) {
  throw new Error(`entry is ${LINE.length} characters; must be 1-160`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");
