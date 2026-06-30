import { blogPosts } from '../../data/blog';
import { Prompt } from '../term/Prompt';

interface BlogProps {
  onNavigate: (path: string) => void;
}

/**
 * Render a post body with light markdown support: ``` fenced code blocks,
 * ## subheadings, and "- " bullet lists. Everything else is a paragraph.
 */
function renderBody(body: string) {
  // Odd-indexed segments are inside ``` fences.
  return body.split('```').map((segment, i) => {
    if (i % 2 === 1) {
      const code = segment.replace(/^[a-zA-Z]*\n/, '').replace(/\n$/, '');
      return (
        <pre
          key={i}
          className="language-bash overflow-x-auto rounded-lg p-4 text-sm leading-relaxed"
        >
          <code>{code}</code>
        </pre>
      );
    }

    return segment
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block, j) => {
        if (block.startsWith('## ')) {
          return (
            <h3
              key={`${i}-${j}`}
              className="text-xl md:text-2xl font-bold text-foreground pt-2"
            >
              {block.slice(3)}
            </h3>
          );
        }

        const lines = block.split('\n');
        if (lines.every((l) => l.startsWith('- '))) {
          return (
            <ul
              key={`${i}-${j}`}
              className="list-disc pl-5 space-y-1 text-foreground/90 leading-relaxed"
            >
              {lines.map((l, k) => (
                <li key={k}>{l.slice(2)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${i}-${j}`} className="text-foreground/90 leading-relaxed">
            {block}
          </p>
        );
      });
  });
}

export function Blog({ onNavigate }: BlogProps) {
  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <Prompt
          path={
            <>
              <span style={{ color: '#cccccc' }}>~/</span>
              <span style={{ color: '#ffffff' }}>blog</span>
            </>
          }
          command="ls"
          caret
          className="mb-3"
        />
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
                <div className="space-y-4">{renderBody(post.body)}</div>
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
