# Lab plan — building an on-chain track record

Target: engineering roles at crypto / frontier-tech companies outside Indonesia,
of the kind in the Hashed portfolio. Not building a fund — being hired by one of
the companies a fund like that backs.

Nothing in this document is on the site yet. It goes in `src/content/lab.ts`
one entry at a time, as each is genuinely started.

---

## The strategic read

**Do not compete on Solidity.** There are tens of thousands of people with a
DeFi clone and an ERC-20 tutorial repo. Entering there means being ranked on the
one axis where you have the least history.

**Compete on verifiability.** Look at where the Hashed portfolio actually needs
engineers who are not protocol cryptographers: Dune (analytics), Covalent (data
infrastructure), Quantstamp (audit). Those are data and correctness problems.
They are the least crowded lane in the entire sector, and they are what you have
already been doing for two years:

| What you built | What it is called on-chain |
| --- | --- |
| Event-sourced immutable log | a ledger |
| Deterministic replay, published md5 | the verifiability property chains exist to provide |
| `seal-bae44d1a`, content hash over 96,727 rows | a commitment |
| Transactional outbox → CQRS projections | an indexer |
| Reporting rule fixed before reading data | what audit culture claims to do |

You did not learn these from a whitepaper. You built them because a research
instrument had to be auditable. That is a stronger origin than a bootcamp.

**The gap is real and worth stating plainly:** you have zero on-chain artifacts.
No amount of framing fixes that. The plan below is about closing it in the
smallest number of moves.

---

## What "proof I have been working on this" actually looks like

Not one large project dropped in month six. A **dated, legible trail**:

- ~20 log entries over ~6 months beats one big repo, because it shows sustained
  attention rather than a weekend of enthusiasm
- entries that say *"this failed and here is why"* beat entries that only
  announce launches
- a `shelved` lab entry with a real reason is a positive signal, not a gap

Cadence to aim at: **one log entry a week, one lab entry a month.** Miss weeks;
do not restart the counter.

---

## Project 1 — How much restaking collateral is actually redeemable?

**Start here.** Picked after looking at what the market is arguing about in
2026. Lowest barrier, produces writing immediately, and it is the purest
possible demonstration of the trait.

### Why this target

