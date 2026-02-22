'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* ====== Full Poker Background - Scattered Cards, Chips, Felt Table ====== */
function PokerBackground() {
  const w = 1400;
  const h = 700;

  // Scattered poker cards with ranks and suits
  const cards = [
    { x: 80, y: 60, rot: -15, rank: 'A', suit: '♠', suitColor: 'rgba(255,255,255,0.08)' },
    { x: 250, y: 520, rot: 25, rank: 'K', suit: '♥', suitColor: 'rgba(239,68,68,0.08)' },
    { x: 450, y: 80, rot: -8, rank: 'Q', suit: '♦', suitColor: 'rgba(239,68,68,0.07)' },
    { x: 650, y: 550, rot: 18, rank: 'J', suit: '♣', suitColor: 'rgba(255,255,255,0.06)' },
    { x: 900, y: 100, rot: -22, rank: '10', suit: '♠', suitColor: 'rgba(255,255,255,0.07)' },
    { x: 1100, y: 480, rot: 12, rank: '9', suit: '♥', suitColor: 'rgba(239,68,68,0.06)' },
    { x: 1250, y: 150, rot: -5, rank: 'A', suit: '♥', suitColor: 'rgba(239,68,68,0.07)' },
    { x: 150, y: 320, rot: 30, rank: '8', suit: '♦', suitColor: 'rgba(239,68,68,0.05)' },
    { x: 1050, y: 280, rot: -12, rank: 'K', suit: '♠', suitColor: 'rgba(255,255,255,0.06)' },
    { x: 550, y: 350, rot: 8, rank: 'A', suit: '♣', suitColor: 'rgba(255,255,255,0.05)' },
    { x: 780, y: 200, rot: -20, rank: 'Q', suit: '♠', suitColor: 'rgba(255,255,255,0.05)' },
    { x: 350, y: 420, rot: 35, rank: '7', suit: '♥', suitColor: 'rgba(239,68,68,0.04)' },
  ];

  const cw = 60;
  const ch = 85;

  // Poker chips scattered
  const chips = [
    { cx: 180, cy: 180, r: 28, color: 'rgba(142,124,195,', delay: 0 },
    { cx: 500, cy: 600, r: 22, color: 'rgba(247,181,0,', delay: -2 },
    { cx: 800, cy: 80, r: 32, color: 'rgba(236,72,153,', delay: -1 },
    { cx: 1200, cy: 400, r: 25, color: 'rgba(34,197,94,', delay: -3 },
    { cx: 380, cy: 180, r: 18, color: 'rgba(247,181,0,', delay: -4 },
    { cx: 1000, cy: 550, r: 30, color: 'rgba(142,124,195,', delay: -1.5 },
    { cx: 650, cy: 450, r: 20, color: 'rgba(236,72,153,', delay: -2.5 },
    { cx: 100, cy: 500, r: 24, color: 'rgba(34,197,94,', delay: -3.5 },
    { cx: 1300, cy: 200, r: 26, color: 'rgba(247,181,0,', delay: -0.5 },
  ];

  // Card back pattern (diamond lattice)
  const backCards = [
    { x: 1300, y: 80, rot: 10 },
    { x: 50, y: 450, rot: -25 },
    { x: 700, y: 50, rot: 5 },
    { x: 1150, y: 580, rot: -8 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* Poker table felt - elliptical glow */}
        <ellipse cx={w / 2} cy={h / 2} rx="550" ry="280"
          fill="url(#feltGrad)" />
        <ellipse cx={w / 2} cy={h / 2} rx="550" ry="280"
          fill="none" stroke="rgba(142,124,195,0.04)" strokeWidth="2" />
        <ellipse cx={w / 2} cy={h / 2} rx="520" ry="260"
          fill="none" stroke="rgba(142,124,195,0.02)" strokeWidth="1" />

        {/* Face-up poker cards */}
        {cards.map((card, i) => (
          <g key={`card-${i}`} transform={`rotate(${card.rot} ${card.x + cw / 2} ${card.y + ch / 2})`}>
            {/* Card body */}
            <rect x={card.x} y={card.y} width={cw} height={ch} rx="4"
              fill="rgba(12,12,18,0.5)"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.8" />

            {/* Inner border */}
            <rect x={card.x + 3} y={card.y + 3} width={cw - 6} height={ch - 6} rx="2"
              fill="none"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="0.3" />

            {/* Top-left rank */}
            <text x={card.x + 8} y={card.y + 18} fontSize="12" fontWeight="bold"
              fill={card.suitColor} fontFamily="Georgia, serif">{card.rank}</text>
            {/* Top-left suit */}
            <text x={card.x + 8} y={card.y + 30} fontSize="10"
              fill={card.suitColor} fontFamily="serif">{card.suit}</text>

            {/* Center suit (large) */}
            <text x={card.x + cw / 2} y={card.y + ch / 2 + 8} textAnchor="middle" fontSize="26"
              fill={card.suitColor} fontFamily="serif">{card.suit}</text>

            {/* Bottom-right rank (inverted) */}
            <text x={card.x + cw - 8} y={card.y + ch - 10} fontSize="12" fontWeight="bold"
              fill={card.suitColor} fontFamily="Georgia, serif" textAnchor="end"
              transform={`rotate(180 ${card.x + cw - 8} ${card.y + ch - 16})`}>{card.rank}</text>
            <text x={card.x + cw - 8} y={card.y + ch - 22} fontSize="10"
              fill={card.suitColor} fontFamily="serif" textAnchor="end"
              transform={`rotate(180 ${card.x + cw - 8} ${card.y + ch - 28})`}>{card.suit}</text>
          </g>
        ))}

        {/* Face-down cards (card backs) */}
        {backCards.map((card, i) => (
          <g key={`back-${i}`} transform={`rotate(${card.rot} ${card.x + cw / 2} ${card.y + ch / 2})`}>
            <rect x={card.x} y={card.y} width={cw} height={ch} rx="4"
              fill="rgba(142,124,195,0.03)"
              stroke="rgba(142,124,195,0.08)"
              strokeWidth="0.8" />
            {/* Diamond lattice pattern */}
            <clipPath id={`clip-back-${i}`}>
              <rect x={card.x + 4} y={card.y + 4} width={cw - 8} height={ch - 8} rx="2" />
            </clipPath>
            <g clipPath={`url(#clip-back-${i})`}>
              {Array.from({ length: 8 }).map((_, row) =>
                Array.from({ length: 5 }).map((_, col) => {
                  const dx = card.x + 4 + col * 14;
                  const dy = card.y + 4 + row * 12 + (col % 2 === 1 ? 6 : 0);
                  return (
                    <path key={`d-${row}-${col}`}
                      d={`M${dx + 7} ${dy} L${dx + 11} ${dy + 5} L${dx + 7} ${dy + 10} L${dx + 3} ${dy + 5} Z`}
                      fill="none"
                      stroke="rgba(142,124,195,0.06)"
                      strokeWidth="0.4" />
                  );
                })
              )}
            </g>
          </g>
        ))}

        {/* Poker chips */}
        {chips.map((chip, i) => (
          <g key={`chip-${i}`}>
            {/* Outer ring */}
            <circle cx={chip.cx} cy={chip.cy} r={chip.r}
              fill={`${chip.color}0.03)`}
              stroke={`${chip.color}0.1)`}
              strokeWidth="1.5" />
            {/* Inner ring */}
            <circle cx={chip.cx} cy={chip.cy} r={chip.r * 0.7}
              fill="none"
              stroke={`${chip.color}0.06)`}
              strokeWidth="0.8" />
            {/* Edge notches */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <line key={deg}
                x1={chip.cx + (chip.r * 0.85) * Math.cos(deg * Math.PI / 180)}
                y1={chip.cy + (chip.r * 0.85) * Math.sin(deg * Math.PI / 180)}
                x2={chip.cx + chip.r * Math.cos(deg * Math.PI / 180)}
                y2={chip.cy + chip.r * Math.sin(deg * Math.PI / 180)}
                stroke={`${chip.color}0.12)`}
                strokeWidth="1.5" />
            ))}
            {/* Center suit */}
            <text x={chip.cx} y={chip.cy + chip.r * 0.15} textAnchor="middle"
              fontSize={chip.r * 0.5} fill={`${chip.color}0.12)`} fontFamily="serif">
              {i % 4 === 0 ? '♠' : i % 4 === 1 ? '♥' : i % 4 === 2 ? '♦' : '♣'}
            </text>
          </g>
        ))}

        {/* Royal Flush hand (5 cards fanned) */}
        {(() => {
          const handX = w / 2 - 80;
          const handY = h / 2 - 30;
          const handCards = [
            { rank: '10', suit: '♠', rot: -12 },
            { rank: 'J', suit: '♠', rot: -6 },
            { rank: 'Q', suit: '♠', rot: 0 },
            { rank: 'K', suit: '♠', rot: 6 },
            { rank: 'A', suit: '♠', rot: 12 },
          ];
          const smallCW = 42;
          const smallCH = 60;
          return handCards.map((hc, i) => {
            const offsetX = handX + i * 28;
            return (
              <g key={`royal-${i}`} transform={`rotate(${hc.rot} ${offsetX + smallCW / 2} ${handY + smallCH})`}>
                <rect x={offsetX} y={handY} width={smallCW} height={smallCH} rx="3"
                  fill="rgba(12,12,18,0.4)"
                  stroke="rgba(142,124,195,0.06)"
                  strokeWidth="0.6" />
                <text x={offsetX + 6} y={handY + 14} fontSize="9" fontWeight="bold" fill="rgba(142,124,195,0.1)" fontFamily="Georgia,serif">{hc.rank}</text>
                <text x={offsetX + smallCW / 2} y={handY + smallCH / 2 + 6} textAnchor="middle" fontSize="16" fill="rgba(142,124,195,0.06)" fontFamily="serif">{hc.suit}</text>
              </g>
            );
          });
        })()}

        {/* Suit symbols scattered as ambient particles */}
        {[
          { x: 300, y: 140, s: '♠', size: 18, opacity: 0.04 },
          { x: 950, y: 400, s: '♥', size: 22, opacity: 0.05 },
          { x: 600, y: 250, s: '♦', size: 16, opacity: 0.03 },
          { x: 1150, y: 120, s: '♣', size: 20, opacity: 0.04 },
          { x: 420, y: 480, s: '♠', size: 14, opacity: 0.03 },
          { x: 850, y: 320, s: '♥', size: 12, opacity: 0.03 },
          { x: 200, y: 600, s: '♦', size: 24, opacity: 0.04 },
          { x: 1100, y: 600, s: '♣', size: 16, opacity: 0.03 },
        ].map((p, i) => (
          <text key={`suit-${i}`} x={p.x} y={p.y} fontSize={p.size} fill={`rgba(255,255,255,${p.opacity})`} fontFamily="serif">{p.s}</text>
        ))}

        <defs>
          <radialGradient id="feltGrad" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="rgba(34,100,60,0.03)" />
            <stop offset="0.7" stopColor="rgba(34,100,60,0.01)" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      {/* Edge darkening */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/50 via-transparent to-[#050508]/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/40 via-transparent to-[#050508]/40" />

      {/* Purple glow for poker ambiance */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-600/[0.02] blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-pink-500/[0.015] blur-[120px]" />
    </div>
  );
}

/* Royal Flush SVG decoration (10 J Q K A of spades) */
function RoyalFlush({ className }: { className?: string }) {
  const rfCards = ['10', 'J', 'Q', 'K', 'A'];
  return (
    <svg className={className} viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {rfCards.map((label, i) => {
        const x = i * 60 + 10;
        return (
          <g key={i}>
            <rect x={x} y="10" width="50" height="75" rx="4"
              fill="rgba(142,124,195,0.03)"
              stroke="rgba(142,124,195,0.12)"
              strokeWidth="0.8" />
            <text x={x + 6} y="26" fontSize="10" fontWeight="bold" fill="rgba(142,124,195,0.25)" fontFamily="Georgia,serif">{label}</text>
            <text x={x + 6} y="37" fontSize="8" fill="rgba(255,255,255,0.12)" fontFamily="Georgia,serif">♠</text>
            <text x={x + 25} y="58" textAnchor="middle" fontSize="20" fill="rgba(255,255,255,0.06)" fontFamily="Georgia,serif">♠</text>
          </g>
        );
      })}
    </svg>
  );
}

/* Chip icon for timeline */
function TimelineChip({ color, label }: { color: string; label: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center relative z-[1] text-xs font-bold"
      style={{
        background: `${color}15`,
        border: `2px solid ${color}40`,
        boxShadow: `0 0 20px ${color}10`,
        color: `${color}`,
      }}
    >
      {label}
    </div>
  );
}

const achievements = [
  { year: '2018', color: '#22C55E', label: '♠' },
  { year: '2021', color: '#F7931A', label: '₿' },
  { year: '2024', color: '#8E7CC3', label: '◎' },
];

export default function Founder() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const hasTyped = useRef(false);

  const fullText = m.founder?.desc || '';
  const tags: string[] = m.founder?.tags || [];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Big W fade in
      const bigW = section.querySelector('.big-w');
      if (bigW) {
        gsap.fromTo(bigW, { x: -80, opacity: 0 }, {
          x: 0, opacity: 0.03, duration: 1,
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 30%', scrub: 1 },
        });
      }

      // Royal flush fade in
      const royalFlush = section.querySelector('.royal-flush');
      if (royalFlush) {
        gsap.fromTo(royalFlush, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 30%', scrub: 1 },
        });
      }

      // Name + role slide in
      const nameEl = section.querySelector('.founder-name');
      const roleEl = section.querySelector('.founder-role');
      if (nameEl) {
        gsap.fromTo(nameEl, { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 0.7,
          scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
      if (roleEl) {
        gsap.fromTo(roleEl, { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 0.7, delay: 0.15,
          scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }

      // Tags fly in
      const tagEls = section.querySelectorAll('.tag');
      tagEls.forEach((tag, i) => {
        gsap.fromTo(tag, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5, delay: 0.4 + i * 0.1,
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        });
      });

      // Timeline dots
      const dots = section.querySelectorAll('.timeline-dot');
      dots.forEach((dot, i) => {
        gsap.fromTo(dot, { scale: 0, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.4, delay: 0.6 + i * 0.15,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
        });
      });

      // Typewriter
      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        onEnter: () => {
          if (hasTyped.current) return;
          hasTyped.current = true;
          setShowCursor(true);
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setTyped(fullText.slice(0, i));
            if (i >= fullText.length) clearInterval(interval);
          }, 35);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [fullText]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 sm:px-8 overflow-hidden">
      {/* === Full Poker Background === */}
      <PokerBackground />

      {/* Decorative W */}
      <div className="big-w absolute left-[-3vw] top-1/2 -translate-y-1/2 text-[clamp(12rem,30vw,28rem)] font-black text-white opacity-0 leading-none select-none pointer-events-none z-[1]">
        W
      </div>

      {/* Decorative gradient line */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent pointer-events-none z-[1]" />

      {/* Royal Flush decoration - top right */}
      <div className="royal-flush absolute top-[10%] right-[2%] hidden lg:block pointer-events-none opacity-0 z-[1]">
        <RoyalFlush className="w-[280px] h-auto" />
      </div>

      {/* Floating chips decoration */}
      <div className="absolute bottom-[15%] right-[8%] text-4xl text-[#F7B500]/[0.04] font-bold select-none pointer-events-none animate-float z-[1]" style={{ animationDelay: '-1s' }}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="22" stroke="rgba(247,181,0,0.1)" strokeWidth="1.5" fill="rgba(247,181,0,0.02)" />
          <circle cx="25" cy="25" r="15" stroke="rgba(247,181,0,0.06)" strokeWidth="0.8" fill="none" />
          <text x="25" y="29" textAnchor="middle" fontSize="12" fill="rgba(247,181,0,0.12)" fontFamily="Georgia,serif">$</text>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* ===== Gold Gilded Frame ===== */}
        <div className="gold-frame gold-glow-pulse p-8 md:p-12 lg:p-14">
          {/* Gold corner ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 pointer-events-none z-[2]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FFD700] to-transparent" />
            <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[#FFD700] to-transparent" />
            <div className="absolute top-[3px] left-[3px] w-2 h-2 rounded-full bg-[#FFD700]/30" />
          </div>
          <div className="absolute top-3 right-3 w-8 h-8 pointer-events-none z-[2]">
            <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#FFD700] to-transparent" />
            <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#FFD700] to-transparent" />
            <div className="absolute top-[3px] right-[3px] w-2 h-2 rounded-full bg-[#FFD700]/30" />
          </div>
          <div className="absolute bottom-3 left-3 w-8 h-8 pointer-events-none z-[2]">
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FFD700] to-transparent" />
            <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#FFD700] to-transparent" />
            <div className="absolute bottom-[3px] left-[3px] w-2 h-2 rounded-full bg-[#FFD700]/30" />
          </div>
          <div className="absolute bottom-3 right-3 w-8 h-8 pointer-events-none z-[2]">
            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#FFD700] to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-[#FFD700] to-transparent" />
            <div className="absolute bottom-[3px] right-[3px] w-2 h-2 rounded-full bg-[#FFD700]/30" />
          </div>

          {/* Gold inner border line */}
          <div className="absolute inset-[6px] rounded-[1rem] border border-[#DAA520]/10 pointer-events-none z-[2]" />

          {/* Top gold decorative line */}
          <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent z-[2]" />
          <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent z-[2]" />

          {/* Name with gold shimmer */}
          <h2 className="founder-name text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tighter mb-2 gold-shimmer-text">
            {m.founder?.name || 'Wesley'}
          </h2>

          {/* Role badge with gold accent */}
          <div className="founder-role inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#DAA520]/30 bg-[#DAA520]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]/50 animate-pulse" />
            <span className="text-xs tracking-widest uppercase text-[#DAA520]/80">{m.founder?.role}</span>
          </div>

          {/* Typewriter description */}
          <p className={`text-sm md:text-base text-white/40 max-w-xl leading-relaxed mb-8 min-h-[3rem] ${showCursor ? 'typewriter-cursor' : ''}`}>
            {typed}
          </p>

          {/* Tags with gold borders */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="tag px-4 py-2 rounded-full border border-[#DAA520]/15 text-xs md:text-sm text-[#DAA520]/60 bg-[#DAA520]/[0.03] backdrop-blur-sm opacity-0 hover:border-[#FFD700]/30 hover:text-[#FFD700]/80 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Achievement timeline with chip icons */}
          <div className="flex items-center gap-0 mb-10 max-w-sm">
            {achievements.map((a, i) => (
              <div key={i} className="timeline-dot flex flex-col items-center flex-1 relative opacity-0">
                {i < achievements.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full h-[1px] bg-gradient-to-r from-[#DAA520]/20 to-[#DAA520]/5 pointer-events-none" />
                )}
                <TimelineChip color={a.color} label={a.label} />
                <span className="text-[10px] text-white/25 tracking-wider font-mono mt-1.5">{a.year}</span>
              </div>
            ))}
          </div>

          {/* Social - Wesley Twitter */}
          <a
            href="https://x.com/CryptoApprenti1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#DAA520]/40 hover:text-[#FFD700]/70 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            {m.founder?.social}
          </a>
        </div>
      </div>
    </section>
  );
}
