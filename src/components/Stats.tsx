'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* Chip Stack SVG */
function ChipStack({ className, color = 'purple' }: { className?: string; color?: string }) {
  const c = color === 'purple' ? 'rgba(142,124,195,' : 'rgba(236,72,153,';
  return (
    <svg className={className} viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 15, 30, 45].map((y, i) => (
        <g key={i}>
          <ellipse cx="40" cy={80 - y} rx="28" ry="10" fill={`${c}${0.04 + i * 0.02})`} stroke={`${c}0.12)`} strokeWidth="0.8" />
          <rect x="12" y={70 - y} width="56" height="10" fill={`${c}${0.03 + i * 0.01})`} />
          {/* Notch lines */}
          <line x1="18" y1={75 - y} x2="18" y2={80 - y} stroke={`${c}0.08)`} strokeWidth="1" />
          <line x1="62" y1={75 - y} x2="62" y2={80 - y} stroke={`${c}0.08)`} strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

/* Candlestick separator */
function CandleSeparator({ bull }: { bull: boolean }) {
  const color = bull ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)';
  return (
    <div className="hidden md:flex flex-col items-center justify-center mx-2 opacity-60">
      <div className="w-[1px] h-4" style={{ background: color }} />
      <div
        className="w-2 h-5 border"
        style={{
          borderColor: color,
          background: bull ? 'transparent' : color,
          borderRadius: '1px',
        }}
      />
      <div className="w-[1px] h-4" style={{ background: color }} />
    </div>
  );
}

/* Decorative K-line SVG */
function KLineSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 50, 100, 150, 200].map((y) => (
        <line key={`h-${y}`} x1="0" y1={y} x2="400" y2={y} stroke="rgba(142,124,195,0.05)" strokeWidth="0.5" />
      ))}
      {[0, 80, 160, 240, 320, 400].map((x) => (
        <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="200" stroke="rgba(142,124,195,0.05)" strokeWidth="0.5" />
      ))}
      <path d="M0 160 L60 140 L120 150 L180 100 L240 80 L300 40 L360 55 L400 30" stroke="rgba(142,124,195,0.12)" strokeWidth="1.5" fill="none" />
      <path d="M0 160 L60 140 L120 150 L180 100 L240 80 L300 40 L360 55 L400 30 L400 200 L0 200 Z" fill="url(#areaGrad)" />
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
          <stop stopColor="rgba(142,124,195,0.06)" />
          <stop offset="1" stopColor="rgba(142,124,195,0)" />
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

    return () => { mm.revert(); };
  }, []);

  const items: { value: string; label: string }[] = m.stats?.items || [];
  const bullPattern = [true, false, true, true, false, true, false, true];

  return (
    <section ref={sectionRef} className="py-20 md:py-0 relative grid-bg">
      {/* K-line decoration - desktop */}
      <KLineSVG className="hidden md:block absolute bottom-0 left-0 w-full h-auto pointer-events-none opacity-60" />

      {/* Chip stacks - desktop */}
      <ChipStack className="hidden md:block absolute left-[3%] top-1/2 -translate-y-1/2 w-16 h-24 pointer-events-none opacity-50" color="purple" />
      <ChipStack className="hidden md:block absolute right-[3%] top-1/2 -translate-y-1/2 w-16 h-24 pointer-events-none opacity-50" color="pink" />

      {/* Section title - mobile */}
      <div className="text-center mb-10 md:mb-0 md:hidden px-6">
        <h2 className="text-2xl font-bold text-white/90 mb-2">{m.stats?.title}</h2>
        <div className="w-12 h-0.5 bg-purple-500/40 mx-auto" />
      </div>

      {/* Desktop: horizontal scroll with candle separators */}
      <div ref={wrapRef} className="hidden md:block relative h-[60vh] overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center h-full gap-6 lg:gap-8 px-[8vw] will-change-transform"
          style={{ width: 'max-content' }}
        >
          <div className="flex-shrink-0 flex flex-col justify-center pr-8 border-r border-white/5">
            <h2 className="text-3xl lg:text-4xl font-bold text-white/90 mb-2">{m.stats?.title}</h2>
            <div className="w-10 h-0.5 bg-purple-500/40" />
          </div>
          {items.map((item, i) => (
            <div key={i} className="flex-shrink-0 flex items-center">
              <div className="flex flex-col items-center justify-center group">
                <span className="text-[clamp(2.5rem,5vw,5rem)] font-black text-grad leading-none tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {item.value}
                </span>
                <span className="mt-2 text-xs lg:text-sm tracking-[0.15em] uppercase text-white/30 font-light">
                  {item.label}
                </span>
              </div>
              {i < items.length - 1 && <CandleSeparator bull={bullPattern[i]} />}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: 2-column grid */}
      <div className="grid grid-cols-2 gap-3 px-6 md:hidden">
        {items.map((item, i) => (
          <div key={i} className="stat-card glow-card p-4 text-center opacity-0 relative overflow-hidden">
            {/* Mini decorative suit */}
            <div className="absolute top-1 right-2 text-xs text-white/[0.05]">
              {['♠', '♥', '♦', '♣'][i % 4]}
            </div>
            <span className="text-2xl font-black text-grad leading-none">{item.value}</span>
            <span className="block mt-1.5 text-[10px] tracking-[0.15em] uppercase text-white/30">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
