import Link from "next/link";
import { site } from "@/content/site";
import { featured } from "@/content/projects";
import { log, fmtDate } from "@/content/log";
import { PersonJsonLd } from "@/components/json-ld";

const DOORS = [
  {
    href: "/work",
    label: "Work",
    note: "Systems that shipped, with the numbers and the limits.",
  },
  {
    href: "/lab",
    label: "Lab",
    note: "Personal explorations. Unfinished on purpose.",
  },
  {
    href: "/log",
    label: "Log",
    note: "Notes, things learned, things I am still unsure about.",
  },
  {
    href: "/photos",
    label: "Photos",
    note: "Surabaya, mostly.",
  },
];

export default function Home() {
  const recent = log.slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-6">
      <PersonJsonLd />

      <section className="pt-24 pb-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {site.name}
        </h1>
        <p className="mt-5 text-xl text-fg-muted text-pretty max-w-xl leading-snug">
          {site.tagline}
        </p>
        <p className="mt-6 font-mono text-xs text-fg-faint">{site.location}</p>
      </section>

      <nav aria-label="Sections" className="mt-14 border-t border-line">
        {DOORS.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="group flex items-baseline justify-between gap-6 border-b border-line py-5 hover:text-accent transition-colors"
          >
            <span className="text-lg font-medium">{d.label}</span>
            <span className="text-sm text-fg-muted text-right group-hover:text-accent transition-colors">
              {d.note}
            </span>
          </Link>
        ))}
      </nav>

      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
          Latest
        </h2>
        <ul className="mt-5 space-y-4">
          {recent.map((e) => (
            <li key={e.id} className="flex gap-4 items-baseline">
              <time className="font-mono text-xs text-fg-faint w-24 shrink-0">
                {fmtDate(e.date)}
              </time>
              <Link
                href="/log"
                className="text-sm hover:text-accent transition-colors text-pretty"
              >
                {e.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/log"
          className="mt-5 inline-block font-mono text-xs text-accent hover:underline underline-offset-4"
        >
          all entries →
        </Link>
      </section>

      <section className="mt-16 border-t border-line pt-10 pb-4">
        <p className="text-fg-muted max-w-xl text-pretty">
          {featured.length} systems worth reading about, and a lab for the rest.
          Open to new roles — email is the fastest way to reach me.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-4 inline-block font-mono text-sm text-accent hover:underline underline-offset-4"
        >
          {site.email}
        </a>
      </section>
    </div>
  );
}
