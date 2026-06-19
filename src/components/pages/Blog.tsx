import { blogPosts } from '../../data/blog';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

interface BlogProps {
  onNavigate: (path: string) => void;
}

export function Blog({ onNavigate }: BlogProps) {
  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-sm uppercase tracking-widest text-primary mb-3">
          Blog
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-14">
          Writing
        </h1>

        <div className="space-y-16">
          {blogPosts.map((post) => (
            <article key={post.slug}>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                {dateFormatter.format(new Date(post.date))}
              </p>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-5">
                {post.title}
              </h2>
              <div className="space-y-4">
                {post.body.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 border-b border-border" />
            </article>
          ))}
        </div>

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
