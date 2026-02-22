'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* ====== Gold Coins + Green Bullish K-line Background ====== */
function GoldKLineBackground() {
  const w = 1200;
  const h = 600;
  const padX = 30;
  const padY = 40;

  // Bullish trend candles (overall upward)
  const candles = [
    { o: 80, c: 95, h: 100, l: 75 },
    { o: 95, c: 90, h: 100, l: 85 },
    { o: 90, c: 108, h: 115, l: 88 },
    { o: 108, c: 115, h: 122, l: 105 },
    { o: 115, c: 110, h: 120, l: 105 },
    { o: 110, c: 128, h: 135, l: 108 },
    { o: 128, c: 140, h: 148, l: 125 },
    { o: 140, c: 135, h: 145, l: 130 },
    { o: 135, c: 155, h: 162, l: 132 },
    { o: 155, c: 165, h: 172, l: 150 },
    { o: 165, c: 158, h: 170, l: 152 },
    { o: 158, c: 178, h: 185, l: 155 },
    { o: 178, c: 190, h: 198, l: 175 },
    { o: 190, c: 185, h: 195, l: 180 },
    { o: 185, c: 205, h: 212, l: 182 },
    { o: 205, c: 218, h: 225, l: 200 },
    { o: 218, c: 210, h: 222, l: 205 },
    { o: 210, c: 235, h: 242, l: 208 },
    { o: 235, c: 245, h: 255, l: 230 },
    { o: 245, c: 240, h: 250, l: 235 },
    { o: 240, c: 260, h: 268, l: 238 },
    { o: 260, c: 275, h: 282, l: 255 },
    { o: 275, c: 270, h: 280, l: 265 },
    { o: 270, c: 290, h: 298, l: 268 },
    { o: 290, c: 305, h: 312, l: 285 },
    { o: 305, c: 300, h: 310, l: 295 },
    { o: 300, c: 320, h: 328, l: 298 },
    { o: 320, c: 335, h: 342, l: 315 },
  ];

  const candleW = (w - padX * 2) / candles.length;
  const minPrice = 60;
  const maxPrice = 360;
  const priceToY = (p: number) => padY + (1 - (p - minPrice) / (maxPrice - minPrice)) * (h - padY * 2);

  // Trend line (closing prices)
  const trendPoints = candles.map((c, i) => {
    const x = padX + i * candleW + candleW / 2;
    return `${x},${priceToY(c.c)}`;
  });

  // Gold coin positions (scattered)
  const coins = [
    { cx: 120, cy: 80, r: 35, delay: 0 },
    { cx: 950, cy: 120, r: 28, delay: -2 },
    { cx: 200, cy: 450, r: 22, delay: -4 },
    { cx: 1050, cy: 480, r: 30, delay: -1 },
    { cx: 600, cy: 60, r: 20, delay: -3 },
    { cx: 80, cy: 280, r: 18, delay: -5 },
    { cx: 1120, cy: 300, r: 25, delay: -2.5 },
    { cx: 400, cy: 520, r: 16, delay: -1.5 },
    { cx: 750, cy: 530, r: 24, delay: -3.5 },
    { cx: 300, cy: 100, r: 15, delay: -4.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Grid lines */}
        {[100, 150, 200, 250, 300, 350].map((price, i) => (
          <line key={`g-${i}`} x1={padX} y1={priceToY(price)} x2={w - padX} y2={priceToY(price)}
            stroke="rgba(34,197,94,0.03)" strokeWidth="0.5" strokeDasharray="6 12" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = padX + i * (w - padX * 2) / 7;
          return <line key={`gv-${i}`} x1={x} y1={padY} x2={x} y2={h - padY} stroke="rgba(34,197,94,0.025)" strokeWidth="0.5" strokeDasharray="6 12" />;
        })}

        {/* Candlesticks */}
        {candles.map((c, i) => {
          const x = padX + i * candleW + candleW / 2;
          const bull = c.c >= c.o;
          const bodyTop = priceToY(Math.max(c.o, c.c));
          const bodyBot = priceToY(Math.min(c.o, c.c));
          const bodyW = candleW * 0.5;
          const color = bull ? 'rgba(34,197,94,' : 'rgba(239,68,68,';
          return (
            <g key={`c-${i}`}>
              <line x1={x} y1={priceToY(c.h)} x2={x} y2={priceToY(c.l)} stroke={`${color}0.1)`} strokeWidth="0.8" />
              <rect x={x - bodyW / 2} y={bodyTop} width={bodyW} height={Math.max(bodyBot - bodyTop, 1)}
                fill={bull ? `${color}0.06)` : `${color}0.07)`}
                stroke={`${color}0.12)`} strokeWidth="0.4" />
            </g>
          );
        })}

        {/* Main trend line - green glow */}
        <polyline points={trendPoints.join(' ')} stroke="rgba(34,197,94,0.15)" strokeWidth="2" fill="none" strokeLinejoin="round" />

        {/* Area fill beneath trend */}
        <polygon
          points={`${trendPoints.join(' ')} ${padX + (candles.length - 1) * candleW + candleW / 2},${h - padY} ${padX + candleW / 2},${h - padY}`}
          fill="url(#bullFill)"
        />

        {/* Uptrend arrow overlay */}
        <line x1={padX + candleW} y1={priceToY(95)} x2={w - padX - candleW} y2={priceToY(335)}
          stroke="rgba(34,197,94,0.06)" strokeWidth="2" strokeDasharray="10 6" />
        <polygon
          points={`${w - padX - candleW},${priceToY(335) - 8} ${w - padX - candleW + 12},${priceToY(335)} ${w - padX - candleW},${priceToY(335) + 8}`}
          fill="rgba(34,197,94,0.08)"
        />

        {/* Gold coins */}
        {coins.map((coin, i) => (
          <g key={`coin-${i}`} className="animate-float" style={{ animationDelay: `${coin.delay}s` }}>
            {/* Outer ring */}
            <circle cx={coin.cx} cy={coin.cy} r={coin.r} fill="none" stroke="rgba(247,181,0,0.08)" strokeWidth="1.5" />
            {/* Inner fill */}
            <circle cx={coin.cx} cy={coin.cy} r={coin.r * 0.85} fill="rgba(247,181,0,0.03)" stroke="rgba(247,181,0,0.06)" strokeWidth="0.8" />
            {/* Inner detail ring */}
            <circle cx={coin.cx} cy={coin.cy} r={coin.r * 0.6} fill="none" stroke="rgba(247,181,0,0.04)" strokeWidth="0.5" />
            {/* Edge notches */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <line key={deg}
                x1={coin.cx + (coin.r * 0.88) * Math.cos(deg * Math.PI / 180)}
                y1={coin.cy + (coin.r * 0.88) * Math.sin(deg * Math.PI / 180)}
                x2={coin.cx + coin.r * Math.cos(deg * Math.PI / 180)}
                y2={coin.cy + coin.r * Math.sin(deg * Math.PI / 180)}
                stroke="rgba(247,181,0,0.1)" strokeWidth="1.5" />
            ))}
            {/* ₿ symbol */}
            <text x={coin.cx} y={coin.cy + coin.r * 0.15} textAnchor="middle" fontSize={coin.r * 0.6} fontWeight="bold" fill="rgba(247,181,0,0.1)" fontFamily="Georgia,serif">₿</text>
          </g>
        ))}

        {/* Additional $ coins */}
        {[
          { cx: 500, cy: 150, r: 20 },
          { cx: 850, cy: 400, r: 17 },
          { cx: 150, cy: 350, r: 14 },
        ].map((coin, i) => (
          <g key={`dollar-${i}`}>
            <circle cx={coin.cx} cy={coin.cy} r={coin.r} fill="rgba(34,197,94,0.02)" stroke="rgba(34,197,94,0.06)" strokeWidth="1" />
            <text x={coin.cx} y={coin.cy + coin.r * 0.2} textAnchor="middle" fontSize={coin.r * 0.7} fontWeight="bold" fill="rgba(34,197,94,0.08)" fontFamily="Georgia,serif">$</text>
          </g>
        ))}

        {/* Gradient defs */}
        <defs>
          <linearGradient id="bullFill" x1="600" y1="0" x2="600" y2={h} gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(34,197,94,0.05)" />
            <stop offset="1" stopColor="rgba(34,197,94,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Edge darkening */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-transparent to-[#050508]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/40 via-transparent to-[#050508]/40" />

      {/* Green glow orb */}
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-green-500/[0.02] blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] rounded-full bg-[#F7931A]/[0.02] blur-[100px]" />
    </div>
  );
}

