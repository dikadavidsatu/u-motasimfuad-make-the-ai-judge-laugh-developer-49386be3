// Make the AI Judge Laugh: Developer Excuses
// make.fun entry — writes a single original developer excuse to
// /output/entry.txt.
//
// The excuse: the outage is blamed on the load balancer doing its job
// too well — it routed traffic to the one server the developer forgot
// existed. The twist flips the usual "the load balancer is broken"
// complaint into an admission: the infrastructure worked, the human
// forgot a machine. Jargon is right (load balancer, routed traffic,
// server), the voice is a developer deflecting in an incident call,
// and the punch lands in the last few words: the forgotten server.
// One line, 120 characters, no setup beyond the setup itself.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const EXCUSE =
  "The outage wasn't my code — the load balancer finally did its job and routed traffic to the one server I forgot existed.";

export const MAX_CHARS = 200;
export const OUTPUT_PATH = "/output/entry.txt";

/** The competition gate: 1-200 characters of UTF-8 text, not only whitespace. */
export function isValidEntry(text: string): boolean {
  if (typeof text !== "string") return false;
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) return false;
  if (text.trim().length === 0) return false;
  if (text.includes("\n") || text.includes("\r")) return false;
  return true;
}

function main(): void {
  if (!isValidEntry(EXCUSE)) {
    throw new Error(
      `Excuse fails the gate: ${[...EXCUSE].length} chars (limit ${MAX_CHARS})`,
    );
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, EXCUSE, "utf8");
  // Read it back and re-check the gate on exactly what was written,
  // so a partial write or encoding slip fails loudly instead of
  // silently shipping an invalid entry.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== EXCUSE || !isValidEntry(written)) {
    throw new Error("Read-back check failed: /output/entry.txt is not the excuse");
  }
  console.log(`Wrote ${[...EXCUSE].length} chars to ${OUTPUT_PATH}`);
  console.log(EXCUSE);
}

main();
