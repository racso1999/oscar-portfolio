
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

        <p className="text-muted-foreground">Coming soon.</p>

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
