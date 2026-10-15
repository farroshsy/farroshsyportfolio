// ---------------------------------------------------------------------------
// Project content. Two "featured" deep case studies, the rest are short.
// Everything here is sourced from the PUBLIC repos only.
// ---------------------------------------------------------------------------

export type Metric = { label: string; value: string; note?: string };

export type Section = { heading: string; body: string[] };

export type Project = {
  slug: string;
  title: string;
  blurb: string; // one line, used on cards
  year: string;
  featured: boolean;
  stack: string[];
  repo?: string;
  demo?: boolean; // renders the live OCR widget on the case-study page
  metrics?: Metric[];
  sections?: Section[];
};

// Order matters: this array drives the home page. HCIE leads because it is
// the larger system and carries measured results against published baselines.
export const projects: Project[] = [
  {
    slug: "hcie",
    title: "HCIE — Event-Sourced Intelligent Tutoring System",
    blurb:
      "Adaptive tutoring system and research instrument. Matches BKT on cold-start accuracy with zero training, and every decision replays bit-identically.",
    year: "2026",
    featured: true,
    repo: "https://github.com/farroshsy/hcie-system",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Kafka / Redpanda",
      "CQRS",
      "Next.js",
    ],
    metrics: [
      { label: "Cold-start AUC", value: "0.6051", note: "on par with BKT 0.5963 · zero training · 93 learners" },
      { label: "First attempt", value: "0.62–0.76", note: "AUC · BKT without history ≈ 0.50" },
      { label: "Replay", value: "Bit-identical", note: "published md5, independently checkable" },
      { label: "Transfer", value: "+0.053", note: "placebo-corrected · p<0.001 over 1000 shuffles" },
    ],
    sections: [
      {
        heading: "Why I built it",
        body: [
          "In 2025 Indonesia made coding and artificial intelligence an elective subject across primary and secondary schools. What stopped me was not the policy but the number sitting next to it: in 2022, **5.31%** of primary schools had computer access for learning — down from 8.48% the year before.",
          "An adaptive system picks what to teach next from a mastery estimate, and that estimate is built from the learner's own interaction history. A subject that has just opened has no history at all. So the system is at its weakest exactly where it is needed most — the first few interactions, in the schools with the least of everything else.",
          "The available approaches want a GPU or a cloud service per student. The institutions that can afford that are the ones that need it least. The method fails precisely on the population it was meant to serve, and it fails quietly, because nobody measures the first fifty interactions separately.",
          "So I built it as an event log first and a tutor second — no embeddings, no history required, readiness on a new concept inferred from its prerequisites.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "An adaptive system picks what to show next from a mastery estimate, and that estimate is built from the learner's interaction history. In a subject that has just opened, no such history exists. The system is weakest exactly when it is needed most: the first few interactions.",
          "And the available approaches want a GPU or a cloud service per student. The institutions that can afford that are the ones that need it least. The method fails precisely on the population it was supposed to serve.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "Every interaction is an immutable event. Learner state is a projection derived from the log, never the source of truth. Writes go through a transactional outbox that Kafka/Redpanda drains into seven independent consumers — learning brain, trajectory recorder, adaptation, exploration instrumentation, transfer measurement, projections, and a WebSocket gateway that pushes mastery updates to the UI live.",
          "Mastery estimation uses a lagged Kalman filter over a concept graph rather than learned embeddings. That is what makes cold start work: a new learner and a new concept both have a defined prior on the first interaction, with no pretraining corpus and no warm-up period.",
        ],
      },
      {
        heading: "Results, and what they do not show",
        body: [
          "On the sealed evaluation — 96,727 interactions from 93 learners — cold-start AUC is **0.6051** against BKT's 0.5963, with no training at all, while DKT, SAKT and GKT each needed 17 users of pre-training and scored lower. The gap to BKT is small (95% CI [+0.0017, +0.0226] on a 76-learner companion set), so the claim is parity without training, not superiority. Cross-family durable transfer measures **+0.053** as a placebo-corrected residual, p<0.001 across 1000 shuffled-DAG permutations, over 1,976,020 rows and 232,440 learners.",
          "The reporting rule was fixed **before any data was read**: an accuracy difference can point one way within small groups and the other way in aggregate — Simpson's paradox — and if that appeared, both readings would be reported together rather than one chosen. It appeared. The pooled headline is partly an aggregation artifact; per-window, BKT is competitive and wins outright at very low N.",
          "That distinction matters more than it looks. This is not honesty after the fact, it is a commitment made before the fact — and because every decision was recorded through event sourcing, the trajectories were still there to slice when the time came. A system that overwrites its own state could not have told me.",
          "The transfer result is correlational and topological, not causal: there is no intervention and no counterfactual. The proximity (0.134) and same-family (0.119) confounds are **larger than the cross-family effect itself**. The effect is real; it is not cleanly causal, and saying otherwise would be a better headline and a worse claim.",
        ],
      },
      {
        heading: "Reproducibility",
        body: [
          "Because state is a pure function of the event log, the system rebuilds from events and lands in the same place. `make parity` runs the brain harness twice in fresh processes and compares md5s — expected value `3ab07694eabe0ad52c6378065cf23100`, published so a stranger can check it rather than take my word.",
          "The scope of that guarantee is stated precisely rather than generously: it proves the **brain math** is deterministic seed-for-seed over a fixed event sequence. It does not mean the entire event-sourced pipeline re-executes bytewise. Datastore images are tag-pinned rather than digest-pinned, so the environment is tag-reproducible, not bit-reproducible.",
          "A researcher with Docker and Make and no access to my machine can run `make init && make build && make up && make migrate && make verify` and get the sealed results, because the schema and curriculum seed from the Alembic chain.",
        ],
      },
    ],
  },
  {
    slug: "doc-verify",
    title: "Indonesian Document Verification API",
    blurb:
      "Stateless OCR + verification for KTP, SIM, STNK and KIR. 83–90% field accuracy, shipped as a container.",
    year: "2026",
    featured: true,
    demo: true,
    repo: "https://github.com/farroshsy/computervision-api-system",
    stack: [
      "Python",
      "FastAPI",
      "PaddleOCR",
      "Tesseract",
      "YOLO",
      "Redis",
      "Docker",
    ],
    metrics: [
      { label: "SIM", value: "90%", note: "rules + spatial pairing" },
      { label: "KTP", value: "87%", note: "detector + gazetteer + NIK arithmetic" },
      { label: "KIR", value: "86%", note: "rules + reference data + dimension assembly" },
      { label: "STNK", value: "83%", note: "detector + plate recovery" },
    ],
    sections: [
      {
        heading: "Why I built it",
        body: [
          "Before a truck leaves, four documents have to be right: the driver's KTP, the SIM saying they may drive that class of vehicle, the vehicle's STNK, and the KIR saying it is roadworthy.",
          "During my internship I watched how all four were checked. Drivers photographed them on their phones, sent them through a messaging app, and staff read the values and typed them in again by hand. It was slow and inconsistent, but what bothered me most was that it **left no trace**. Expired licences, the wrong vehicle papers, and document photos reused across drivers surfaced only once they had already become an incident or a compliance finding.",
          "What I did not expect was how much of the work turned out to be refusing to guess.",
        ],
      },
      {
        heading: "Problem",
        body: [
          "Generic OCR reads these badly. Not because the characters are hard, but because the *fields* are hard: a name and its label sit in different places on a SIM than on a KTP, and a plate number on an STNK is printed in a font general models were never asked to care about.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "Rather than one model per document, the pipeline is a per-doctype method map. Each type gets the cheapest technique that actually moves its accuracy, and nothing more.",
          "SIM and KIR run on rule-based extraction plus spatial pairing — matching each label to its nearest plausible value. Field detectors for these two were never completed: the annotated field dataset was the bottleneck, not the modelling.",
          "KTP adds a gazetteer of Indonesian cities, districts and birthplaces to constrain the output space, plus NIK arithmetic: the national ID number encodes birth date and gender, so it cross-checks and repairs two other fields for free.",
          "STNK was the one case where a detector earned its place.",
        ],
      },
      {
        heading: "The result worth reporting",
        body: [
          "Plate-number extraction on STNK went from 33% to 100% once a dedicated detector ran per-photo rather than relying on a global alignment step. STNK and KTP detectors both trained to mAP50 0.99; in the public container they ship disabled, because the weights are not bundled — mount them and set the env vars to switch them on.",
          "Scope, stated rather than implied: the 33→100 figure is **plate-specific**. Across all 28 STNK fields the detector contributes 18, or 64%. STNK is still the weakest doctype overall at 83% — fixing the plate did not fix the document, and the remaining error sits in the low-contrast vehicle-specification block.",
          "The harder half of the work was refusing to answer. v2 shipped `FM 517 H` as a plate; it was a fragment of the TYPE row `FUSO FM 517 HRDK`, which has a plate's exact shape. Region codes became a closed set, and the endpoint returns `match`, `no_match`, or `needs_review` with a machine-readable reason, so unreadable input routes to a human rather than getting guessed at.",
        ],
      },
      {
        heading: "Design decisions",
        body: [
          "**Stateless by construction.** No upload is written to disk, no image bytes are logged, nothing is persisted between requests. This is a privacy property first — these are national identity documents, and under UU PDP anything that stores them takes on obligations I do not want a demo endpoint to have — but it is also what makes the service trivially horizontally scalable.",
          "**Perceptual hashing for duplicate detection.** Onboarding fraud often means the same document photographed twice and submitted under two identities. A perceptual fingerprint catches re-uploads without keeping the original image.",
          "**Shipped as an image, not a repo.** The published container runs with one `docker pull` and a compose file. The trained detector weights are deliberately not bundled — the public image falls back to the rules pipeline, and weights mount in via environment variables.",
        ],
      },
    ],
  },
  {
    slug: "compass",
    title: "Compass — A Habit Tracker You Can Verify",
    blurb:
      "Native iOS app whose milestones are signed in the Secure Enclave and anchored to Bitcoin. 482 tests, and a verifier a stranger can run.",
    year: "2026",
    featured: true,
    repo: "https://github.com/farroshsy/compass",
    stack: [
      "Swift",
      "SwiftUI",
      "WidgetKit",
      "App Intents",
      "CryptoKit",
      "OpenTimestamps",
    ],
    metrics: [
      { label: "Tests", value: "482", note: "46 suites · one touches the network" },
      { label: "Writers", value: "2", note: "app + widget on one log, tested adversarially" },
      { label: "Signing", value: "P-256", note: "Secure Enclave key, on device" },
      { label: "Anchor", value: "Bitcoin", note: "via OpenTimestamps · claimed only once confirmed" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "A habit tracker's record is only worth what you trust the app to be. It can be edited, backdated or lost, so the record proves nothing to anyone else.",
          "Compass keeps the product dead simple — one screen, four checkboxes, under three seconds to open and close — and puts the effort underneath: a record you can hand to a stranger, who can check it **without trusting you or the app**.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "Every check-in is an event in an append-only journal with hand-written canonical byte encoding, a SHA-256 `content_hash`, and a per-writer `prev` chain. App state is a projection of that log, rebuilt deterministically.",
          "The Home Screen widget is a **second writer** to the same file. Both processes record through one append API, and an adversarial two-process test was written for it — it immediately exposed an ordering defect where a cold widget's un-check was silently discarded. Fixed, and the test stays.",
          "The code is a layered Swift package — Domain, Application, Infrastructure, UI — with 482 tests across 46 suites using Swift Testing.",
        ],
      },
      {
        heading: "Certificates, and what they do not claim",
        body: [
          "Achievement rules ship as data and evaluate as a pure function of the log, so a new rule backfills over existing history. Each award commits to the exact events it counted and is signed on the spot with a **Secure Enclave P-256 key**.",
          "Digests are then submitted to OpenTimestamps for Bitcoin anchoring. The certificate says \"Sealed on this device\" until a proof actually comes back confirmed, and only then adds the anchor date — it never claims more than is true at that moment.",
          "A standalone verifier in Python, standard library only, re-derives every claim from the exported log rather than believing it.",
        ],
      },
    ],
  },
  // Nothing else goes here until it can carry its own page.
  //
  // The bar: a project earns a slot when the site can *show* something —
  // a running demo, a measured result, an argument worth reading. If all we
  // can offer is "here is a GitHub link", it is filler, and filler next to
  // HCIE and the verification API makes both look smaller than they are.
  //
  // Coursework and bootcamp exercises stay archived on GitHub. They are not
  // hidden, they are just not claims.
];

export const featured = projects.filter((p) => p.featured);
export const secondary = projects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
