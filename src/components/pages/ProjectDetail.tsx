import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-python';
import { projects } from '../../data/projects';
import { Contact } from '../sections/Contact';
import cropDatabaseSql from '../../assets/crop-data-sql-database.sql?raw';
import wasteRoutingPseudocode from '../../assets/greedy-waste-routing-pseudocode.txt?raw';
import wasteRoutingCode from '../../assets/greedy-waste-routing-code.py?raw';

const uploadDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const devLogDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

interface ProjectDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

interface CodeSample {
  language: 'sql' | 'python';
  content: string;
}

interface ProjectSection {
  title: string;
  text: string;
  imageUrl?: string;
  imageAlt?: string;
  codeSamples?: CodeSample[];
}

interface DevLogEntry {
  uploadedAt: string;
  summary: string;
}

interface ProjectExtraContent {
  intro?: string;
  codeSamples?: CodeSample[];
  sections?: ProjectSection[];
  devLog?: DevLogEntry[];
}

const PROJECT_EXTRA_CONTENT: Record<string, ProjectExtraContent> = {
  'jobe': {
    devLog: [
      {
        uploadedAt: '2026-04-03T22:16:10Z',
        summary:
          'Added the Gemini parsing layer to analyze email context and extract job-application signal from inbox content.',
      },
      {
        uploadedAt: '2026-04-03T22:16:24Z',
        summary:
          'Implemented database setup and the JobApplication model so parsed updates can be persisted as structured application records.',
      },
      {
        uploadedAt: '2026-04-03T22:19:45Z',
        summary:
          'Completed initial app setup and committed a clean baseline excluding secrets and generated artifacts.',
      },
    ],
  },
  'crop-data-sql-database': {
    intro:
      'This project was built with a focused goal: to move beyond surface-level SQL and develop a genuine understanding of relational database design from the ground up. Using an agricultural domain as the subject matter, I modeled real-world data around crops, their growing conditions, seasons, and related attributes into a fully normalized relational schema.\n\nThe process pushed me to think carefully about how entities relate to one another, defining cardinalities, justifying join tables, and documenting why each table exists rather than just making it work. Deciding whether a relationship was one-to-many or many-to-many, and then implementing that correctly in SQL, turned abstract theory into something concrete and defensible.\n\nBeyond the schema itself, the project strengthened my ability to translate real-world requirements into a data model, a skill that sits at the core of backend and data engineering work. I also explored how an API might cleanly expose this structure, and contrasted the relational approach against document-based alternatives, weighing the tradeoffs around integrity, scalability, and query flexibility.\n\nOverall, this project solidified my SQL fundamentals while improving the way I reason about and communicate data design decisions.',
    codeSamples: [
      {
        language: 'sql',
        content: cropDatabaseSql,
      },
    ],
  },
  'greedy-waste-routing-optimizer': {
    codeSamples: [
      {
        language: 'python',
        content: wasteRoutingPseudocode,
      },
      {
        language: 'python',
        content: wasteRoutingCode,
      },
    ],
  },
  'agentic-application-system': {
    intro:
      'Here\'s another fun weekend project that has become something a little bigger. After getting disheartened when rejected from my dream job, I sat back and decided to do something about the broken system that is the tech market. This is not to say I support AI job applications necessarily. This project is a proof of concept exploring what autonomous agentic workflows are capable of. Automating applications at scale only perpetuates a broken process.\n\nThe project uses a fairly standard pipeline, however we experimented a lot with agentic workflows and really tried to push the limits of our capability in applying this tech. The pipeline is as such: a Scout agent discovers and deduplicates job listings across multiple boards, a Matcher scores each listing against your CV, a document generation stage produces a tailored CV and cover letter, and an Auto Apply Worker submits the application.\n\nBelow is a UML that overviews the system and a link to the full source code is on the project header on the main page. Feel free to send me an email if anything interests you or you want to learn more.\n\nWe\'re currently working on integrating correspondence automation that pulls and stores all relevant emails on the job dashboard. Honestly, I\'m building this feature for myself. I\'m fed up of having to manually search back through my inbox. It\'s also quite difficult keeping track of employers that have responded to me and who I need to reply back to, so this system will fix that.',
    devLog: [
      {
        uploadedAt: '2026-02-08T04:32:03Z',
        summary:
          'Initialized the agent-service Python backend as the core execution layer for the application workflow and containerized runtime.',
      },
      {
        uploadedAt: '2026-02-08T04:32:18Z',
        summary:
          'Added the Next.js dashboard frontend to visualize job pipeline state and provide a central surface for tracking application progress.',
      },
      {
        uploadedAt: '2026-02-09T04:35:31Z',
        summary:
          'Integrated Gmail OAuth, Docker improvements, and dashboard updates to strengthen end-to-end data ingestion and deployment flow.',
      },
      {
        uploadedAt: '2026-02-09T05:06:13Z',
        summary:
          'Made Gmail OAuth redirect URI configurable via environment variables to support safer multi-environment setup and deployment.',
      },
      {
        uploadedAt: '2026-02-10T01:22:46Z',
        summary:
          'Implemented an automated test runner with reporting outputs for faster validation in local and CI workflows.',
      },
      {
        uploadedAt: '2026-02-10T03:12:25Z',
        summary:
          'Expanded CI/CD to publish tag images and deploy from GHCR, reducing manual deployment friction for iterative releases.',
      },
      {
        uploadedAt: '2026-02-10T05:19:39Z',
        summary:
          'Finalized a permissions and identity hardening pass by aligning service UID handling with mounted data volumes for stable runtime writes.',
      },
    ],
  },
};

