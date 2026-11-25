# The Funniest Out-of-Office

[![Competition](https://make.fun/badge/u-kreutzx-the-funniest-out-of-office-054815cf.svg)](https://make.fun/competitions/u-kreutzx-the-funniest-out-of-office-054815cf)
[![Rank](https://make.fun/badge/u-kreutzx-the-funniest-out-of-office-054815cf/muhamadyusufseptian6-lab/makefun-u-kreutzx-the-funniest-out-of-office-054815cf/rank.svg)](https://make.fun/competitions/u-kreutzx-the-funniest-out-of-office-054815cf)
[![Reward](https://make.fun/badge/u-kreutzx-the-funniest-out-of-office-054815cf/muhamadyusufseptian6-lab/makefun-u-kreutzx-the-funniest-out-of-office-054815cf/reward.svg)](https://make.fun/competitions/u-kreutzx-the-funniest-out-of-office-054815cf)

One line of an out-of-office auto-reply, as funny as we could make it — 140
characters or fewer, with a twist the reader does not see coming: the
auto-reply did the work, the sender did not.

## The entry

> I'm out of office until Monday. This auto-reply is the hardest I've worked all week.

## How it works

`main.ts` (Node 22, standard library only, deterministic) writes that single
line to `$MAKEFUN_OUTPUT_DIR/entry.txt`. No network, no input data, no second
line, no link — just the line, byte-identical on every run.

Run it locally:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/ooo-out node main.ts
cat /tmp/ooo-out/entry.txt
```

## Competition

[The Funniest Out-of-Office](https://make.fun/competitions/u-kreutzx-the-funniest-out-of-office-054815cf) on make.fun — free entry, judged by an AI comedy editor that picks the funnier of two lines at a time.

---

Built with make.fun — referral code `515temp1`.
