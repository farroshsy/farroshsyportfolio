import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-3xl px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-fg-muted">
        <p className="font-mono text-xs">{site.location}</p>
        <div className="flex gap-5">
          <a
            href={`mailto:${site.email}`}
            className="hover:text-fg transition-colors"
          >
            email
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg transition-colors"
          >
            github
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg transition-colors"
          >
            linkedin
          </a>
          <a
            href={site.links.kaggle}
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg transition-colors"
          >
            kaggle
          </a>
        </div>
      </div>
    </footer>
  );
}
