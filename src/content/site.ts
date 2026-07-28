// ---------------------------------------------------------------------------
// Single edit point for everything that is "about you".
// Change copy here, not in the components.
// ---------------------------------------------------------------------------

export const site = {
  name: "Farros Hilmi Syafei",
  // The site's own name / handle. Matches the GitHub, LinkedIn and Kaggle
  // handle, so the same string identifies you everywhere.
  shortName: "farroshsy",
  // NOT shown anywhere on the site. This exists only for the two places whose
  // format demands a job title: schema.org structured data and the CV header.
  //
  // Deliberately broad. Direction is undecided, so nothing here should narrow
  // the search on your behalf — a narrower title can be adopted later once
  // there is a reason to, and this is the only line that has to change.
  role: "Software engineer",

  // The site leads with this instead of a title. It answers the question a
  // visitor actually has, and it forecloses nothing.
  tagline:
    "I build systems that can be checked, and publish the number that weakens the claim.",
  location: "Surabaya, Indonesia",
  // Canonical origin — drives canonical URLs, OG cards and the sitemap.
  // Currently the Vercel default. Swap this for the real domain once bought;
  // it is the only place the origin is written down.
  url: "https://farroshsy.vercel.app",

  // Flip to true once public/cv.pdf exists. Until then the CV page hides the
  // download link rather than shipping a 404.
  hasCvPdf: false,
  // Where the OCR demo widget sends uploads. Empty string = demo runs in
  // "offline" mode and shows a canned response instead of calling out.
  apiBase: process.env.NEXT_PUBLIC_OCR_API_BASE ?? "",
  email: "farros.syafei@gmail.com",
  links: {
    github: "https://github.com/farroshsy",
    linkedin: "https://www.linkedin.com/in/farroshilmisyafei/",
    kaggle: "https://www.kaggle.com/farroshs",
  },
  intro: [
    "Most of my work sits at the boundary between a messy real-world artifact — a photographed ID card, a student's half-formed answer — and a service that has to make a defensible decision about it.",
    "So far that has meant event-sourced services and applied computer vision, in Indonesian document and education domains. What it means next is genuinely open.",
  ],
} as const;

export type Site = typeof site;
