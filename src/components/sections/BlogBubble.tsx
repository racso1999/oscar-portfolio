import { useRef, useEffect, useState } from 'react';

interface BlogBubbleProps {
  onNavigate: (path: string) => void;
}

export function BlogBubble({ onNavigate }: BlogBubbleProps) {
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
    <section ref={sectionRef} className="relative pb-16 md:pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div
          role="link"
          tabIndex={0}
          onClick={() => onNavigate('/blog')}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate('/blog')}
          className="cursor-pointer overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-colors"
        >
          <div
            className="px-5 py-5"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.45s ease',
            }}
          >
            <p className="text-sm text-muted-foreground">Coming soon.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogBubble;
