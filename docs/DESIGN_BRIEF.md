# Identity design brief — Farros Hilmi Syafei

Hand this to a designer or a design agent. It is written to be actionable
without further conversation. A copy-paste prompt is at the end; the sections
above it are the reasoning behind that prompt, and a designer who reads them
will produce something better than one who only reads the prompt.

---

## 1. The one-line brief

Design a personal identity for a backend and ML systems engineer whose defining
trait is **publishing the number that weakens his own claim** — and make that
trait visible in the design system itself, not just described in the copy.

---

## 2. Who this is for

**Farros Hilmi Syafei.** Surabaya, Indonesia. Informatics at ITS. Early career,
two substantial systems to his name and effectively no public audience yet.

> **Amended after the first draft:** an earlier version of this brief called him
> a "backend and ML systems engineer." He never claimed that — it was inferred
> from the two projects that happened to be featured, which is circular. The
> site now carries **no job title at all** and leads with the positioning line
> instead. Career direction is deliberately undecided.
>
> **What this means for the design:** the identity must not visually commit to
> a specialism. No iconography that says "backend", "ML", "data" or "AI". The
> mark and system should still read correctly if he moves toward architecture,
> research, or something not yet on the list. Design for the person and the
> method, not the current job family.

The two systems, because the identity should feel like it belongs to *this*
engineer and not a generic one:

**HCIE** — an event-sourced intelligent tutoring system that doubles as a
research instrument. Immutable event log, seven consumers, CQRS projections.
Cold-start AUC 0.6051 against BKT's 0.5963 over 232,440 learners and 1.98M
trajectory rows. Bit-identical replay with the expected md5 published so
strangers can check it.

**Indonesian Document Verification API** — stateless OCR and verification for
KTP, SIM, STNK and KIR. Per-doctype method map, 83–90% field accuracy. Two
trained models ship *disabled* because measurement said they earned nothing.

The trait, stated in his own documentation:

> The pooled headline is partly a Simpson's-paradox aggregate; cite it *with*
> the per-window table, not instead of it.

> Proximity (0.134) and same-family (0.119) confounds are *larger* than the
> cross-family effect — real, but not cleanly causal.

> Tag-reproducible, not bit-reproducible.

> Plate extraction went 33% → 100%. STNK is still my weakest doctype at 83%.
> Fixing the plate did not fix the document.

Four instances, two unrelated projects, arrived at independently. This is the
brand. Everything below is in service of making it legible at a glance.

---

## 3. Strategy

### Positioning

> Builds systems that can be checked, and publishes the number that weakens the
> claim.

### Audiences, in priority order

1. **Engineering hiring managers**, Indonesian and international. Give them
   ~40 seconds. They arrive from GitHub or a CV link.
2. **Peer engineers** — the people who might read a post, argue with it, or
   collaborate. Long-term this is where compounding happens.
3. **The Indonesian tech community.** Underserved, less competitive, and where
   the cultural specificity of the work actually resonates.

> **Open question the designer should flag rather than silently resolve:** the
> balance between 1 and 3 is not settled. If the answer shifts toward 3, the
> identity should carry more explicit Indonesian visual language. Design so that
> dial can be turned without a rebuild.

### Personality — five attributes

| Attribute | Means | Does not mean |
| --- | --- | --- |
| **Exact** | Every number carries its interval | Cold, clinical, sterile |
| **Candid** | States its own limits unprompted | Self-deprecating or apologetic |
| **Unhurried** | Nothing shouts; confidence through restraint | Slow, sleepy, precious |
| **Built** | Feels engineered, load-bearing, maintained | Techy, cyberpunk, "hacker" |
| **Indonesian** | Rooted in a specific place, not location-neutral | Costume, batik-as-decoration |

### Anti-personality — what it must never feel like

Startup-generic. Aura-farmed. Thought-leader. Crypto. AI-slop gradient.
Motivational. Anything that would look at home next to a "5 lessons from
building my SaaS 🧵" post.

