import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/projects';

interface TimelineProps {
  onOpenProject: (slug: string) => void;
}

export function Timeline({ onOpenProject }: TimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-8 pb-16 md:pt-10 md:pb-20"
    >
      {/* Project List */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="hidden md:grid md:grid-cols-[2fr_3fr_1fr] px-5 py-3 bg-card/60 border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <span>Project</span>
            <span>Stack</span>
            <span className="text-right">GitHub</span>
          </div>

          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="grid md:grid-cols-[2fr_3fr_1fr] gap-3 md:gap-4 px-4 md:px-5 py-4 border-b border-border last:border-b-0 hover:bg-card/40 transition-colors"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 14}px)`,
                transition: `opacity 0.45s ease ${index * 0.06}s, transform 0.45s ease ${index * 0.06}s`,
              }}
            >
              <button
                type="button"
                onClick={() => onOpenProject(project.slug)}
                className="text-left text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                {project.title}
              </button>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.technologies.join(' • ')}
              </p>

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 justify-start md:justify-end text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <span>View Repo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-sm text-muted-foreground justify-self-start md:justify-self-end">
                  No repo yet
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
