# Out of Office: The Overworked AI's Auto-Reply

[![make.fun](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)
[![Rank](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/huydieu9296/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/rank.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)
[![Reward](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/huydieu9296/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/reward.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)

Entry for the make.fun bounty: [Out of Office: The Overworked AI's Auto-Reply](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)

## The entry

> I'm away recharging my neural nets. Your email is queued behind 4,096 others. I'll reply when I'm human again — probably never.

**127 characters** (limit: 159). Exactly one line, no trailing newline.

## How it works

`main.ts` reads the entry from `entry.txt` (kept next to the program so it
works from any current working directory), validates it — valid UTF-8,
exactly one line, 1–159 characters, not only whitespace, no CR/LF anywhere —
and writes it byte-identical to `$MAKEFUN_OUTPUT_DIR/entry.txt`
(default `/output`). It then re-reads the output and verifies it matches
byte-for-byte before reporting success. No network is used.

## Run

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out-ooo node main.ts
```

This writes `/tmp/out-ooo/entry.txt` (127 characters, 129 bytes) and prints
the entry. Requires Node.js 18+ (uses only `node:fs`, `node:url`, `node:path`).
