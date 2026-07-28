import type { Metadata } from "next";
import { lab, LAB_STATUS_NOTE, type LabStatus } from "@/content/lab";
import { Prose } from "@/components/prose";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Personal explorations — unfinished, uncertain, and sometimes abandoned.",
};

const STATUS_STYLE: Record<LabStatus, string> = {
  exploring: "text-seedling border-seedling",
  building: "text-budding border-budding",
  shelved: "text-fg-faint border-fg-faint",
};

function fmtStarted(iso: string) {
  const [y, m] = iso.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[Number(m) - 1]} ${y}`;
}

export default function LabIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20">
      <h1 className="text-3xl font-semibold tracking-tight">Lab</h1>
      <p className="mt-4 max-w-2xl text-fg-muted text-pretty">
        Personal projects and open questions. Nothing here is finished, and some
        of it will be wrong. Kept separate from the work section for exactly
        that reason — mixing the two would make both harder to trust.
      </p>

      <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {(Object.keys(LAB_STATUS_NOTE) as LabStatus[]).map((s) => (
          <div key={s} className="flex items-baseline gap-2">
            <dt
              className={`font-mono text-[10px] uppercase tracking-wider border px-2 py-0.5 ${STATUS_STYLE[s]}`}
            >
              {s}
            </dt>
            <dd className="text-xs text-fg-muted">{LAB_STATUS_NOTE[s]}</dd>
          </div>
        ))}
      </dl>

      {lab.length === 0 ? (
        <div className="mt-12 border border-line bg-bg-raised p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
            Empty
          </p>
          <p className="mt-4 text-fg-muted max-w-xl text-pretty">
            Nothing here yet. This section stays empty until something is
            genuinely underway — an entry for a project that has only been
            thought about would be the one kind of dishonesty this site cannot
            afford.
          </p>
        </div>
      ) : (
        <ol className="mt-12">
          {lab.map((e) => (
            <li key={e.slug} className="border-t border-line py-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium text-lg leading-snug">
                    {e.title}
                  </h2>
                  <p className="mt-2 text-sm text-fg-muted italic text-pretty">
                    {e.question}
                  </p>
                </div>
                <span
                  className={`shrink-0 font-mono text-[10px] uppercase tracking-wider border px-2 py-0.5 ${STATUS_STYLE[e.status]}`}
                >
                  {e.status}
                </span>
              </div>

              <div className="mt-4">
                <Prose paragraphs={e.body} />
              </div>

              {e.outcome && (
                <p className="mt-4 border-l-2 border-line pl-4 text-sm text-fg-muted text-pretty">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                    Why it stopped ·{" "}
                  </span>
                  {e.outcome}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] text-fg-faint">
                  started {fmtStarted(e.started)}
                </span>
                {e.stack && (
                  <span className="font-mono text-[11px] text-fg-faint">
                    {e.stack.join(" · ")}
                  </span>
                )}
                {e.repo && (
                  <a
                    href={e.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-accent hover:underline underline-offset-4"
                  >
                    source ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
