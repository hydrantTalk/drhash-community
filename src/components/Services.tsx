'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Decorative corner pattern for cards
const cornerColors = [
  'rgba(139, 92, 246, 0.15)', // purple
  'rgba(236, 72, 153, 0.15)', // pink
  'rgba(59, 130, 246, 0.15)', // blue
  'rgba(34, 197, 94, 0.15)',  // green
];

export default function Services() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector('.svc-title');
    if (title) {
      gsap.fromTo(title, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
      });
    }

    const cards = section.querySelectorAll('.svc-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 50, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' },
      });
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const items: { icon: string; title: string; desc: string }[] = m.services?.items || [];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 sm:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="svc-title text-center mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-3">{m.services?.title}</h2>
          <div className="w-12 h-0.5 bg-purple-500/40 mx-auto" />
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {items.map((svc, i) => (
            <div
              key={i}
              className="svc-card glow-card p-6 md:p-8 group cursor-default opacity-0 relative"
            >
              {/* Corner decoration line */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none overflow-hidden rounded-tl-[1rem]">
                <div
                  className="absolute top-0 left-0 w-full h-[1px]"
                  style={{ background: `linear-gradient(90deg, ${cornerColors[i]}, transparent)` }}
                />
                <div
                  className="absolute top-0 left-0 h-full w-[1px]"
                  style={{ background: `linear-gradient(180deg, ${cornerColors[i]}, transparent)` }}
                />
              </div>

              {/* Number indicator */}
              <div className="absolute top-4 right-5 text-[10px] font-mono text-white/10 tracking-wider">
                0{i + 1}
              </div>

              {/* Icon */}
              <div className="text-3xl md:text-4xl mb-4 text-purple-400/50 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300 origin-left">
                {svc.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-white/90 mb-2 group-hover:text-grad transition-all duration-300">
                {svc.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/35 leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                {svc.desc}
              </p>

              {/* Bottom gradient line on hover */}
              <div className="absolute bottom-0 left-[1rem] right-[1rem] h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
