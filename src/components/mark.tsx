/**
 * The seal.
 *
 * A stamp body with a perforated edge holding two entries of a record — the
 * second entry short, because the record is open rather than filled. Sits on
 * the one point where content-hash sealing, document verification and materai
 * all meet.
 *
 * Two cuts, per the identity spec:
 *   full  — with perforation, 24px and above
 *   micro — perforation removed, below 24px, where it turns to fuzz
 *
 * Never rotate, outline, or stroke it. It is a solid form with one counter.
 */

const PERF_POSITIONS = [12, 20, 28, 36, 44, 52];

export function Mark({
  size = 40,
  cut = "auto",
  className,
  title = "Seal mark",
}: {
  size?: number;
  cut?: "full" | "micro" | "auto";
  className?: string;
  title?: string;
}) {
  const resolved = cut === "auto" ? (size < 24 ? "micro" : "full") : cut;
  const maskId = `seal-perf-${size}-${resolved}`;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
      style={{ display: "block", flex: "none" }}
    >
      {resolved === "full" && (
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width="64" height="64" fill="#fff" />
            <g fill="#000">
              {PERF_POSITIONS.map((p) => (
                <circle key={`t${p}`} cx={p} cy={4} r="2.8" />
              ))}
              {PERF_POSITIONS.map((p) => (
                <circle key={`b${p}`} cx={p} cy={60} r="2.8" />
              ))}
              {PERF_POSITIONS.map((p) => (
                <circle key={`l${p}`} cx={4} cy={p} r="2.8" />
              ))}
              {PERF_POSITIONS.map((p) => (
                <circle key={`r${p}`} cx={60} cy={p} r="2.8" />
              ))}
            </g>
          </mask>
        </defs>
      )}

      {/* Body inset 4, ring thickness 10. */}
      <path
        d="M4 4 H60 V60 H4 Z M14 14 V50 H50 V14 Z"
        fillRule="evenodd"
        fill="currentColor"
        {...(resolved === "full" ? { mask: `url(#${maskId})` } : {})}
      />
      {/* Two entries. The second is short: the record is open, not filled. */}
      <rect x="18" y="25" width="28" height="5" fill="currentColor" />
      <rect x="18" y="35" width="17" height="5" fill="currentColor" />
    </svg>
  );
}

/**
 * The append-only line, demoted from a logo candidate to page furniture.
 * Ticks are unevenly spaced because entries are.
 */
export function LogRule({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 24"
      width="64"
      height="24"
      aria-hidden
      className={className}
      style={{ display: "block" }}
    >
      <rect x="5" y="11" width="54" height="2" fill="currentColor" />
      {[9, 16, 21, 31, 39, 42, 53].map((x) => (
        <rect key={x} x={x} y="6" width="1.5" height="12" fill="currentColor" />
      ))}
    </svg>
  );
}
