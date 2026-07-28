"use client";

import { useRef, useState } from "react";

const DOC_TYPES = ["KTP", "SIM", "STNK", "KIR"] as const;
type DocType = (typeof DOC_TYPES)[number];

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

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; body: string; ok: boolean }
  | { status: "error"; message: string };

export function OcrDemo() {
  const [docType, setDocType] = useState<DocType>("KTP");
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
      let pretty = text;
      try {
        pretty = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        /* not JSON — show as-is */
      }
      setState({ status: "done", body: pretty, ok: res.ok });
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
              {t}
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
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                Response
              </p>
              <span
                className={`font-mono text-[11px] ${
                  state.ok ? "text-accent" : "text-verified"
                }`}
              >
                {state.ok ? "200 OK" : "error"}
              </span>
            </div>
            <pre className="mt-2 max-h-96 overflow-auto rounded border border-line bg-bg p-4 font-mono text-xs leading-relaxed">
              {state.body}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