---

## 4. The naming problem — solve this first

"Farros Hilmi Syafei" is three words and 19 characters. It does not fit a
favicon, an avatar, or a nav bar. Existing handle across GitHub, LinkedIn and
Kaggle is `farroshsy` — which is memorable but reads as a typo to anyone who
does not know it decodes to **Farros H. S**y**afei**.

Resolve this deliberately. Options:

| Option | Form | For | Against |
| --- | --- | --- | --- |
| **A** | Full name | Formal, dignified, correct for a CV | Unusable small |
| **B** | `Farros` | Warm, human, short | Common enough to be ambiguous |
| **C** | `FHS` monogram | Fits anywhere, classic | Anonymous; initials are weak brands |
| **D** | `farroshsy` | Already owns it everywhere | Looks like a typo cold |
| **E** | Wordmark + separate mark | Full name for headers, glyph for small | Two things to design well |

**Recommendation: E.** Full-name wordmark for the site header and CV; an
abstract mark for the 16px, avatar, and favicon contexts. Deliver both, plus a
lockup showing them together and the minimum size for each.

---

## 5. Logo concepts — six directions

Each ties to something actually true about the work rather than to "software"
in general. Explore at least three; do not average them into one safe mark.

### 5.1 The seal — **strongest candidate**

HCIE's canonical artifact is a *sealed run*: `seal-bae44d1a`, a content hash
over 96,727 rows, idempotently re-issuable. The OCR system verifies stamped
Indonesian documents. And Indonesian legal documents are made binding by
**materai** — the revenue stamp, a specific and beautiful piece of national
visual culture.

One mark sits at the intersection of: cryptographic sealing, document
verification, and Indonesian identity. That is an unusually tight fit.

- **Explore:** a seal or stamp mark, geometric rather than ornate. Perforated
  edge as in a materai. Possibly a hash fragment or row count integrated as
  microtype in the ring.
- **Watch for:** kitsch, or anything that reads as an imitation government
  emblem — it must not look like an official Indonesian state mark. Abstract
  the form; do not quote it.

### 5.2 Replay — two marks converging

Determinism made visual: the same glyph twice, one offset, resolving into
perfect registration. Reads as a "before/after" that lands on identity.

- **Explore:** double-strike, registration marks, a printer's crop-mark
  vocabulary.
- **Watch for:** reading as "copy" or "duplicate" rather than "verified
  identical". Animation may be needed to disambiguate — which weakens it as a
  static favicon.

### 5.3 The append-only line

The log spine, reduced. A horizontal rule with unevenly spaced ticks — entries.
Extremely scalable, works at any size, works as a divider and a page furniture
system rather than only as a logo.

- **Explore:** ticks encoding something real — actual commit dates, actual entry
  count. A mark that changes as the log grows.
- **Watch for:** too generic alone. Probably a *system element* rather than the
  primary mark. Strong in combination with 5.1.

### 5.4 The honest checkmark

A verification tick that visibly carries a caveat — an asterisk, a subtracted
notch, an interval bar beneath it. The whole thesis in one glyph: *verified,
and here is what that does not cover*.

- **Explore:** tick plus error bar. Tick plus footnote marker.
- **Watch for:** reading as "incorrect", "partial", or "warning". High concept,
  high failure risk. Test it cold on people who know nothing about him.

### 5.5 Confidence interval as the mark

`⊢——●——⊣`. The error bar is arguably the single most honest object in science:
a value that refuses to be stated without its uncertainty. Nobody uses it as an
identity.

- **Explore:** as the wordmark's underline. As a divider. As the favicon.
- **Watch for:** illegible below ~24px. Likely a system element, not the mark.

### 5.6 The `F` as event stream

Monogram where the `F` is constructed from stacked horizontal events — the arm
and crossbar as entries in a log, the stem as the timeline.

