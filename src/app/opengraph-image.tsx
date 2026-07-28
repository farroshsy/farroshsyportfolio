import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#16140F",
          color: "#EDE8DE",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            // Not vermilion: that is reserved for verified facts only.
            color: "#A79E92",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {site.location}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 600, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#A79E92",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#6E675D" }}>
          github.com/farroshsy
        </div>
      </div>
    ),
    size,
  );
}
