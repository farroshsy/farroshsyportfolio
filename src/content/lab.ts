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
];
