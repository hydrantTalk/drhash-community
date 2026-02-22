'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const bgColors = [
  'rgba(139, 92, 246, 0.04)',
  'rgba(236, 72, 153, 0.04)',
  'rgba(59, 130, 246, 0.04)',
  'rgba(139, 92, 246, 0.04)',
];

export default function Services() {
  const { m } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    panelsRef.current.forEach((panel, i) => {
      if (!panel) return;
      const icon = panel.querySelector('.svc-icon');
      const text = panel.querySelector('.svc-text');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      tl.fromTo(icon, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 });
      tl.fromTo(text, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.5');

      // Background color shift
      gsap.to(panel, {
        backgroundColor: bgColors[i],
        scrollTrigger: {
          trigger: panel,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const services: { icon: string; title: string }[] = m.services || [];

  return (
    <div ref={containerRef}>
      {services.map((svc, i) => (
        <section
          key={i}
          ref={(el: HTMLElement | null) => { panelsRef.current[i] = el; }}
          className="h-screen flex flex-col items-center justify-center relative"
        >
          <div className="svc-icon text-[clamp(5rem,18vw,12rem)] leading-none mb-4 text-white/80">
            {svc.icon}
          </div>
          <div className="svc-text text-[clamp(2rem,5vw,4rem)] font-black tracking-tight text-white">
            {svc.title}
          </div>
        </section>
      ))}
    </div>
  );
}