TVL is the most-cited number in DeFi, and it is **structurally inflated**. The
academic critique is already established: at the December 2021 peak, the gap
between TVL and TVR — total value *redeemable* — was $139.87 billion, a ratio of
roughly 2 ([arXiv 2404.11745](https://arxiv.org/pdf/2404.11745v2)). DefiLlama
itself ships separate "TVL" and "TVL excluding staking and governance" views
precisely because the problem is real.

Restaking makes it worse by design. The same ETH is counted when staked with
Lido, counted again when the stETH is deposited into EigenLayer, and counted a
third time across the AVSs it secures. That is not an accounting bug — it is the
product. Commentators have called out the "irony of double counting" between
Lido stETH and its rehypothecated form, but almost all of that commentary is
**qualitative**. Nobody has published a careful recomputation on current data.

Meanwhile the numbers are live and contested: EigenLayer went roughly $15B →
$7B → $8.9B, restaking is one of 2026's dominant narratives, and liquid staking
alone sits near $44.8B on Ethereum.

### The question

Given the reported restaking TVL, how much is **distinct collateral** — and how
much is the same ETH counted at several layers?

### Why it is your project specifically

This is the Simpson's-paradox problem again. TVL is a pooled aggregate that
hides its own structure, and the honest answer requires reporting the headline
number *and* the decomposition rather than choosing between them. You have
already done exactly this once, under your own pre-registered reporting rule.

It also needs no Solidity. It needs careful data work, a defensible methodology,
and the willingness to publish the parts you could not resolve.

### Method sketch

1. **Define redeemable precisely, in public, before pulling data.** Pre-register
   the rule the way you did for HCIE. What counts as distinct collateral? How
   are LSTs treated? This decision determines the answer, so it must be made
   before you can be tempted by a result.
2. Pull staking positions, LST balances, and restaking deposits from chain data.
3. Collapse the layers: trace the same underlying ETH through Lido → EigenLayer
   → AVS allocations.
4. Report the ratio, per protocol and in aggregate.
5. **Report what you could not resolve** — and there will be plenty. Points of
   honest difficulty: LST wrappers you cannot fully unwrap, cross-chain
   positions, and the definitional question of whether restaked collateral
   securing multiple AVSs should count once or several times. That last one has
   no objectively right answer, which makes stating your choice mandatory.

### Sources

DefiLlama (methodology and a baseline to compare against), Dune, and a plain
archive/RPC node. All free at this scale.

### Time

2–3 weeks part-time.

### The failure mode to avoid

Do not write a takedown. "Restaking TVL is fake" is a crowded, low-value genre
and it would misrepresent what you actually found. The valuable version is:
*here is a defensible definition, here is the ratio it produces, here is where
DefiLlama and I agree, here is where we differ and exactly why, here is what I
could not determine.*

Lead with what matched. The credibility comes from the parts where you say you
do not know.

---

## Project 1b — the generic version

If restaking stops being interesting, the same shape works on any protocol with
public claims.

**The question:** does a protocol's published dashboard match what the chain
actually says?

**What you do:** pick one protocol with public claims — TVL, volume, user
counts, yields. Pull the raw chain data yourself. Recompute the numbers
independently. Publish the agreements *and* the disagreements, with your method
and your own uncertainty stated.

**Why it fits you specifically:** this is the Simpson's-paradox instinct pointed
at a new domain. Most crypto analytics either boosts or attacks. Almost nobody
publishes "I recomputed this, three figures matched, one did not, and here is
the definitional difference that explains it, and here is the part I could not
resolve."

**Skills needed:** SQL, an RPC endpoint or a Dune account, Python. You have all
of this. No Solidity required.

**Time:** 2–3 weeks part-time for the first one.

**Output:** a write-up, a repo with the queries, a lab entry. If the analysis is
good it is the kind of thing that gets read by the protocol's own team, which is
a warmer introduction than any application form.

**Failure mode to avoid:** do not make it a gotcha. The value is in the method
and the honesty about your own limits, not in catching someone out. Lead with
what matched.

---

## Project 2 — An indexer with a replay guarantee

**The bigger build.** Start once Project 1 has shipped.

**The question:** can an indexer prove it reindexed correctly, rather than
asserting it?

**What you do:** index one contract or protocol into Postgres. Then do the thing
almost no indexer does — make reindexing from a fixed checkpoint produce a
**bit-identical** result, publish the expected hash, and provide a `make parity`
equivalent so a stranger can verify it without trusting you.

**Why it fits you specifically:** this is HCIE with a different data source. You
have already solved the hard part once, including the discipline of scoping the
guarantee honestly — *tag-reproducible, not bit-reproducible* is exactly the
kind of caveat this project will need.

**Skills needed:** event sourcing (have it), Postgres (have it), an RPC endpoint,
enough Solidity to read ABIs and decode logs. That is days of learning, not
months.

**Time:** 6–10 weeks part-time.

**Output:** a repo people can actually run, a reproducibility guide, and a
genuinely uncommon claim on a résumé.

---

## Project 3 — Verified documents without on-chain PII

**Optional, and the most personal.** Only if it keeps interesting you.

**The question:** can a document be proven verified without any of its contents
touching a public ledger?

**What you do:** your existing OCR service already refuses to store anything.
Add attestation: commit a hash of the verification *result* on-chain, never the
document, never the identity. Anyone can later prove a check happened without
learning what was checked.

**Why it fits you specifically:** it joins your stated UU PDP position to a
crypto primitive, and it is an Indonesian problem nobody in Seoul or Singapore
is working on. Differentiation by geography is real and underrated.

**Warning:** this one has genuine privacy hazards. A hash of a low-entropy input
(an NIK is 16 digits with structure) is **brute-forceable**. If you build this,
the salting and commitment scheme is the entire project — get it wrong and you
have published a rainbow-table target for national identity numbers. Research it
properly before writing code, and say so in the write-up.

---

## Learning, in the order it is actually needed

1. **Read chain data** — RPC, logs, ABI decoding. Needed for Project 1.
2. **Solidity to read, not to write** — you need to understand contracts before
   you need to author them.
3. **One ecosystem deeply**, not five shallowly. Given the Hashed portfolio,
   Ethereum/L2 or Cosmos are both defensible.
4. **Write Solidity** — only once a project actually requires it.

Skip: token launches, NFT projects, trading bots. They generate no signal for
the roles being targeted.

---

## The one thing that decides this

Consistency, not brilliance. The trail is the artifact.

Six months of visible, dated, honest work in this direction is worth more than
any single repo — and it is also, conveniently, the only strategy that survives
you changing your mind about which part of the field you want.
