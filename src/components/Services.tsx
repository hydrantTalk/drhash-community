'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* Mini K-line chart SVG decoration per card */
function MiniKLine({ className, bull }: { className?: string; bull: boolean }) {
  const g = bull ? 'rgba(34,197,94,' : 'rgba(239,68,68,';
  const heights = bull ? [30, 45, 25, 55, 40, 60, 50] : [55, 40, 50, 35, 45, 25, 30];
  return (
    <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {heights.map((h, i) => {
        const x = 8 + i * 13;
        const bodyH = h * 0.4;
        const isBull = bull ? h > 35 : h < 40;
        return (
          <g key={i}>
            <line x1={x} y1={60 - h} x2={x} y2={60 - (h * 0.15)} stroke={`${g}0.3)`} strokeWidth="0.8" />
            <rect
              x={x - 3} y={60 - h * 0.7} width="6" height={bodyH}
              fill={isBull ? 'transparent' : `${g}0.2)`}
              stroke={`${g}0.25)`} strokeWidth="0.5"
            />
          </g>
        );
      })}
      {/* Trend line */}
      <path
        d={`M8 ${60 - heights[0] * 0.5} ${heights.map((h, i) => `L${8 + i * 13} ${60 - h * 0.5}`).join(' ')}`}
        stroke={`${g}0.15)`}
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

const cornerColors = [
  { border: 'rgba(139, 92, 246, 0.2)', bg: 'rgba(139, 92, 246, 0.05)' },
  { border: 'rgba(34, 197, 94, 0.2)', bg: 'rgba(34, 197, 94, 0.05)' },
  { border: 'rgba(236, 72, 153, 0.2)', bg: 'rgba(236, 72, 153, 0.05)' },
  { border: 'rgba(247, 147, 26, 0.2)', bg: 'rgba(247, 147, 26, 0.05)' },
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
      {/* K-line watermark background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
        <MiniKLine className="absolute top-[10%] left-[5%] w-[200px] h-auto" bull={true} />
        <MiniKLine className="absolute bottom-[10%] right-[5%] w-[200px] h-auto" bull={false} />
      </div>

      <div className="max-w-6xl mx-auto relative z-[1]">
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
              {/* Corner decoration */}
              <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none overflow-hidden rounded-tl-[1rem]">
                <div
                  className="absolute top-0 left-0 w-full h-[1px]"
                  style={{ background: `linear-gradient(90deg, ${cornerColors[i].border}, transparent)` }}
                />
                <div
                  className="absolute top-0 left-0 h-full w-[1px]"
                  style={{ background: `linear-gradient(180deg, ${cornerColors[i].border}, transparent)` }}
                />
              </div>

              {/* Number indicator */}
              <div className="absolute top-4 right-5 text-[10px] font-mono text-white/10 tracking-wider">
                0{i + 1}
              </div>

              {/* Mini K-line decoration in bottom-right */}
              <div className="absolute bottom-2 right-2 opacity-40 pointer-events-none">
                <MiniKLine className="w-[80px] h-auto" bull={i % 2 === 0} />
              </div>

              {/* Icon with theme-specific background */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-all duration-300"
                style={{ background: cornerColors[i].bg, border: `1px solid ${cornerColors[i].border}` }}
              >
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
