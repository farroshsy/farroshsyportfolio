import Link from "next/link";
import { log, fmtDate, MATURITY_NOTE, type Maturity } from "@/content/log";
import { Inline } from "./prose";

// Outlined, never filled — tags annotate, they do not shout.
// Contrast ordering is preserved across themes: seedling is always the
// quietest thing on the page, evergreen always the loudest.
const MATURITY_STYLE: Record<Maturity, string> = {
  seedling: "text-seedling border-seedling",
  budding: "text-budding border-budding",
  evergreen: "text-evergreen border-evergreen",
};

export function LogStream() {
  return (
    <ol className="mt-8 space-y-0">
      {log.map((e) => (
        <li
          key={e.id}
          className="border-t border-line py-8 grid gap-3 sm:grid-cols-[7.5rem_1fr] sm:gap-8"
        >
          <div className="flex sm:flex-col gap-3 sm:gap-2 items-baseline sm:items-start">
            <time className="font-mono text-xs text-fg-faint whitespace-nowrap">
              {fmtDate(e.date)}
            </time>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
              {e.kind}
            </span>
          </div>

          <div className="max-w-2xl">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-medium leading-snug text-pretty">
                {e.title}
              </h3>
              <span
                title={MATURITY_NOTE[e.maturity]}
                className={`shrink-0 font-mono text-[10px] uppercase tracking-wider border px-2 py-0.5 ${MATURITY_STYLE[e.maturity]}`}
              >
                {e.maturity}
              </span>
            </div>

            {e.body && (
              <div className="mt-3 space-y-3 text-sm text-fg-muted">
                {e.body.map((p, i) => (
                  <p key={i} className="text-pretty">
                    <Inline text={p} />
                  </p>
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              {e.meta && (
                <span className="font-mono text-[11px] text-fg-faint">
                  {e.meta}
                </span>
              )}
              {e.href && (
                <Link
                  href={e.href}
                  className="text-xs text-accent hover:underline underline-offset-4"
                >
                  case study →
                </Link>
              )}
              {e.external && (
                <a
                  href={e.external}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-accent hover:underline underline-offset-4"
                >
                  source ↗
                </a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function MaturityLegend() {
  return (
    <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
      {(Object.keys(MATURITY_NOTE) as Maturity[]).map((m) => (
        <div key={m} className="flex items-baseline gap-2">
          <dt
            className={`font-mono text-[10px] uppercase tracking-wider border px-2 py-0.5 ${MATURITY_STYLE[m]}`}
          >
            {m}
          </dt>
          <dd className="text-xs text-fg-muted">{MATURITY_NOTE[m]}</dd>
        </div>
      ))}
    </dl>
  );
}
