'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    // Only do horizontal scroll on desktop (> 768px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const totalScroll = track.scrollWidth - wrap.clientWidth;
      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 15%',
          end: () => `+=${totalScroll * 0.8}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    // Mobile: just fade in the grid
    mm.add('(max-width: 768px)', () => {
      const section = sectionRef.current;
      if (!section) return;
      const cards = section.querySelectorAll('.stat-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.5,
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          delay: i * 0.05,
        });
      });
    });

    return () => { mm.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const items: { value: string; label: string }[] = m.stats?.items || [];

  return (
    <section ref={sectionRef} className="py-20 md:py-0">
      {/* Section title */}
      <div className="text-center mb-10 md:mb-0 md:hidden px-6">
        <h2 className="text-2xl font-bold text-white/90 mb-2">{m.stats?.title}</h2>
        <div className="w-12 h-0.5 bg-purple-500/40 mx-auto" />
      </div>

      {/* Desktop: horizontal scroll */}
      <div ref={wrapRef} className="hidden md:block relative h-[60vh] overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center h-full gap-12 lg:gap-16 px-[8vw] will-change-transform"
          style={{ width: 'max-content' }}
        >
          {/* Title as first item */}
          <div className="flex-shrink-0 flex flex-col justify-center pr-8 border-r border-white/5">
            <h2 className="text-3xl lg:text-4xl font-bold text-white/90 mb-2">{m.stats?.title}</h2>
            <div className="w-10 h-0.5 bg-purple-500/40" />
          </div>
          {items.map((item, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center">
              <span className="text-[clamp(2.5rem,5vw,5rem)] font-black text-grad leading-none tracking-tight">
                {item.value}
              </span>
              <span className="mt-2 text-xs lg:text-sm tracking-[0.15em] uppercase text-white/30 font-light">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: 2-column grid */}
      <div className="grid grid-cols-2 gap-3 px-6 md:hidden">
        {items.map((item, i) => (
          <div key={i} className="stat-card glow-card p-4 text-center opacity-0">
            <span className="text-2xl font-black text-grad leading-none">{item.value}</span>
            <span className="block mt-1.5 text-[10px] tracking-[0.15em] uppercase text-white/30">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
