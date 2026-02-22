'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* ====== Full-section K-line chart background SVG ====== */
function KLineBackground() {
  // Generate realistic candlestick data
  const candles = [
    { o: 120, c: 135, h: 142, l: 115, bull: true },
    { o: 135, c: 128, h: 140, l: 122, bull: false },
    { o: 128, c: 145, h: 152, l: 125, bull: true },
    { o: 145, c: 138, h: 150, l: 130, bull: false },
    { o: 138, c: 155, h: 162, l: 135, bull: true },
    { o: 155, c: 160, h: 168, l: 148, bull: true },
    { o: 160, c: 148, h: 165, l: 142, bull: false },
    { o: 148, c: 170, h: 178, l: 145, bull: true },
    { o: 170, c: 165, h: 175, l: 158, bull: false },
    { o: 165, c: 185, h: 192, l: 162, bull: true },
    { o: 185, c: 178, h: 190, l: 172, bull: false },
    { o: 178, c: 195, h: 202, l: 175, bull: true },
    { o: 195, c: 188, h: 200, l: 182, bull: false },
    { o: 188, c: 210, h: 218, l: 185, bull: true },
    { o: 210, c: 205, h: 215, l: 198, bull: false },
    { o: 205, c: 225, h: 232, l: 202, bull: true },
    { o: 225, c: 220, h: 230, l: 212, bull: false },
    { o: 220, c: 240, h: 248, l: 218, bull: true },
    { o: 240, c: 235, h: 245, l: 228, bull: false },
    { o: 235, c: 255, h: 262, l: 230, bull: true },
    { o: 255, c: 248, h: 260, l: 240, bull: false },
    { o: 248, c: 265, h: 272, l: 245, bull: true },
    { o: 265, c: 258, h: 270, l: 252, bull: false },
    { o: 258, c: 275, h: 282, l: 255, bull: true },
  ];

  const w = 1200;
  const h = 500;
  const padX = 40;
  const padY = 30;
  const candleW = (w - padX * 2) / candles.length;
  const minPrice = 100;
  const maxPrice = 300;
  const priceToY = (p: number) => padY + (1 - (p - minPrice) / (maxPrice - minPrice)) * (h - padY * 2);

  // Moving average (smooth trend line)
  const maPoints = candles.map((c, i) => {
    const x = padX + i * candleW + candleW / 2;
    const y = priceToY((c.o + c.c) / 2);
    return `${x},${y}`;
  });

  // Volume bars
  const volumes = candles.map((c) => Math.abs(c.c - c.o) * 3 + Math.random() * 20 + 10);
  const maxVol = Math.max(...volumes);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Grid lines - horizontal (price levels) */}
        {[100, 150, 200, 250, 300].map((price, i) => {
          const y = priceToY(price);
          return (
            <g key={`h-${i}`}>
              <line x1={padX} y1={y} x2={w - padX} y2={y} stroke="rgba(139,92,246,0.04)" strokeWidth="0.5" strokeDasharray="4 8" />
              <text x={padX - 5} y={y + 4} textAnchor="end" fontSize="8" fill="rgba(139,92,246,0.08)" fontFamily="monospace">{price}</text>
            </g>
          );
        })}

        {/* Grid lines - vertical (time) */}
        {[0, 4, 8, 12, 16, 20, 24].map((idx) => {
          const x = padX + idx * candleW + candleW / 2;
          return (
            <line key={`v-${idx}`} x1={x} y1={padY} x2={x} y2={h - padY} stroke="rgba(139,92,246,0.03)" strokeWidth="0.5" strokeDasharray="4 8" />
          );
        })}

        {/* Volume bars at bottom */}
        {candles.map((c, i) => {
          const x = padX + i * candleW + candleW * 0.2;
          const barW = candleW * 0.6;
          const barH = (volumes[i] / maxVol) * 60;
          const baseY = h - padY;
          return (
            <rect
              key={`vol-${i}`}
              x={x} y={baseY - barH} width={barW} height={barH}
              fill={c.bull ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)'}
            />
          );
        })}

        {/* Candlestick bodies + wicks */}
        {candles.map((c, i) => {
          const x = padX + i * candleW + candleW / 2;
          const bodyTop = priceToY(Math.max(c.o, c.c));
          const bodyBot = priceToY(Math.min(c.o, c.c));
          const wickTop = priceToY(c.h);
          const wickBot = priceToY(c.l);
          const bodyWidth = candleW * 0.55;
          const green = c.bull;
          const color = green ? 'rgba(34,197,94,' : 'rgba(239,68,68,';
          return (
            <g key={`candle-${i}`}>
              {/* Upper wick */}
              <line x1={x} y1={wickTop} x2={x} y2={bodyTop} stroke={`${color}0.12)`} strokeWidth="1" />
              {/* Lower wick */}
              <line x1={x} y1={bodyBot} x2={x} y2={wickBot} stroke={`${color}0.12)`} strokeWidth="1" />
              {/* Body */}
              <rect
                x={x - bodyWidth / 2} y={bodyTop} width={bodyWidth} height={Math.max(bodyBot - bodyTop, 1)}
                fill={green ? `${color}0.06)` : `${color}0.08)`}
                stroke={`${color}0.15)`}
                strokeWidth="0.5"
              />
            </g>
          );
        })}

        {/* Moving average line */}
        <polyline
          points={maPoints.join(' ')}
          stroke="rgba(139,92,246,0.12)"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />

        {/* MA area fill */}
        <polygon
          points={`${maPoints.join(' ')} ${padX + (candles.length - 1) * candleW + candleW / 2},${h - padY} ${padX + candleW / 2},${h - padY}`}
          fill="url(#klineFill)"
        />

        {/* Secondary MA (shorter period) */}
        {(() => {
          const shortMA = candles.map((c, i) => {
            const start = Math.max(0, i - 3);
            const end = i + 1;
            const slice = candles.slice(start, end);
            const avg = slice.reduce((s, cc) => s + (cc.o + cc.c) / 2, 0) / slice.length;
            const x = padX + i * candleW + candleW / 2;
            return `${x},${priceToY(avg)}`;
          });
          return (
            <polyline
              points={shortMA.join(' ')}
              stroke="rgba(236,72,153,0.08)"
              strokeWidth="1"
              fill="none"
              strokeLinejoin="round"
              strokeDasharray="3 3"
            />
          );
        })()}

        {/* Bollinger-like bands (decorative) */}
        {(() => {
          const upper = candles.map((c, i) => {
            const x = padX + i * candleW + candleW / 2;
            return `${x},${priceToY(Math.max(c.o, c.c) + 15)}`;
          });
          const lower = candles.map((c, i) => {
            const x = padX + i * candleW + candleW / 2;
            return `${x},${priceToY(Math.min(c.o, c.c) - 15)}`;
          });
          return (
            <>
              <polyline points={upper.join(' ')} stroke="rgba(139,92,246,0.04)" strokeWidth="0.5" fill="none" strokeDasharray="6 4" />
              <polyline points={lower.join(' ')} stroke="rgba(139,92,246,0.04)" strokeWidth="0.5" fill="none" strokeDasharray="6 4" />
            </>
          );
        })()}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="klineFill" x1="600" y1="0" x2="600" y2={h} gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(139,92,246,0.04)" />
            <stop offset="1" stopColor="rgba(139,92,246,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Overlay gradient to darken edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/50 via-transparent to-[#050508]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/30 via-transparent to-[#050508]/30" />
    </div>
  );
}

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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 sm:px-8 relative overflow-hidden">
      {/* === Full K-line chart background === */}
      <KLineBackground />

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
