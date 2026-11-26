// Out of Office — entry publisher.
//
// The entry is an overworked AI's auto-reply: it claims to be away
// recharging its neural nets while the sender's email waits behind
// 4,096 others, and promises a human reply that will probably never
// come. The joke is the queue — the AI is not on holiday, it is just
// buried under everybody else's mail first.
//
// This script copies that one-line entry, kept in entry.txt beside
// the script, into the output directory and checks the copy byte
// for byte, so what the judge reads is exactly what was written.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_CHARS = 159;

function die(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(here, "entry.txt");

  let raw: Buffer;
  try {
    raw = readFileSync(sourcePath);
  } catch {
    die(`cannot read entry file at ${sourcePath}`);
  }

  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(raw!);
  } catch {
    die("entry is not valid UTF-8");
  }

  // One line means one line: a carriage return or a line feed
  // anywhere — even a trailing newline at the end of the file —
  // would split the entry, so both are rejected outright.
  if (text!.includes("\r") || text!.includes("\n")) {
    die("entry must be exactly one line: no line breaks allowed, not even a trailing newline");
  }

  // Count Unicode code points, not UTF-16 code units, so characters
  // outside the basic multilingual plane (emoji, for example) count
  // as one character each, the way a reader counts them.
  const chars = [...text!].length;
  if (chars < 1 || chars > MAX_CHARS) {
    die(`entry must be 1 to ${MAX_CHARS} characters, got ${chars}`);
  }

  if (text!.trim().length === 0) {
    die("entry must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outPath, raw!);
  } catch (err) {
    die(`cannot write output file at ${outPath}: ${(err as Error).message}`);
  }

  const back = readFileSync(outPath);
  if (!back.equals(raw!)) {
    die("output does not match the source entry");
  }

  console.log(`output: ${outPath}`);
  console.log(`characters: ${chars}`);
  console.log(`bytes: ${raw!.length}`);
  console.log(text!);
}

main();
