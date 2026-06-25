import { blogPosts } from '../../data/blog';
import { Prompt } from '../term/Prompt';

interface BlogProps {
  onNavigate: (path: string) => void;
}

export function Blog({ onNavigate }: BlogProps) {
  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <Prompt path="~/blog" command="ls" caret className="mb-3" />
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-14">
          Writing
        </h1>

        {blogPosts.length === 0 ? (
          <p className="text-muted-foreground">Coming soon.</p>
        ) : (
          <div className="space-y-16">
            {blogPosts.map((post) => (
              <article key={post.slug}>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {post.title}
                </h2>
                <p
                  className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span style={{ color: 'var(--term-green)' }}>●</span>
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <div className="space-y-4">
                  {post.body.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-foreground/90 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        <button
          type="button"
          className="mt-12 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
          onClick={() => onNavigate('/')}
        >
          Back to home
        </button>
      </div>
    </section>
  );
}

export default Blog;
