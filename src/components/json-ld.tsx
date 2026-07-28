import { site } from "@/content/site";
import type { Project } from "@/content/projects";

function Script({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is read by search engines and by AI screening agents.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        url: site.url,
        email: `mailto:${site.email}`,
        jobTitle: site.role,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Surabaya",
          addressCountry: "ID",
        },
        sameAs: [
          site.links.github,
          site.links.linkedin,
          site.links.kaggle,
        ],
        knowsAbout: [
          "Backend engineering",
          "Event sourcing",
          "CQRS",
          "Computer vision",
          "Optical character recognition",
          "FastAPI",
          "PostgreSQL",
        ],
      }}
    />
  );
}

export function ProjectJsonLd({ project }: { project: Project }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.blurb,
        codeRepository: project.repo,
        programmingLanguage: project.stack,
        author: {
          "@type": "Person",
          name: site.name,
          url: site.url,
        },
      }}
    />
  );
}
