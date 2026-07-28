# Idea catalogue

A wide list, deliberately unfiltered. Pick from it later; the point right now
is range, not commitment.

Every idea is scored on one axis that matters more than novelty:

**Edge** — how much of this can you do that a competent stranger cannot?
Your unfair advantages are event sourcing, deterministic replay, honest
measurement under a pre-registered rule, data pipelines, OCR, and knowing the
Indonesian domain from the inside. Ideas that use none of those are worse ideas
for *you*, however good they are in general.

`★★★` unusually strong fit · `★★` good fit · `★` fine, but you are competing on
even ground

---

## Blockchain

### Already specced

**restake-tvr** `★★★` — how much restaking collateral is actually redeemable?
See `LAB_PLAN.md`. TVL is structurally inflated, restaking makes it worse by
design, and the existing commentary is qualitative. Recommended first.

**chain-replay** `★★★` — an indexer that proves it reindexed correctly.
Bit-identical replay from a checkpoint with a published hash.

### New

**Bridge solvency monitor** `★★★`
Is every wrapped asset actually backed? Continuously verify that the custodied
reserve matches the wrapped supply, per bridge, and publish the gap and the
measurement latency. This is an accounting reconciliation problem — a domain
where being pedantic about definitions is the entire value, and where the
failure mode (a bridge quietly under-backed) is the most expensive failure in
the sector's history.

**Oracle deviation archive** `★★`
Record how far oracle prices drift from spot, per feed, per chain, and how long
the drift persists. Everyone assumes oracles are approximately right; almost
nobody publishes the distribution of "approximately". Naturally event-sourced,
and it compounds: the archive is worth more every month it runs.

**Compound slashing risk calculator** `★★`
Restaking guides routinely say "5 AVSs × 1% slashing risk ≈ 5%", which assumes
independence that does not hold — correlated failures are the whole risk.
Model the correlation explicitly, state the assumptions, publish the sensitivity.
Small project, sharp point.

**Governance archaeology** `★★`
Replay a DAO's full governance history. Measure voter concentration over time,
how often outcomes were decided before voting opened, and how much delegated
power actually moved. Event sourcing applied to politics.

**IDR stablecoin and on-chain rupiah rails** `★★`
What actually exists for rupiah on-chain, who issues it, what backs it, what the
regulatory position is. Nobody in Seoul or Singapore is going to write this.
Geographic differentiation is real and underrated.

**Protocol metric reproducibility harness** `★★`
Generalise restake-tvr: a tool that recomputes any protocol's published headline
number from chain data and reports agreement. Over time it becomes a scoreboard
of which projects' public numbers survive independent recomputation. High
ambition, do not start here.

---

## Finance

### The strongest one

**A backtester where every run is bit-identical** `★★★`
Backtest irreproducibility is a famous, unsolved, expensive problem. Published
strategy results routinely cannot be reproduced — lookahead bias creeps in
through survivorship-biased universes, restated fundamentals, and point-in-time
data that was not actually point-in-time.

Build a backtesting engine as an **event log**: market data arrives as
timestamped events, the strategy is a projection, and a run replays
bit-identically with a published hash. Make lookahead bias *structurally
impossible* rather than something you remember to avoid — the strategy simply
cannot read an event that has not arrived yet.

This is HCIE's architecture pointed at a domain where the same property is worth
far more, and where the audience already understands why it matters. If you build
one finance thing, build this.

### Others

**Reksa dana fee-vs-performance analysis** `★★★`
Indonesian mutual fund data is public and almost nobody analyses it rigorously.
Recompute reported returns from holdings, measure fee drag over realistic
horizons, and report which funds beat their benchmark after costs. Uses your
data-pipeline skill, uses the Indonesian angle, and produces a result ordinary
people can act on. Politically spicy in a productive way.

**IDX point-in-time data pipeline** `★★`
Indonesian equities data is poorly served. Build a properly versioned,
point-in-time store — one that records what was *knowable on that date*, not
what was later restated. This is the unglamorous foundation the backtester needs,
and it is a genuine moat because it can only be built by starting early.

**Payment reconciliation engine** `★★`
Boring and valuable. Two systems disagree about what was paid; find and explain
every discrepancy. Event sourcing is the natural fit, the problem is universal,
and every fintech has this pain. Least impressive to describe, most likely to
get you hired.

**Auditable credit decisions** `★★`
Lending decisions as an event log where any decision can be replayed and
explained months later. Indonesian fintech lending is under real regulatory
pressure on exactly this. Overlaps your verification work.

**Fund factsheet reproducibility** `★★`
Take published factsheets and recompute the numbers from holdings. Same shape as
restake-tvr, different asset class. Good second act if the crypto one lands well.

**Market data vendor disagreement monitor** `★`
Measure how often two data vendors disagree about the same price. Cheap to
start, surprisingly damning results, but harder to get data access.

---

## Adjacent, using existing strengths

**Reproducibility harness for ML papers** `★★★`
Pick published ML results and try to reproduce them, reporting successes and
failures with equal prominence. You already do this to your own work. The ML
reproducibility crisis is well documented and under-served by people who are
both rigorous and not trying to dunk.

**Indonesian OCR benchmark** `★★★`
There is no good public benchmark for Indonesian document OCR. Build one:
a labelled corpus (synthetic or consented), a standard evaluation, and a public
leaderboard. Whoever builds the benchmark for a domain becomes a reference point
in it, and you already have the hardest part — knowing what "correct" means for
KTP, SIM, STNK and KIR.

**Determinism test-kit as a library** `★★`
Extract what you built twice: a small library that makes "prove this pipeline
replays identically" a three-line addition to any project. Narrow, useful,
adoption is measurable in downloads.

**LLM eval harness with honest reporting** `★★`
Most eval results are published without confidence intervals or per-slice
breakdowns. Build the harness that refuses to emit a headline number without
them. Directly the Simpson's-paradox lesson, applied to the noisiest domain in
software.

---

## How to choose

Three filters, in order:

1. **Does it use at least two of your unfair advantages?** If not, skip it —
   you would be competing on even ground for no reason.
2. **Can a stranger verify the result without trusting you?** This is the
   property everything else on your site already has. Keep it.
3. **Would you still find it interesting in month three?** Most of these die
   from boredom, not difficulty.

If two ideas tie, pick the one that produces a **dated public artifact sooner**.
The trail is worth more than any single project.

### If you want a shortlist of three

- **restake-tvr** — crypto credibility, 2–3 weeks, no Solidity
- **the deterministic backtester** — finance, biggest technical statement,
  reuses HCIE's architecture wholesale
- **the Indonesian OCR benchmark** — cheapest to start, and it makes your
  existing work the reference implementation rather than just another project
