# Origin stories — draft scaffolds

The research is blunt about this: the thing that separates a memorable project
from a forgettable one is an identifiable origin — *I built this because I kept
running into this problem*. Neither of your public READMEs answers that. Both
open with what the system is and never say why you started.

**Important: the drafts below are inference, not your words.** I built them from
what the repos show. Every `[ ... ]` marks something only you know. Do not ship
these as-is — the whole value of an origin story is that it is true, and a
fabricated one is worse than none.

Two paragraphs each. First person. One evening's work.

---

## 1. HCIE — why did you build it?

**What I can see from the repo**

- It is an ITS *and* a research instrument — a dual purpose most people would
  not take on
- You benchmarked against BKT, DKT and SAKT rather than declaring novelty
- You chose embedding-free, cold-start-first — a deliberate rejection of the
  default approach
- You built full event sourcing with seven consumers when a CRUD app would have
  produced a demo far faster
- You forked `pykt-toolkit` and `ednet` in March 2026 — you went and read the
  benchmark literature

**What only you know**

- `[ Was this thesis work, a side project, for a client, or something you
  started because a specific thing annoyed you? ]`
- `[ What made you distrust the mutable-student-state approach? Did you use a
  system that got it wrong, teach someone, or read something that broke it? ]`
- `[ Why education specifically? You are not otherwise an edtech person. ]`
- `[ When did you decide replay had to be provable rather than claimed? Was
  there a moment you could not reconstruct a result? ]`

**Draft — replace everything bracketed**

> I got interested in knowledge tracing because `[ reason ]`. What bothered me
> about the standard approach was that student state is a single mutable row:
> the model updates it, overwrites it, and the reasoning that produced it is
> gone. If you cannot reconstruct how a learner's mastery estimate moved, you
> cannot defend any claim you make about it — and I wanted to make claims.
>
> So I built the system as an event log first and a tutor second. `[ What it
> cost you — the thing that took far longer than expected. ]` The payoff is
> that when the cold-start numbers came out favourable, I could show they were
> partly a Simpson's-paradox aggregate, because the underlying trajectories
> were still there to slice. A system that had overwritten its state could not
> have told me that.

---

## 2. Indonesian Document Verification API — why did you build it?

**What I can see from the repo**

- It is scoped precisely to logistics onboarding: driver identity, licence
  validity, vehicle registration, roadworthiness
- Not generic OCR — four specific Indonesian doctypes with per-type methods
- Perceptual hashing for duplicate-upload detection, which is a *fraud*
  concern, not an accuracy one
- Stateless by construction, which reads as a considered privacy position
- There is a "Customer KYC" evidence set in the working tree

**What only you know**

- `[ Was there a real client or a real operation behind this? The doc says
  "built for logistics onboarding" with unusual specificity. ]`
- `[ Did you watch someone do this by hand? Duplicate detection is not
  something you add unless you know duplicates happen. ]`
- `[ Why stateless — a privacy conviction, a UU PDP concern, an operational
  constraint, or all three? ]`
- `[ What made you check whether the trained detectors actually helped, when
  most people would have shipped them on? ]`

**Draft — replace everything bracketed**

> `[ The situation: who was doing this manually, and what went wrong. ]` The
> documents are KTP, SIM, STNK and KIR — four artifacts that arrive as phone
> photos, skewed and glared and cropped by a thumb. Generic OCR reads them
> badly, and not because the characters are hard.
>
> The thing I did not expect was how much of the work was refusing to add
> models. I trained field detectors for SIM and KIR and they both ship
> disabled, because measurement said they earned nothing over the rules. The
> one place a detector did earn its place — STNK plates — it moved extraction
> from 33% to 100%. `[ What you would do differently, or what is still
> unsolved. ]`

---

## Where these go

1. Top of each public README, above the feature list — it is the first
   paragraph a hiring manager reads in their 40-second pass
2. `sections[0]` of each project in `src/content/projects.ts`, replacing the
   current "Problem" section, which is competent and impersonal
3. As the first two `note` entries in the log, tagged `evergreen`

## A note on language

Consider writing these in Indonesian first and translating after. Motivation is
the hardest thing to write in a second language, and it is the one place where
stiffness reads as insincerity rather than as accent.

Indonesian-language technical writing also has far less competition than
English. If the audience you care about includes Indonesian engineers, a
bilingual site is a genuine differentiator rather than extra work.
