"use client";

import { useRef, useState } from "react";

// AUTO first: the API's own type detection is the behaviour worth showing.
// Forcing a type on an unrelated photo makes the parser fill fields from
// whatever text it finds, so the forced types are opt-in.
const DOC_TYPES = ["AUTO", "KTP", "SIM", "STNK", "KIR"] as const;
type DocType = (typeof DOC_TYPES)[number];

const DOC_TYPE_LABEL: Record<DocType, string> = {
  AUTO: "Auto-detect",
  KTP: "KTP",
  SIM: "SIM",
  STNK: "STNK",
  KIR: "KIR",
};

/**
 * Drop synthetic / redacted sample images into public/samples/ and list them
 * here. Leave empty and the widget simply hides the sample buttons.
 *
 * Do NOT put real identity documents in this list — they would be served
 * publicly and permanently from the site's static assets.
 */
const SAMPLES: { label: string; docType: DocType; src: string }[] = [
  // { label: "KTP (synthetic)", docType: "KTP", src: "/samples/ktp-synthetic.jpg" },
];

// Plain-language versions of the API's validation reason codes. Unknown codes
// fall back to the code itself with underscores replaced.
const REASON_TEXT: Record<string, string> = {
  resolution_too_low: "image resolution is too low",
  image_blurry: "image is blurry",
  image_too_dark: "image is too dark",
  nik_pattern_not_found: "no valid NIK found",
  missing_card_header: "card header not found",
};

function reasonText(code: string): string {
  if (REASON_TEXT[code]) return REASON_TEXT[code];
  const markers = code.match(/^missing_([a-z]+)_markers$/);
  if (markers) return `no ${markers[1].toUpperCase()} markers found`;
  return code.replace(/_/g, " ");
}

type Field = { value: unknown; confidence?: number };
type Summary = {
  documentType: string;
  valid: boolean;
  reasons: string[];
  fields: [string, string][];
};

/** Pull the parts a reader needs out of the API response, or null if the
 *  body is not the shape we expect (then only the raw JSON is shown). */
function summarise(body: unknown): Summary | null {
  if (!body || typeof body !== "object") return null;
  const b = body as {
    document_type?: string;
    data?: {
      fields?: Record<string, Field>;
      validation?: { is_probably_valid?: boolean; reasons?: string[] };
    };
  };
  if (!b.data || typeof b.document_type !== "string") return null;
  const fields = Object.entries(b.data.fields ?? {})
    .filter(([, f]) => f && f.value !== null && f.value !== undefined && f.value !== "")
    .map(([k, f]) => [k.replace(/_/g, " "), String(f.value)] as [string, string]);
  return {
    documentType: b.document_type,
    valid: b.data.validation?.is_probably_valid === true,
    reasons: b.data.validation?.reasons ?? [],
    fields,
  };
}

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; raw: string; summary: Summary | null; ok: boolean }
  | { status: "error"; message: string };

