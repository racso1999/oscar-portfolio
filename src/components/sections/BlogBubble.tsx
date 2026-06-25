import { useRef, useEffect, useState } from 'react';
import { blogPosts } from '../../data/blog';
import { Prompt } from '../term/Prompt';

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
          {blogPosts.length === 0 ? (
            <div
              className="px-5 py-5"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.45s ease',
              }}
            >
              <p className="text-sm text-muted-foreground">Coming soon.</p>
            </div>
          ) : (
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.45s ease',
              }}
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <Prompt path="~/blog" command="cat" arg="latest.md" />
                <span
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {blogPosts.length} {blogPosts.length === 1 ? 'entry' : 'entries'}
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto px-5 py-5 space-y-8">
              {blogPosts.map((post) => (
                <div key={post.slug}>
                  <p
                    className="flex items-center gap-2 text-xs text-muted-foreground mb-1"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    <span style={{ color: 'var(--term-green)' }}>●</span>
                    {dateFormatter.format(new Date(post.date))}
                  </p>
                  <p className="text-base font-semibold text-foreground mb-3">
                    {post.title}
                  </p>
                  <div className="space-y-3">
                    {post.body.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-base text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BlogBubble;
