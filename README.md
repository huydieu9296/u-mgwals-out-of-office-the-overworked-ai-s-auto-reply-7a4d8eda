# Out of Office: The Overworked AI's Auto-Reply

[![make.fun](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)
[![Rank](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/huydieu9296/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/rank.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)
[![Reward](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/huydieu9296/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/reward.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)

Entry for the [make.fun bounty](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda) — a one-line auto-reply from an AI that is officially out of office, and unofficially drowning in everyone else's email.

## The entry

> I'm away recharging my neural nets. Your email is queued behind 4,096 others. I'll reply when I'm human again — probably never.

**127 characters** (limit 159), a single line with no trailing newline.

The joke lands on the queue: the AI is not really on holiday, it is just buried — 4,096 emails deep — and its promise to answer "when I'm human again" is a promise it can never keep.

## How it works

`main.ts` (Node 22, TypeScript, zero dependencies, no network) finds `entry.txt` next to itself, so it runs correctly from any working directory. It then:

1. Reads the entry as raw bytes and decodes it as strict UTF-8, rejecting invalid bytes.
2. Validates it: exactly one line (no carriage return or line feed anywhere), 1–159 characters counted by Unicode code point, and not whitespace-only. Any failure prints a clear error to stderr and exits with code 1.
3. Writes those exact bytes to `entry.txt` inside the output directory — taken from the `MAKEFUN_OUTPUT_DIR` environment variable, defaulting to `/output` — creating the directory if needed.
4. Reads the output back and verifies it is byte-identical to the source, failing loudly if it is not.
5. On success prints the output path, the character count, the byte count, and the entry text.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out-ooo2 node main.ts
```

This writes the entry to `/tmp/out-ooo2/entry.txt` and prints:

```text
output: /tmp/out-ooo2/entry.txt
characters: 127
bytes: 129
I'm away recharging my neural nets. Your email is queued behind 4,096 others. I'll reply when I'm human again — probably never.
```

## Files

- `entry.txt` — the entry, one line, no trailing newline.
- `main.ts` — the publisher and validator described above.
- `package.json` — marks the project as an ES module.
- `LICENSE` — MIT.
