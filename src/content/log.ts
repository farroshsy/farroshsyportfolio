// ---------------------------------------------------------------------------
// The log. One append-only stream: work, notes, TILs, photos, music.
//
// Two axes, deliberately separate:
//   kind     — what sort of thing this is
//   maturity — how sure I am about it
//
// The maturity axis is the point. A site that only publishes finished thoughts
// publishes almost nothing. Marking a note as a seedling is what makes it
// publishable at all, and saying out loud how settled an idea is happens to be
// the same discipline as reporting the confidence interval next to the result.
// ---------------------------------------------------------------------------

export type Kind = "work" | "note" | "til" | "photo" | "song";

/**
 * seedling  — half-formed, might be wrong, published anyway
 * budding   — holding up so far, still being revised
 * evergreen — I would defend this
 */
export type Maturity = "seedling" | "budding" | "evergreen";

export type LogEntry = {
  id: string;
  date: string; // ISO, YYYY-MM-DD
  kind: Kind;
  maturity: Maturity;
  title: string;
  body?: string[];
  meta?: string;
  href?: string; // internal case study
  external?: string; // outbound link
};

export const MATURITY_NOTE: Record<Maturity, string> = {
  seedling: "half-formed — published early on purpose",
  budding: "holding up so far, still being revised",
  evergreen: "I would defend this",
};

// Newest first. Every claim below is checkable against the public repos.
export const log: LogEntry[] = [
  {
    id: "parity-md5",
    date: "2026-07-23",
    kind: "til",
    maturity: "evergreen",
    title: "Publishing the expected hash is what makes a claim checkable",
    body: [
      "`make parity` runs the HCIE brain harness twice in fresh processes and compares md5s. The expected value is `3ab07694eabe0ad52c6378065cf23100`, and it is written in the docs rather than left for me to assert.",
      "The difference between \"deterministic\" and \"deterministic, here is the hash, run it yourself\" is the entire difference between a claim and evidence. It costs one line of documentation.",
    ],
    meta: "hcie-system",
    external: "https://github.com/farroshsy/hcie-system",
  },
  {
    id: "fm-517-h",
    date: "2026-07-18",
    kind: "note",
    maturity: "evergreen",
    title: "The system was not misreading. It was misconfident.",
    body: [
      "v2 confidently reported `FM 517 H` as a licence plate. It was not a plate. It was a fragment of the TYPE row — `FUSO FM 517 HRDK` — which happens to have exactly the shape of one. `GC 415 V` came from the same place.",
      "The fix was not better OCR. It was treating region codes as a closed set: a code that does not exist is not a plate, however perfect the shape. Refusing to answer turned out to be most of the work.",
      "On a verification product, one confident wrong answer costs more than a hundred honest \"I don't know\"s.",
    ],
    meta: "spec_fields.py:653",
    href: "/work/doc-verify",
  },
  {
    id: "three-scale",
    date: "2026-07-14",
    kind: "til",
    maturity: "evergreen",
    title: "A negative result is worth writing down so nobody repeats it",
    body: [
      "I tried re-reading images at three scales to recover truncated characters. It did not fail quietly — it produced answers that were wrong **more confidently** than before.",
      "I recorded it as a negative result rather than deleting the branch. An experiment that failed and went unlogged is an experiment someone on the team runs again next quarter.",
    ],
    meta: "computervision-api-system",
    href: "/work/doc-verify",
  },
  {
    id: "three-outcomes",
    date: "2026-07-12",
    kind: "note",
    maturity: "evergreen",
    title: "Three outcomes, not two",
    body: [
      "The verification endpoint returns `match`, `no_match`, or `needs_review`, each with a machine-readable reason code. Anything unreadable routes to a human instead of being guessed at.",
      "A binary verifier is forced to invent an answer for every input it is given. The third outcome is what lets the system be honest about its own coverage.",
    ],
    meta: "verify.py:7",
    href: "/work/doc-verify",
  },
  {
    id: "simpsons",
    date: "2026-07-09",
    kind: "til",
    maturity: "budding",
    title: "My headline result is partly a Simpson's paradox",
    body: [
      "Pooled cold-start AUC is 0.6051 against BKT's 0.5963, significant at n=76. Per-window, the picture is mixed — BKT is competitive and wins outright at very low N.",
      "The pooled number is real and it is also partly an aggregation artifact. Both are true. So the docs say to cite it with the per-window table rather than instead of it, which is a worse headline and a claim I can actually defend.",
    ],
    meta: "hcie-system",
    href: "/work/hcie",
  },
  {
    id: "confounds",
    date: "2026-06-30",
    kind: "note",
    maturity: "budding",
    title: "When your confounds are bigger than your effect",
    body: [
      "Cross-family durable transfer measures +0.053, placebo-corrected, p<0.001 over 1000 shuffled-DAG permutations. Then: proximity is 0.134 and same-family is 0.119. Both confounds are larger than the effect itself.",
      "The effect is real. It is not cleanly causal — no intervention, no counterfactual, a static prerequisite DAG. Saying otherwise would be a better headline and a worse claim, and I am still working out how to present findings shaped like this without either overselling or burying them.",
    ],
    meta: "hcie-system",
    href: "/work/hcie",
  },
  {
    id: "plate-recovery",
    date: "2026-06-15",
    kind: "til",
    maturity: "evergreen",
    title: "Per-photo detection beat global alignment, 33% → 100% on plates",
    body: [
      "STNK **plate** extraction sat at 33% while the pipeline relied on aligning the whole document first. A dedicated detector run per photo, with no alignment step, took it to 100%.",
      "Scope matters here, so: that figure is plate-specific. Across all STNK fields the trained detector contributes 18 of 28, or 64%, and STNK remains my weakest doctype overall at 83%. Fixing the plate did not fix the document.",
    ],
    meta: "computervision-api-system",
    href: "/work/doc-verify",
  },
  {
    id: "log-shape",
    date: "2026-06-02",
    kind: "note",
    maturity: "seedling",
    title: "Every system I like turns out to be a log with opinions on top",
    body: [
      "Event sourcing. Git. An OCR audit trail. A lab notebook. Same shape underneath: append-only truth, plus derived views you are allowed to throw away and rebuild whenever you stop trusting them.",
      "I do not yet know whether this is a real insight or just the thing I happen to have been building for two years. Filed as a seedling for that reason.",
    ],
  },
  {
    id: "tag-not-bit",
    date: "2026-05-20",
    kind: "til",
    maturity: "evergreen",
    title: "Tag-reproducible is not bit-reproducible, and the docs should say which",
    body: [
      "HCIE pins the API and worker images by `sha256:` digest. The datastores — Postgres, Redpanda, k6 — are pinned by tag. That makes the environment tag-reproducible, not bit-reproducible.",
      "It would have been easy to write \"fully reproducible\" and almost nobody would have checked. Scoping the guarantee down to what is actually true costs one sentence and is the only version worth publishing.",
    ],
    meta: "hcie-system",
    href: "/work/hcie",
  },
];

export const KINDS: Kind[] = ["work", "note", "til", "photo", "song"];

export function byKind(kind: Kind) {
  return log.filter((e) => e.kind === kind);
}

export function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${Number(d)} ${months[Number(m) - 1]} ${y}`;
}
