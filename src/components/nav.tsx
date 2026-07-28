import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { Mark } from "./mark";

export function Nav() {
  return (
    <header className="border-b border-line">
      <nav className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 hover:text-accent transition-colors"
          aria-label={site.name}
        >
          <Mark size={22} />
          <span className="text-sm font-medium tracking-tight">
            {site.shortName}
          </span>
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link
            href="/#log"
            className="text-fg-muted hover:text-fg transition-colors"
          >
            log
          </Link>
          <Link
            href="/cv"
            className="text-fg-muted hover:text-fg transition-colors"
          >
            cv
          </Link>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-fg-muted hover:text-fg transition-colors"
          >
            github
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
