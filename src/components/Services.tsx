'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title
    const title = section.querySelector('.svc-title');
    if (title) {
      gsap.fromTo(title, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
      });
    }

    // Cards stagger
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 sm:px-8">
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
              className="svc-card glow-card p-6 md:p-8 group cursor-default opacity-0"
            >
              {/* Icon */}
              <div className="text-3xl md:text-4xl mb-4 text-purple-400/60 group-hover:text-purple-400 transition-colors duration-300">
                {svc.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-grad transition-all duration-300">
                {svc.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/35 leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
