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
        <div className="flex items-center gap-4 sm:gap-5 text-sm">
          <Link href="/work" className="text-fg-muted hover:text-fg transition-colors">
            work
          </Link>
          <Link href="/lab" className="text-fg-muted hover:text-fg transition-colors">
            lab
          </Link>
          <Link href="/log" className="text-fg-muted hover:text-fg transition-colors">
            log
          </Link>
          <Link href="/photos" className="hidden sm:inline text-fg-muted hover:text-fg transition-colors">
            photos
          </Link>
          <Link href="/cv" className="text-fg-muted hover:text-fg transition-colors">
            cv
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