export function ProjectDetail({ slug, onNavigate }: ProjectDetailProps) {
  const project = projects.find((item) => item.slug === slug);
  const extraContent = project ? PROJECT_EXTRA_CONTENT[project.slug] : undefined;
  const sections = extraContent?.sections;
  const descriptionToShow = extraContent?.intro ?? project?.description ?? '';
  const devLogEntries = extraContent?.devLog ?? [];
  const codeSamples = (
    sections
      ? sections.flatMap((section) => section.codeSamples ?? [])
      : extraContent?.codeSamples ?? []
  ).filter((sample) => sample.content?.trim().length > 0);

  useEffect(() => {
    if (codeSamples.length > 0) {
      Prism.highlightAll();
    }
  }, [codeSamples]);

  if (!project) {
    return (
      <section className="min-h-[70vh] pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
            Project
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Project not found
          </h1>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            This project page is a placeholder. Check back soon for the full write-up.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
            onClick={() => onNavigate('/')}
          >
            Back to home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-sm uppercase tracking-widest text-primary mb-3">
          Project
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5">
          {project.title}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Uploaded: {uploadDateFormatter.format(new Date(project.uploadedAt))}
        </p>
        <div className="mt-8 space-y-8 md:space-y-10">
          {sections ? (
            <div className="space-y-10">
              {sections.map((section, sectionIndex) => (
                <div key={`${section.title}-${sectionIndex}`} className="space-y-3">
                  <h2 className="text-muted-foreground text-lg leading-relaxed font-normal">
                    {section.title}:
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                    {section.text}
                  </p>

                  {section.imageUrl && (
                    <div className="rounded-2xl overflow-hidden border border-border bg-card/50">
                      <img
                        src={section.imageUrl}
                        alt={section.imageAlt ?? `${project.title} image`}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {section.codeSamples?.filter((sample) => sample.content?.trim().length > 0).map((sample, codeIndex) => (
                    <pre key={`${section.title}-${sample.language}-${codeIndex}`} className="rounded-2xl border border-border p-6 overflow-x-auto text-sm">
                      <code className={`language-${sample.language}`}>{sample.content}</code>
                    </pre>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              {descriptionToShow}
            </p>
          )}

          <p className="text-muted-foreground text-lg leading-relaxed">
            Feel free to check out the source code using the link in the footer.
          </p>

          <div className="space-y-10">
            {project.imageUrl && (
              <div className="rounded-2xl border border-border bg-[#0b0b0b] p-3 md:p-4 overflow-x-auto">
                <a href={project.imageUrl} target="_blank" rel="noreferrer" className="block">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} UML`}
                    className="w-auto max-w-none md:max-w-full h-auto mx-auto"
                    loading="eager"
                    style={{
                      filter: project.slug === 'agentic-application-system' ? 'invert(1) hue-rotate(180deg)' : undefined,
                    }}
                  />
                </a>
              </div>
            )}

            {project.pdfUrl && (
              <div className="rounded-2xl border border-border bg-card/60 overflow-hidden">
                <iframe
                  title={`${project.title} report`}
                  src={project.pdfUrl}
                  className="w-full h-[720px]"
                />
              </div>
            )}

            {!sections && codeSamples.map((sample, index) => (
              <div key={`${sample.language}-${index}`}>
                <pre className="rounded-2xl border border-border p-6 overflow-x-auto text-sm">
                  <code className={`language-${sample.language}`}>{sample.content}</code>
                </pre>
              </div>
            ))}

            {project.videoUrl && (
              <div className="rounded-2xl overflow-hidden border border-border">
                <video
                  className="w-full h-[360px] md:h-[420px] object-cover"
                  autoPlay
                  muted
                  playsInline
                  loop
                  controls
                  preload="auto"
                  onLoadedData={(event) => {
                    const video = event.currentTarget;
                    video.pause();
                    video.currentTime = 0;
                  }}
                >
                  <source src={project.videoUrl} />
                </video>
              </div>
            )}

            {devLogEntries.length > 0 && (
              <div className="pt-4">
                <h2 className="text-xl font-semibold text-foreground mb-4">Devlog</h2>
                <div className="border-t border-border">
                  {devLogEntries.map((entry, index) => (
                    <article key={`${entry.uploadedAt}-${index}`} className="py-4 border-b border-border last:border-b-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        Uploaded {devLogDateFormatter.format(new Date(entry.uploadedAt))}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{entry.summary}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      <Contact githubUrl={project.githubUrl} />
    </section>
  );
}

export default ProjectDetail;
