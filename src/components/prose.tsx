import { Fragment } from "react";

/**
 * Minimal inline renderer: supports **bold** and nothing else.
 * Deliberately not a Markdown pipeline — case-study bodies are short and
 * typed, and a full MDX toolchain would be more moving parts than the
 * content justifies.
 */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-medium text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-fg-muted">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-pretty">
          <Inline text={p} />
        </p>
      ))}
    </div>
  );
}