/* Gold chip icon for VIP */
function GoldChip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="rgba(247,181,0,0.08)" stroke="rgba(247,181,0,0.3)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="rgba(247,181,0,0.2)" strokeWidth="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
        <line key={deg}
          x1={20 + 16 * Math.cos(deg * Math.PI / 180)}
          y1={20 + 16 * Math.sin(deg * Math.PI / 180)}
          x2={20 + 19 * Math.cos(deg * Math.PI / 180)}
          y2={20 + 19 * Math.sin(deg * Math.PI / 180)}
          stroke="rgba(247,181,0,0.4)" strokeWidth="2" />
      ))}
      <text x="20" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="rgba(247,181,0,0.5)" fontFamily="Georgia,serif">$</text>
    </svg>
  );
}

const cardSuits = ['♣', '♦', '♠'];
const suitColors = ['rgba(255,255,255,0.06)', 'rgba(239,68,68,0.08)', 'rgba(142,124,195,0.08)'];
const cornerNumbers = ['7', '10', 'A'];

export default function Membership() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector('.mem-title');
      if (title) {
        gsap.fromTo(title, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 120, rotateX: 15, opacity: 0, scale: 0.9 },
          {
            y: 0, rotateX: 0, opacity: 1, scale: 1,
            duration: 0.8, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 95%', toggleActions: 'play none none none' },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const tiers: { name: string; suit?: string; price: string; features: string[] }[] = m.membership?.tiers || [];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 sm:px-8 perspective-container relative overflow-hidden">
      {/* === Gold Coins + Bullish K-line Background === */}
      <GoldKLineBackground />

      {/* Floating poker decoration */}
      <div className="absolute top-12 left-[8%] text-6xl text-white/[0.02] font-bold select-none pointer-events-none animate-float z-[1]">♠</div>
      <div className="absolute bottom-12 right-[8%] text-5xl text-red-500/[0.03] font-bold select-none pointer-events-none animate-float z-[1]" style={{ animationDelay: '-2s' }}>♥</div>

      <div className="max-w-5xl mx-auto relative z-[2]">
        {/* Title */}
        <div className="mem-title text-center mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-3">{m.membership?.title}</h2>
          <div className="w-12 h-0.5 bg-purple-500/40 mx-auto" />
        </div>

        {/* Cards - Poker card style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {tiers.map((tier, i) => {
            const isVip = i === tiers.length - 1;
            const suit = tier.suit || cardSuits[i];
            return (
              <div
                key={i}
                ref={(el: HTMLElement | null) => { cardsRef.current[i] = el; }}
                className={`${isVip ? 'animated-border' : 'glow-card'} p-6 md:p-8 flex flex-col will-change-transform opacity-0 relative`}
                style={{ transformStyle: 'preserve-3d', borderRadius: '1rem' }}
              >
                {/* Top-left corner: number + suit (poker style) */}
                <div className="absolute top-3 left-4 flex flex-col items-center leading-none">
                  <span className="text-sm font-bold" style={{ color: suitColors[i] }}>{cornerNumbers[i]}</span>
                  <span className="text-xs" style={{ color: suitColors[i] }}>{suit}</span>
                </div>

                {/* Bottom-right corner: inverted number + suit */}
                <div className="absolute bottom-3 right-4 flex flex-col items-center leading-none rotate-180">
                  <span className="text-sm font-bold" style={{ color: suitColors[i] }}>{cornerNumbers[i]}</span>
                  <span className="text-xs" style={{ color: suitColors[i] }}>{suit}</span>
                </div>

                {/* Large center suit watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl md:text-9xl select-none pointer-events-none leading-none"
                  style={{ color: suitColors[i], opacity: 0.3 }}
                >
                  {suit}
                </div>

                {/* VIP badge + gold chips */}
                {isVip && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] tracking-widest uppercase text-purple-300 font-bold">
                      Popular
                    </div>
                    <GoldChip className="w-6 h-6" />
                    <GoldChip className="w-5 h-5 -ml-1 opacity-70" />
                  </div>
                )}

                {/* Name */}
                <h3 className={`text-lg font-bold mb-1 relative z-[1] ${isVip ? 'text-grad' : 'text-white/90'} ${!isVip ? 'mt-6' : ''}`}>
                  {tier.name}
                </h3>

                {/* Price */}
                <div className={`text-3xl md:text-4xl font-black mb-5 relative z-[1] ${isVip ? 'text-grad' : 'text-white'}`}>
                  {tier.price}
                </div>

                {/* Divider with suit */}
                <div className="flex items-center gap-2 mb-5 relative z-[1]">
                  <div className={`flex-1 h-px ${isVip ? 'bg-purple-500/25' : 'bg-white/8'}`} />
                  <span className={`text-xs ${isVip ? 'text-purple-400/40' : 'text-white/10'}`}>{suit}</span>
                  <div className={`flex-1 h-px ${isVip ? 'bg-purple-500/25' : 'bg-white/8'}`} />
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 relative z-[1]">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-white/40 leading-relaxed">
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isVip ? 'text-purple-400' : 'text-white/15'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
