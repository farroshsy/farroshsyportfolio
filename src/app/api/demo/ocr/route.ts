import { NextResponse } from "next/server";

/**
 * Server-side proxy to the document verification API.
 *
 * Why a proxy instead of calling the API from the browser:
 *  - the API key stays server-side (a NEXT_PUBLIC_ var would ship it to
 *    every visitor)
 *  - no CORS configuration needed on the API
 *  - size/type/doctype limits are enforced before anything leaves this box
 *
 * Nothing is written to disk or logged here. The upload is streamed through
 * and dropped.
 */

const API_BASE = process.env.OCR_API_BASE ?? "";
const API_KEY = process.env.OCR_API_KEY ?? "";

const MAX_BYTES = 6 * 1024 * 1024; // 6 MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_DOCTYPES = new Set(["KTP", "SIM", "STNK", "KIR", "AUTO"]);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!API_BASE) {
    return NextResponse.json(
      { error: "Demo API is not configured. Set OCR_API_BASE." },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Malformed upload." },
      { status: 400 },
    );
  }

  const file = form.get("file");
  const docType = String(form.get("document_type") ?? "AUTO").toUpperCase();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED_DOCTYPES.has(docType)) {
    return NextResponse.json(
      { error: "Unsupported document type." },
      { status: 400 },
    );
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Upload a JPEG, PNG, or WebP image." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image is larger than 6 MB." },
      { status: 413 },
    );
  }

  const upstream = new FormData();
  upstream.append("file", file, "upload");
  upstream.append("document_type", docType);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);

  try {
    const res = await fetch(`${API_BASE}/api/v1/ocr/file`, {
      method: "POST",
      body: upstream,
      headers: API_KEY ? { "X-API-Key": API_KEY } : undefined,
      signal: controller.signal,
      cache: "no-store",
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") ?? "application/json",
        "cache-control": "no-store",
      },
    });
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      {
        error: aborted
          ? "The OCR service took too long to respond."
          : "Could not reach the OCR service.",
      },
      { status: 504 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
