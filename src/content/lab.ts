// ---------------------------------------------------------------------------
// The lab — personal projects and open explorations.
//
// Kept separate from /work on purpose. Work is finished, measured, defensible.
// The lab is where things are allowed to be unfinished, wrong, or abandoned,
// and saying which is the whole value of the section.
//
// Nothing goes in here that has not actually been started. An "exploring" entry
// means reading and writing, not intending.
// ---------------------------------------------------------------------------

export type LabStatus = "exploring" | "building" | "shelved";

export type LabEntry = {
  slug: string;
  title: string;
  status: LabStatus;
  started: string; // ISO
  question: string; // the thing being answered — not a feature list
  body: string[];
  stack?: string[];
  repo?: string;
  /** Why it was shelved. Required when status is "shelved". */
  outcome?: string;
};

export const LAB_STATUS_NOTE: Record<LabStatus, string> = {
  exploring: "reading and writing, nothing shipped",
  building: "code exists, nothing concluded",
  shelved: "stopped — the reason is the point",
};

export const lab: LabEntry[] = [
  // ---------------------------------------------------------------------
  // TEMPLATE — copy this, fill it, delete this comment.
  //
  // {
  //   slug: "short-name",
  //   title: "What it is",
  //   status: "exploring",
  //   started: "2026-08-01",
  //   question: "The question you are actually trying to answer.",
  //   body: ["What you have done so far. What surprised you. What is wrong."],
  //   stack: ["..."],
  // },
  //
  // The bar here is much lower than /work — an entry is worth writing the
  // day you start, not the day you finish. But it must be true: a lab entry
  // for something you have only thought about is the one kind of lie this
  // site cannot afford.
  // ---------------------------------------------------------------------
  {
    slug: "ocr-benchmark-id",
    title: "A public OCR benchmark for Indonesian IDs",
    status: "building",
    started: "2026-07-28",
    question:
      "Which OCR system actually works on a photographed KTP — and can anyone check a vendor's accuracy claim?",
    body: [
      "There is no shared test set and no shared definition of a correct field, so published accuracy numbers cannot be compared. Scoring rules were versioned and published before any result was produced.",
      "Abstention is scored separately from error: a system that says \"I can't read this\" is not treated like one that confidently returns the wrong NIK. My own API is scored under the same rules, with the conflict of interest stated first.",
    ],
    stack: ["Python"],
    repo: "https://github.com/farroshsy/ocr-benchmark-id",
  },
  {
    slug: "dokumen",
    title: "dokumen-id & DokumenKit — ID parsing that never leaves the device",
    status: "building",
    started: "2026-07-28",
    question:
      "Can a person checking a handful of IDs a week get structured verification without uploading anyone's identity to a server?",
    body: [
      "dokumen-id decodes a NIK in the browser with zero network requests; DokumenKit is the same logic as a Foundation-only Swift package for iOS and Mac.",
      "\"We don't store it\" is a promise. \"There is no server\" is a property you can verify with airplane mode — that difference is the product.",
    ],
    stack: ["Next.js", "TypeScript", "Swift"],
    repo: "https://github.com/farroshsy/dokumen-id",
  },
  {
    slug: "rota",
    title: "rota — on-call alerting in one binary",
    status: "building",
    started: "2026-07-31",
    question:
      "What is the smallest self-hosted system that reliably wakes the right person when something breaks?",
    body: [
      "Receives alerts, runs watches, escalates when nobody acknowledges, and survives restarts. Runnable today; not yet battle-tested by anyone but me.",
    ],
    stack: ["Rust", "Docker"],
    repo: "https://github.com/farroshsy/rota",
  },
  {
    slug: "replay-backtest",
    title: "A backtester where lookahead bias is impossible",
    status: "building",
    started: "2026-07-28",
    question:
      "Can lookahead bias be removed by construction instead of by the author remembering to avoid it?",
    body: [
      "Everything the strategy can know arrives as a timestamped event, so future data is structurally unreachable. Two runs in fresh processes produce identical published digests.",
    ],
    stack: ["Python"],
    repo: "https://github.com/farroshsy/replay-backtest",
  },
];