- **Explore:** variable weight; the mark densifies as entries accumulate.
- **Watch for:** monogram-as-default is the least interesting answer here.
  Include it as a control, not a favourite.

---

## 6. Colour — the part that carries the strategy

**The system idea: colour encodes epistemic status, not decoration.**

The site publishes entries tagged by how settled they are — `seedling`
(half-formed, published anyway), `budding` (holding up, still revised),
`evergreen` (I would defend this). Bind the palette to that axis. Colour then
*means* something, and the design system expresses the brand thesis structurally
rather than describing it.

Deliver:

- **A ground** — warm neutral, not pure white or pure black. Both light and dark
  modes are required and neither is the afterthought.
- **Three status colours** — seedling / budding / evergreen. Must be
  distinguishable in greyscale and to red-green colourblind viewers, since they
  carry meaning rather than mood.
- **One accent** — links and interactive affordances only. Never decorative.
- **A verification colour** *(optional)* — reserved solely for "this was
  checked": the published hash, the passing parity check, the live demo status
  dot. If used, it must appear nowhere else. Its scarcity is the point.

Constraints: WCAG AA minimum on body text in both modes, AAA where achievable.
Specify every pairing that is allowed rather than shipping a palette and hoping.

---

## 7. Typography

- **One typeface family if possible**, two maximum. This is one person, not a
  publication.
- **Monospace is load-bearing**, not ornamental — it sets data, metrics, dates,
  hashes, and status tags. Choose it first; it does more work here than the
  text face.
- Must render Indonesian orthography correctly. Latin script, but check
  quotation and dash conventions if any Indonesian copy ships.
- Numerals matter more than usual: tabular figures required, since metrics sit
  in aligned columns throughout.
- Deliver a type scale with named roles, not a list of sizes.

---

## 8. Hard constraints

The mark must survive all of these. Test each; do not assume.

- **16×16 favicon** — legible, not a smudge
- **GitHub avatar** — circular crop, ~40px in listings
- **Pure monochrome** — one colour, no gradient, no transparency
- **Inverted** — light on dark and dark on light, both correct
- **Terminal** — an ASCII or Unicode reduction for CLI output and READMEs
- **1200×630 OG image** — the mark plus name, readable as a phone-sized thumbnail
- **Print** — CV header, single colour, 300dpi
- **Embroidery/sticker test** — if it survives ~3 colours and no fine detail,
  it is robust

---

## 9. Applications to deliver

1. Website header lockup + favicon set
2. GitHub avatar and profile README header
3. OG / social card template (with a variant for individual log entries)
4. CV header, single colour
5. Slide template — title, content, and a metrics slide, since he presents results
6. Terminal/ASCII reduction
7. Sticker sheet *(optional, but a good robustness test)*

---

## 10. Deliverables

- Logo suite: SVG primary, horizontal lockup, stacked lockup, mark-only,
  monochrome, inverted
- Favicon set: SVG, 32px, 180px apple-touch, plus the ICO fallback
- Full colour specification with the semantic bindings and every approved pairing
- Type specification with scale and named roles
- Spacing and grid system
- Motion notes — duration and easing for the few transitions that exist, and an
  explicit `prefers-reduced-motion` position
- Usage guide: clear space, minimum sizes, what is forbidden
- **Design tokens as CSS custom properties**, matching the naming already in
  `src/app/globals.css` so implementation is a swap rather than a rewrite

---

## 11. Anti-brief — do not deliver

Angle brackets `< />`. Terminal cursors. Hexagons. Circuit-board traces. Nodes
and edges. Gradient blobs. Glassmorphism. Neon on black. Isometric illustration.
Rocket ships. Anything generated to look "AI". Batik or wayang applied as
surface decoration — if Indonesian visual language appears, it must be
structural and specific, not costume.

Also avoid: a mark that only works animated; a palette that collapses in
greyscale; a system that needs three typefaces to hold together.

---

