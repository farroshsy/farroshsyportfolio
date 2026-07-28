import type { Metadata } from "next";
import Image from "next/image";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photographs, mostly Surabaya.",
};

function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return d ? `${Number(d)} ${months[Number(m) - 1]} ${y}` : `${months[Number(m) - 1]} ${y}`;
}

export default function PhotosIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20">
      <h1 className="text-3xl font-semibold tracking-tight">Photos</h1>
      <p className="mt-4 max-w-2xl text-fg-muted text-pretty">
        Surabaya, mostly. Every frame is mine — place and date attached, because
        a photograph without them is decoration.
      </p>

      {photos.length === 0 ? (
        <div className="mt-12 border border-line bg-bg-raised p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
            Empty
          </p>
          <p className="mt-4 text-fg-muted max-w-xl text-pretty">
            Nothing here yet. Drop files into{" "}
            <code className="font-mono text-sm">public/photos/</code> and add an
            entry to{" "}
            <code className="font-mono text-sm">src/content/photos.ts</code>.
          </p>
        </div>
      ) : (
        <ul className="mt-12 space-y-16">
          {photos.map((p) => (
            <li key={p.src}>
              {/* Museum-placard treatment: image first, caption well below. */}
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                className="w-full h-auto bg-bg-sunken"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                  {p.place}
                </span>
                <time className="font-mono text-[11px] text-fg-faint">
                  {fmtDate(p.date)}
                </time>
                {p.caption && (
                  <span className="text-sm text-fg-muted">{p.caption}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
