import { useRef, useEffect, useState } from 'react';

interface ContactProps {
  githubUrl?: string;
}

export function Contact({ githubUrl }: ContactProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const githubHref = githubUrl ?? 'https://github.com/racso1999';
  const githubText = githubHref
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="relative py-8 md:py-10"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div
          className="border-t border-border pt-6 md:pt-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 12}px)`,
            transition: 'all 0.8s ease',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-sm md:text-base text-muted-foreground">
            <a
              href="mailto:jones.oscar.work@outlook.com"
              className="hover:text-foreground transition-colors"
            >
              jones.oscar.work@outlook.com
            </a>
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {githubText}
            </a>
            <a
              href="https://www.linkedin.com/in/oscar-jones-91b349294"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              linkedin.com/in/oscar-jones-91b349294
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
