import type { Metadata } from "next";
import { LogStream, MaturityLegend } from "@/components/log-stream";

export const metadata: Metadata = {
  title: "Log",
  description:
    "One dated stream — notes, things learned, and things still unsettled.",
};

export default function LogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20">
      <h1 className="text-3xl font-semibold tracking-tight">Log</h1>
      <p className="mt-4 max-w-2xl text-fg-muted text-pretty">
        One stream, newest first. Every entry carries how settled it is, because
        a site that only publishes finished thoughts publishes almost nothing.
      </p>
      <MaturityLegend />
      <LogStream />
    </div>
  );
}
