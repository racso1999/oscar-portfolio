import { type ReactNode } from 'react';

interface RenderOptions {
  /** Tailwind classes applied to paragraph and list text. */
  textClassName?: string;
}

/**
 * Render a blog post body with light markdown support: ``` fenced code blocks,
 * ## subheadings, and "- " bullet lists. Everything else becomes a paragraph.
 * Shared by the /blog page and the home-page blog bubble so they stay in sync.
 */
export function renderPostBody(
  body: string,
  { textClassName = 'text-foreground/90' }: RenderOptions = {}
): ReactNode[] {
  // Odd-indexed segments are inside ``` fences.
  return body.split('```').flatMap((segment, i) => {
    if (i % 2 === 1) {
      const code = segment.replace(/^[a-zA-Z]*\n/, '').replace(/\n$/, '');
      return [
        <pre
          key={`code-${i}`}
          className="language-bash overflow-x-auto rounded-lg p-4 text-sm leading-relaxed"
        >
          <code>{code}</code>
        </pre>,
      ];
    }

    return segment
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block, j) => {
        const key = `${i}-${j}`;

        if (block.startsWith('## ')) {
          return (
            <h3
              key={key}
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
              key={key}
              className={`list-disc pl-5 space-y-1 leading-relaxed ${textClassName}`}
            >
              {lines.map((l, k) => (
                <li key={k}>{l.slice(2)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={key} className={`leading-relaxed ${textClassName}`}>
            {block}
          </p>
        );
      });
  });
}

export default renderPostBody;
