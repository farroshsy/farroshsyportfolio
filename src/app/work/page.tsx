import type { Metadata } from "next";
import { featured } from "@/content/projects";
import { FeaturedCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Work",
  description: "Systems that shipped, with their measured results and limits.",
};

export default function WorkIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20">
      <h1 className="text-3xl font-semibold tracking-tight">Work</h1>
      <p className="mt-4 max-w-2xl text-fg-muted text-pretty">
        Systems that shipped and were measured. Each page states what the
        numbers show and what they do not — the second part is usually the more
        useful half.
      </p>
      <p className="mt-3 max-w-2xl text-sm text-fg-faint text-pretty">
        There are two. A project earns a page here when the site can show
        something: a running demo, a measured result, an argument worth reading.
        Everything else lives in the lab or stays on GitHub.
      </p>

      <div className="mt-10 space-y-6">
        {featured.map((p) => (
          <FeaturedCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