export function OcrDemo() {
  const [docType, setDocType] = useState<DocType>("AUTO");
  const [state, setState] = useState<State>({ status: "idle" });
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function send(file: File, type: DocType) {
    setFileName(file.name);
    setState({ status: "loading" });

    const form = new FormData();
    form.append("file", file);
    form.append("document_type", type);

    try {
      const res = await fetch("/api/demo/ocr", {
        method: "POST",
        body: form,
      });
      const text = await res.text();
      let raw = text;
      let summary: Summary | null = null;
      try {
        const parsed = JSON.parse(text);
        raw = JSON.stringify(parsed, null, 2);
        if (res.ok) summary = summarise(parsed);
      } catch {
        /* not JSON — show as-is */
      }
      setState({ status: "done", raw, summary, ok: res.ok });
    } catch {
      setState({
        status: "error",
        message: "Request failed. The demo service may be down.",
      });
    }
  }

  async function runSample(sample: (typeof SAMPLES)[number]) {
    setDocType(sample.docType);
    try {
      const res = await fetch(sample.src);
      const blob = await res.blob();
      await send(new File([blob], sample.src.split("/").pop() ?? "sample"), sample.docType);
    } catch {
      setState({ status: "error", message: "Could not load the sample image." });
    }
  }

  return (
    <div className="border border-line rounded-lg bg-bg-raised overflow-hidden">
      <div className="border-b border-line px-5 py-3 flex items-center justify-between gap-3">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
          Try it
        </h2>
        <span className="font-mono text-[11px] text-fg-faint">
          POST /api/v1/ocr/file
        </span>
      </div>

      <div className="p-5">
        <div
          role="group"
          aria-label="Document type"
          className="flex flex-wrap gap-2"
        >
          {DOC_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setDocType(t)}
              aria-pressed={docType === t}
              className={`font-mono text-xs rounded border px-3 py-1.5 transition-colors ${
                docType === t
                  ? "border-accent text-accent"
                  : "border-line text-fg-muted hover:text-fg"
              }`}
            >
              {DOC_TYPE_LABEL[t]}
            </button>
          ))}
        </div>

        {SAMPLES.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
              Or run a sample
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SAMPLES.map((s) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => runSample(s)}
                  className="font-mono text-xs rounded border border-line px-3 py-1.5 text-fg-muted hover:text-accent hover:border-accent transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void send(f, docType);
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={state.status === "loading"}
            className="w-full rounded border border-dashed border-line px-4 py-8 text-sm text-fg-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
          >
            {state.status === "loading"
              ? "Processing…"
              : docType === "AUTO"
                ? "Upload a KTP, SIM, STNK or KIR image (JPEG, PNG, WebP · max 6 MB)"
                : `Upload a ${docType} image (JPEG, PNG, WebP · max 6 MB)`}
          </button>
          {fileName && (
            <p className="mt-2 font-mono text-[11px] text-fg-faint truncate">
              {fileName}
            </p>
          )}
        </div>

        <p className="mt-4 text-xs text-fg-muted leading-relaxed">
          <strong className="font-medium text-fg">Nothing is stored.</strong>{" "}
          The API is stateless: the image is processed in memory, the result is
          returned, and the bytes are dropped. No upload is written to disk and
          no image is logged. Please still prefer a synthetic or redacted
          document over a real one.
        </p>

        {state.status === "error" && (
          <p className="mt-4 text-sm text-accent">{state.message}</p>
        )}

        {state.status === "done" && (
          <div className="mt-4">
            {state.summary && <Verdict summary={state.summary} />}
            <details className="mt-4" open={!state.summary}>
              <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-wider text-fg-faint flex items-center justify-between">
                <span>Raw response</span>
                <span className={state.ok ? "text-accent" : "text-verified"}>
                  {state.ok ? "200 OK" : "error"}
                </span>
              </summary>
              <pre className="mt-2 max-h-96 overflow-auto rounded border border-line bg-bg p-4 font-mono text-xs leading-relaxed">
                {state.raw}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

function Verdict({ summary }: { summary: Summary }) {
  if (summary.documentType === "UNKNOWN") {
    return (
      <div className="rounded border border-line bg-bg p-4">
        <p className="font-mono text-xs uppercase tracking-wider text-fg">
          Not recognised · nothing extracted
        </p>
        <p className="mt-2 text-sm text-fg-muted">
          The photo did not carry enough markers of a KTP, SIM, STNK or KIR, so
          the API declined to guess a type or fill any fields. That is the
          intended behaviour, not a failure.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded border border-line bg-bg p-4">
      <p className="font-mono text-xs uppercase tracking-wider text-fg">
        {summary.documentType} ·{" "}
        {summary.valid ? (
          <span className="text-accent">looks valid</span>
        ) : (
          <span className="text-verified">needs review</span>
        )}
      </p>
      {!summary.valid && (
        <p className="mt-2 text-sm text-fg-muted">
          Flagged for a human because{" "}
          {summary.reasons.length > 0
            ? summary.reasons.map(reasonText).join(", ")
            : "the document did not pass validation"}
          . Fields below are what the parser read and are{" "}
          <strong className="font-medium text-fg">not verified</strong>.
        </p>
      )}
      {summary.fields.length > 0 ? (
        <dl
          className={`mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm ${
            summary.valid ? "" : "opacity-60"
          }`}
        >
          {summary.fields.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-mono text-xs text-fg-faint pt-0.5">{k}</dt>
              <dd className="text-fg-muted break-words">{v}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-2 text-sm text-fg-muted">No fields could be read.</p>
      )}
    </div>
  );
}
