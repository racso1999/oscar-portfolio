import { useRef, useEffect, useState } from 'react';
import { blogPosts } from '../../data/blog';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

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
          <div className="max-h-96 overflow-y-auto px-5 py-5 space-y-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.45s ease',
            }}
          >
            {blogPosts.map((post) => (
              <div key={post.slug}>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  {dateFormatter.format(new Date(post.date))}
                </p>
                <p className="text-base font-semibold text-foreground mb-3">
                  {post.title}
                </p>
                <div className="space-y-3">
                  {post.body.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogBubble;