## 12. How this will be judged

1. **Does the mark survive 16px in one colour?** If not, nothing else matters.
2. **Does the colour system carry meaning?** A palette that is merely pleasant
   has failed the brief.
3. **Would an engineer who reads the case studies recognise the same person in
   the identity?** The design and the writing must agree.
4. **Is it specific to Surabaya rather than location-neutral?** Not literally —
   but it should not be interchangeable with a Berlin or SF portfolio.
5. **Does it avoid every item in §11 without becoming bland?** Restraint is not
   the same as absence.
6. **Can the dial in §3 be turned** toward a more Indonesian-facing audience
   without a rebuild?

---

## 13. Copy-paste prompt

> Design a personal visual identity for Farros Hilmi Syafei, a backend and ML
> systems engineer in Surabaya, Indonesia.
>
> **The defining trait:** he publishes the numbers that weaken his own claims.
> His tutoring-system docs warn that his own headline result is partly a
> Simpson's-paradox aggregate. His transfer-effect writeup states that the
> confounds are larger than the effect. His OCR system ships two trained models
> *disabled* because measurement showed they earned nothing. He publishes the
> expected md5 of his determinism check so strangers can verify it without
> trusting him. This intellectual honesty is the brand — the design must make it
> visible, not merely describe it.
>
> **Deliver:** a wordmark for the full name, a separate abstract mark that works
> at 16px, and a lockup of the two.
>
> **Explore at least three of these directions, kept distinct rather than
> averaged:**
> 1. *The seal* — sits at the intersection of cryptographic sealing (his system
>    produces content-hash-sealed runs), document verification (his OCR reads
>    Indonesian ID documents), and Indonesian materai revenue stamps. Abstract
>    and geometric. Must not resemble an official state emblem.
> 2. *Replay* — the same glyph struck twice, offset, resolving into exact
>    registration. Determinism made visual.
> 3. *The append-only line* — a rule with unevenly spaced ticks; the log as a
>    scalable system element.
> 4. *The honest checkmark* — a verification tick carrying its own caveat, such
>    as an error bar beneath it.
>
> **Colour system — this carries the strategy.** His site tags every entry by how
> settled it is: seedling (half-formed, published anyway), budding (holding up,
> still revised), evergreen (would defend). Bind three palette colours to those
> three states so colour encodes epistemic confidence rather than mood. Add one
> accent for interaction only, and optionally one colour reserved solely for
> "this was verified" — used nowhere else, so scarcity gives it meaning. Warm
> neutral ground, not pure white or black. Light and dark modes both first-class.
> AA minimum, AAA where possible. Must hold up in greyscale and for red-green
> colourblind viewers, because these colours carry meaning.
>
> **Typography:** one family if possible, two maximum. Monospace is load-bearing
> — it sets metrics, dates, hashes and status tags — so choose it first. Tabular
> figures required.
>
> **Must survive:** 16px favicon, circular GitHub avatar, pure monochrome,
> inversion, an ASCII reduction for terminal and README use, a 1200×630 social
> card, and single-colour print.
>
> **Tone:** exact, candid, unhurried, engineered, and rooted in a specific place.
> Not startup-generic, not thought-leader, not cyberpunk, not motivational.
>
> **Do not use:** angle brackets, terminal cursors, hexagons, circuit traces,
> node-and-edge graphs, gradient blobs, glassmorphism, neon on black, rocket
> ships, or batik and wayang as surface decoration. If Indonesian visual
> language appears it must be structural and specific, never costume.
>
> **Deliver as:** SVG logo suite, favicon set, full colour specification with the
> semantic bindings and approved pairings, type scale with named roles, spacing
> system, usage guide with minimum sizes and clear space, and design tokens as
> CSS custom properties.
>
> **Judge it by:** does the mark survive 16px in one colour; does the colour
> system carry meaning rather than mood; would someone who read his technical
> writing recognise the same person in the identity.
