// ---------------------------------------------------------------------------
// Photographs.
//
// Drop files in public/photos/ and add an entry per image. Captions are
// optional; place and date are not — a photograph without them is decoration,
// and decoration is the one thing this site does not do.
//
// Keep the frame honest: no stock, no AI-generated images, nothing you did not
// take. The section is worth nothing the moment that stops being true.
// ---------------------------------------------------------------------------

export type Photo = {
  src: string; // /photos/filename.jpg
  alt: string; // for people who cannot see it — describe, do not caption
  place: string;
  date: string; // ISO, YYYY-MM or YYYY-MM-DD
  caption?: string;
  /** Intrinsic size, so the layout does not jump while loading. */
  width: number;
  height: number;
};

export const photos: Photo[] = [
  // {
  //   src: "/photos/tunjungan-1840.jpg",
  //   alt: "Evening traffic on a wide street, shophouse facades in shadow",
  //   place: "Jalan Tunjungan, Surabaya",
  //   date: "2026-07-04",
  //   caption: "18:40",
  //   width: 2000,
  //   height: 1333,
  // },
];
