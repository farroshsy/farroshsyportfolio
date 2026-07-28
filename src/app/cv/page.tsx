import type { Metadata } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae — ${site.name}`,
};

const education = [
  {
    school: "Institut Teknologi Sepuluh Nopember (ITS)",
    detail: "Informatics / Computer Science, Surabaya",
    year: "2020 — 2025",
  },
];

const skills = [
  {
    group: "Backend",
    items: ["Python", "FastAPI", "PostgreSQL", "Redis", "Kafka / Redpanda", "Docker"],
  },
  {
    group: "ML / CV",
    items: ["PaddleOCR", "Tesseract", "YOLO", "scikit-learn", "NumPy", "OpenCV"],
  },
  {
    group: "Frontend",
    items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Three.js"],
  },
  {
    group: "Architecture",
    items: ["Event sourcing", "CQRS", "Transactional outbox", "REST API design"],
  },
];

export default function CvPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-16">
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
            {site.role}
          </p>
          <p className="mt-3 text-fg-muted max-w-xl">{site.tagline}</p>
        </div>
        {/* Drop the exported PDF at public/cv.pdf, then set hasCvPdf. */}
        {site.hasCvPdf && (
          <a
            href="/cv.pdf"
            className="font-mono text-sm text-accent hover:underline underline-offset-4 shrink-0"
          >
            PDF ↓
          </a>
        )}
      </header>

      <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-fg-faint">
        <div className="flex gap-2">
          <dt className="sr-only">Location</dt>
          <dd>{site.location}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="sr-only">Email</dt>
          <dd>
            <a href={`mailto:${site.email}`} className="hover:text-fg">
              {site.email}
            </a>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="sr-only">GitHub</dt>
          <dd>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg"
            >
              github.com/farroshsy
            </a>
          </dd>
        </div>
      </dl>

      <section className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
          Projects
        </h2>
        <ul className="mt-4 space-y-5">
          {projects
            .filter((p) => p.featured)
            .map((p) => (
              <li key={p.slug}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium">{p.title}</h3>
                  <span className="font-mono text-xs text-fg-faint shrink-0">
                    {p.year}
                  </span>
                </div>
                <p className="mt-1 text-sm text-fg-muted">{p.blurb}</p>
                <p className="mt-1 font-mono text-[11px] text-fg-faint">
                  {p.stack.join(" · ")}
                </p>
              </li>
            ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
          Skills
        </h2>
        <dl className="mt-4 space-y-3">
          {skills.map((s) => (
            <div key={s.group} className="sm:flex sm:gap-6">
              <dt className="font-mono text-xs text-fg-faint sm:w-32 sm:shrink-0 sm:pt-0.5">
                {s.group}
              </dt>
              <dd className="text-sm text-fg-muted">{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
          Education
        </h2>
        <ul className="mt-4 space-y-3">
          {education.map((e) => (
            <li key={e.school}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-medium text-sm">{e.school}</h3>
                <span className="font-mono text-xs text-fg-faint shrink-0">
                  {e.year}
                </span>
              </div>
              <p className="mt-1 text-sm text-fg-muted">{e.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
