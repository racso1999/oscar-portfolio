import { useEffect, useState, useRef, useCallback } from 'react';
import { Timeline } from './components/sections/Timeline';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { ProjectDetail } from './components/pages/ProjectDetail';
import { BlogBubble } from './components/sections/BlogBubble';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  // Handle initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath.startsWith('/projects/')) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [currentPath]);

  const navigateTo = useCallback((path: string) => {
    if (path !== window.location.pathname) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  }, []);

  // Smooth scroll handler for anchor links
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const scrollToTarget = () => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      };

      if (currentPath !== '/') {
        navigateTo('/');
        window.setTimeout(scrollToTarget, 80);
      } else {
        scrollToTarget();
      }
    }
  }, [currentPath, navigateTo]);

  const isProjectPage = currentPath.startsWith('/projects/');
  const projectSlug = isProjectPage
    ? currentPath.replace('/projects/', '').split('/')[0]
    : '';

  return (
    <div className="relative min-h-screen bg-background grain">
      {/* Loading Screen */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700"
        style={{
          opacity: isLoaded ? 0 : 1,
          pointerEvents: isLoaded ? 'none' : 'auto',
        }}
      >
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-full" />
            <div
              className="absolute inset-0 border-2 border-primary rounded-full border-t-transparent animate-spin"
              style={{ animationDuration: '1s' }}
            />
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading...
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(-100%)',
          background: '#000000',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-lg font-bold text-foreground hover:text-primary transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
              onClick={(e) => {
                e.preventDefault();
                if (currentPath !== '/') {
                  navigateTo('/');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span style={{ color: '#cccccc' }}>~</span>
              <span style={{ color: 'var(--term-comment)' }}>/</span>oscar-jones
            </a>

            <div
              className="hidden md:flex items-center gap-6 text-sm"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {[
                { href: '#work', label: 'work' },
                { href: '#blog', label: 'blog' },
                { href: '#about', label: 'about' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleAnchorClick}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span style={{ color: 'var(--term-pink)' }}>#</span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main ref={mainRef} className="relative z-20">
        {isProjectPage ? (
          <ProjectDetail
            slug={projectSlug}
            onNavigate={(path) => {
              navigateTo(path);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            <section id="about">
              <About />
            </section>

            <section id="blog" className="scroll-mt-20">
              <BlogBubble onNavigate={navigateTo} />
            </section>

            <section id="work">
              <Timeline
                onOpenProject={(slug) => {
                  navigateTo(`/projects/${slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </section>

            <section id="contact">
              <Contact />
            </section>
          </>
        )}
      </main>

    </div>
  );
}

export default App;
