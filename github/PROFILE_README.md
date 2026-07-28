<h1 align="center">Farros Hilmi Syafei</h1>

<p align="center">
  <em>I build systems that can be checked,<br>and publish the number that weakens the claim.</em>
</p>

<p align="center">
  <a href="https://farroshsyportfolio.vercel.app">
    <img src="https://img.shields.io/badge/portfolio-farroshsyportfolio.vercel.app-1B1815?style=flat-square&labelColor=F4F0E9" alt="Portfolio">
  </a>
  <a href="https://www.linkedin.com/in/farroshilmisyafei/">
    <img src="https://img.shields.io/badge/LinkedIn-farroshilmisyafei-2A4FC4?style=flat-square&labelColor=F4F0E9" alt="LinkedIn">
  </a>
  <a href="https://www.kaggle.com/farroshs">
    <img src="https://img.shields.io/badge/Kaggle-farroshs-2A4FC4?style=flat-square&labelColor=F4F0E9" alt="Kaggle">
  </a>
  <img src="https://img.shields.io/badge/Surabaya-Indonesia-8A8177?style=flat-square&labelColor=F4F0E9" alt="Surabaya, Indonesia">
</p>

---

### 🔬 [hcie-system](https://github.com/farroshsy/hcie-system)

**Event-sourced adaptive tutoring system and research instrument.**
Works with no interaction history and no embeddings — because a subject that
just opened has no history, and that is exactly when a learner needs it most.

| cold-start AUC | scale | replay | transfer |
|:--|:--|:--|:--|
| **0.6051** vs BKT 0.5963 | **1.98M** rows · 232,440 learners | **bit-identical** | **+0.053** placebo-corrected |

```console
$ make parity
BIT-IDENTICAL ✓  md5 3ab07694eabe0ad52c6378065cf23100
```

The reporting rule was fixed *before* any data was read: if accuracy pointed one
way within small groups and the other way in aggregate, both would be published.
It happened. Both are published.

> The pooled headline is partly a Simpson's-paradox aggregate; cite it **with**
> the per-window table, not instead of it.

`FastAPI` · `PostgreSQL` · `Redis` · `Kafka/Redpanda` · `CQRS` · `Next.js`

---

### 🪪 [computervision-api-system](https://github.com/farroshsy/computervision-api-system)

**Stateless verification API for Indonesian KTP, SIM, STNK and KIR.**
Returns `needs_review` rather than guessing.

| SIM | KTP | KIR | STNK |
|:--:|:--:|:--:|:--:|
| **90%** | **87%** | **86%** | **83%** |

```bash
docker pull ghcr.io/farroshsy/computervision-api-system:latest
```

An early version confidently reported `FM 517 H` as a licence plate. It was a
fragment of the TYPE row — `FUSO FM 517 HRDK` — which happens to have a plate's
exact shape. The system was not misreading. **It was misconfident.**

Region codes became a closed set. Wrong values fell from **28 to 2**.

STNK is still the weakest doctype and I have not fixed it.

`Python` · `FastAPI` · `PaddleOCR` · `YOLO` · `Redis` · `Docker`

---

<details>
<summary><b>Also building</b></summary>

<br>

| repo | what |
|:--|:--|
| [replay-backtest](https://github.com/farroshsy/replay-backtest) | a backtester where lookahead bias is *structurally impossible* |
| [ocr-benchmark-id](https://github.com/farroshsy/ocr-benchmark-id) | public benchmark for Indonesian document OCR — abstention is not an error |
| [polymarket-calibration](https://github.com/farroshsy/polymarket-calibration) | when a market says 70%, does it happen 70% of the time? |
| [restake-tvr](https://github.com/farroshsy/restake-tvr) | how much restaking collateral is actually redeemable? |
| [dokumen-id](https://github.com/farroshsy/dokumen-id) | free NIK/plate tools that never send your data anywhere |

</details>

<details>
<summary><b>One negative result, written down on purpose</b></summary>

<br>

I tried re-reading images at three scales to recover truncated characters. It
produced answers that were wrong **more confidently**, so I logged it as a
negative result rather than deleting the branch.

An unlogged failed experiment is one somebody runs again next quarter.

</details>
