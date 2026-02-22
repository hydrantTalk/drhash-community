'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Decorative K-line SVG
function KLineSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grid lines */}
      {[0, 50, 100, 150, 200].map((y) => (
        <line key={`h-${y}`} x1="0" y1={y} x2="400" y2={y} stroke="rgba(139,92,246,0.05)" strokeWidth="0.5" />
      ))}
      {[0, 80, 160, 240, 320, 400].map((x) => (
        <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="200" stroke="rgba(139,92,246,0.05)" strokeWidth="0.5" />
      ))}
      {/* Trend line */}
      <path d="M0 160 L60 140 L120 150 L180 100 L240 80 L300 40 L360 55 L400 30" stroke="rgba(139,92,246,0.12)" strokeWidth="1.5" fill="none" />
      {/* Area fill */}
      <path d="M0 160 L60 140 L120 150 L180 100 L240 80 L300 40 L360 55 L400 30 L400 200 L0 200 Z" fill="url(#areaGrad)" />
      {/* Candlesticks */}
      {[
        { x: 60, o: 145, c: 135, h: 125, l: 155, bull: true },
        { x: 120, o: 140, c: 150, h: 130, l: 160, bull: false },
        { x: 180, o: 120, c: 100, h: 90, l: 130, bull: true },
        { x: 240, o: 95, c: 80, h: 70, l: 105, bull: true },
        { x: 300, o: 55, c: 40, h: 30, l: 65, bull: true },
        { x: 360, o: 45, c: 55, h: 35, l: 65, bull: false },
      ].map((c, i) => (
        <g key={i}>
          <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={c.bull ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'} strokeWidth="1" />
          <rect x={c.x - 6} y={Math.min(c.o, c.c)} width="12" height={Math.abs(c.c - c.o) || 2}
            fill={c.bull ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}
            stroke={c.bull ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'} strokeWidth="0.5" />
        </g>
      ))}
      <defs>
        <linearGradient id="areaGrad" x1="200" y1="30" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(139,92,246,0.06)" />
          <stop offset="1" stopColor="rgba(139,92,246,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Stats() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

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
    <section ref={sectionRef} className="py-20 md:py-0 relative grid-bg">
      {/* K-line decoration - desktop */}
      <KLineSVG className="hidden md:block absolute bottom-0 left-0 w-full h-auto pointer-events-none opacity-60" />

      {/* Section title - mobile */}
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
          <div className="flex-shrink-0 flex flex-col justify-center pr-8 border-r border-white/5">
            <h2 className="text-3xl lg:text-4xl font-bold text-white/90 mb-2">{m.stats?.title}</h2>
            <div className="w-10 h-0.5 bg-purple-500/40" />
          </div>
          {items.map((item, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center group">
              <span className="text-[clamp(2.5rem,5vw,5rem)] font-black text-grad leading-none tracking-tight group-hover:scale-105 transition-transform duration-300">
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
