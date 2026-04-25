import { AsciiCard } from "@/components/ui/AsciiCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GenerativeCanvas } from "@/components/canvas/GenerativeCanvas";

interface FeaturedProps {
  project: {
    title: string;
    description: string;
    tags: string[];
    link: string;
  };
  post: {
    title: string;
    description: string;
    tags: string[];
    slug: string;
  };
}

export function Featured({ project, post }: FeaturedProps) {
  return (
    <section className="mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <SectionLabel label="Featured Project" className="mb-4" />
          <AsciiCard
            figure={1}
            title={project.title}
            description={project.description}
            tags={project.tags}
            href={project.link}
          >
            <GenerativeCanvas
              config={{ variant: "grid", seed: 7, color: "#00efa6" }}
              className="w-full h-full"
            />
          </AsciiCard>
        </div>
        <div>
          <SectionLabel label="Featured Post" className="mb-4" />
          <AsciiCard
            figure={2}
            title={post.title}
            description={post.description}
            tags={post.tags}
            href={`/blog/${post.slug}`}
          >
            <GenerativeCanvas
              config={{ variant: "particles", seed: 13, color: "#00efa6" }}
              className="w-full h-full"
            />
          </AsciiCard>
        </div>
      </div>
    </section>
  );
}
