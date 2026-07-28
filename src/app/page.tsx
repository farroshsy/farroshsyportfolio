import { site } from "@/content/site";
import { featured, secondary } from "@/content/projects";
import { FeaturedCard, SecondaryRow } from "@/components/project-card";
import { PersonJsonLd } from "@/components/json-ld";
import { LogStream, MaturityLegend } from "@/components/log-stream";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <PersonJsonLd />

      <section className="pt-20 pb-16">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
          {site.name}
        </h1>
        <p className="mt-4 text-lg text-fg-muted text-pretty max-w-2xl">
          {site.tagline}
        </p>
        <div className="mt-8 space-y-4 max-w-2xl text-fg-muted">
          {site.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className="mt-8 font-mono text-xs text-fg-faint">{site.location}</p>
      </section>

      <section id="work" className="scroll-mt-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
          Selected work
        </h2>
        <div className="mt-6 space-y-6">
          {featured.map((p) => (
            <FeaturedCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {secondary.length > 0 && (
        <section className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
            Also
          </h2>
          <ul className="mt-4">
            {secondary.map((p) => (
              <SecondaryRow key={p.slug} project={p} />
            ))}
          </ul>
        </section>
      )}

      <section id="log" className="mt-20 scroll-mt-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
          The log
        </h2>
        <p className="mt-4 max-w-2xl text-fg-muted text-pretty">
          One stream: things shipped, things learned, things I am still unsure
          about. Each entry carries how settled it is, because a site that only
          publishes finished thoughts publishes almost nothing.
        </p>
        <MaturityLegend />
        <LogStream />
      </section>

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
          Contact
        </h2>
        <p className="mt-4 text-fg-muted max-w-2xl">
          Open to new roles. Best way to reach me is email.
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
