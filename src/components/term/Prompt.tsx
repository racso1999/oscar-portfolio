import { type ReactNode } from 'react';

interface PromptProps {
  /** The working-directory portion, e.g. "~/about". Rendered in terminal green. */
  path?: ReactNode;
  /** Override the path colour (defaults to terminal green). */
  pathColor?: string;
  /** The command itself, e.g. "whoami". Rendered in the foreground. */
  command: string;
  /** Optional trailing argument / flag, rendered in comment grey. */
  arg?: string;
  /** Show a blinking caret after the command (use once, on the lead prompt). */
  caret?: boolean;
  className?: string;
}

/**
 * A section eyebrow rendered as a shell prompt — the site's "machine voice".
 * Pairs the serif prose with a monospace utility face and the terminal palette.
 */
export function Prompt({
  path = '~',
  pathColor = 'var(--term-green)',
  command,
  arg,
  caret = false,
  className = '',
}: PromptProps) {
  return (
    <p
      className={`font-mono text-xs md:text-sm tracking-tight ${className}`}
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span style={{ color: pathColor }}>{path}</span>
      <span style={{ color: 'var(--term-comment)' }}> $ </span>
      <span className={`text-foreground ${caret ? 'term-caret' : ''}`}>
        {command}
        {arg ? <span style={{ color: 'var(--term-comment)' }}> {arg}</span> : null}
      </span>
    </p>
  );
}

export default Prompt;
