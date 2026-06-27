import { useRef, useEffect, useState } from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import profileImage from '../../assets/new_profile.jpg';
import { Prompt } from '../term/Prompt';

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Image/Visual Side */}
          <div
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateX(${isVisible ? 0 : -50}px)`,
              transition: 'all 0.8s ease',
            }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background shapes */}
              <div
                className="absolute -inset-4 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  transform: 'rotate(-3deg)',
                }}
              />

              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden border border-border">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div
                    className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: '#ffffff' }} />
                    <span>location: UK</span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    <Briefcase className="w-4 h-4" style={{ color: '#ffffff' }} />
                    <span>focus: Agentic Engineering</span>
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* Content Side */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            <Prompt path="~/about" command="whoami" caret className="mb-4" />

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Building systems
              <span
                className="block leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #888 0%, #888 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                driven by intention
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Fundamentally, I am a creative. I feel most comfortable in this strange existence when I
                am presented with a problem and tasked with finding an efficient solution. There is
                something deeply satisfying about producing something physical that has purpose and
                fittingly, it gives me a purpose.
              </p>
              <p>
                My academic journey, however, began a couple of fields over. I spent three years
                studying Biology at the University of Bristol, where I developed a deep fascination with
                the elegance of biological systems and the logic that underpins them. That curiosity
                naturally evolved into a passion for algorithms and computation.
              </p>
              <p>
                Eventually, I made the leap and, with 1000 programming hours and a bit of a struggle, I
                managed to squeeze myself into the tech world.
              </p>
              <p>
                I am now finishing my research thesis at the University of Exeter, which will see the
                completion of my MSc in Computer Science.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
