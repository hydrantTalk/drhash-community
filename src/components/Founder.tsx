'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* Royal Flush SVG decoration (10 J Q K A of spades) */
function RoyalFlush({ className }: { className?: string }) {
  const cards = ['10', 'J', 'Q', 'K', 'A'];
  return (
    <svg className={className} viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {cards.map((label, i) => {
        const x = i * 60 + 10;
        return (
          <g key={i}>
            {/* Card */}
            <rect x={x} y="10" width="50" height="75" rx="4"
              fill="rgba(139,92,246,0.03)"
              stroke="rgba(139,92,246,0.12)"
              strokeWidth="0.8"
            />
            {/* Top-left label */}
            <text x={x + 6} y="26" fontSize="10" fontWeight="bold" fill="rgba(139,92,246,0.25)" fontFamily="Georgia,serif">
              {label}
            </text>
            {/* Top-left suit */}
            <text x={x + 6} y="37" fontSize="8" fill="rgba(255,255,255,0.12)" fontFamily="Georgia,serif">
              ♠
            </text>
            {/* Center suit */}
            <text x={x + 25} y="58" textAnchor="middle" fontSize="20" fill="rgba(255,255,255,0.06)" fontFamily="Georgia,serif">
              ♠
            </text>
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
  { year: '2024', color: '#8B5CF6', label: '◎' },
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

    // Big W fade in
    const bigW = section.querySelector('.big-w');
    if (bigW) {
      gsap.fromTo(bigW, { x: -80, opacity: 0 }, {
        x: 0, opacity: 0.03, duration: 1,
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 30%', scrub: 1 },
      });
    }

    // Royal flush fade in
    const royalFlush = section.querySelector('.royal-flush');
    if (royalFlush) {
      gsap.fromTo(royalFlush, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: section, start: 'top 60%', end: 'top 30%', scrub: 1 },
      });
    }

    // Name + role slide in
    const nameEl = section.querySelector('.founder-name');
    const roleEl = section.querySelector('.founder-role');
    if (nameEl) {
      gsap.fromTo(nameEl, { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7,
        scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
      });
    }
    if (roleEl) {
      gsap.fromTo(roleEl, { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7, delay: 0.15,
        scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
      });
    }

    // Tags fly in
    const tagEls = section.querySelectorAll('.tag');
    tagEls.forEach((tag, i) => {
      gsap.fromTo(tag, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, delay: 0.4 + i * 0.1,
        scrollTrigger: { trigger: section, start: 'top 55%', toggleActions: 'play none none none' },
      });
    });

    // Timeline dots
    const dots = section.querySelectorAll('.timeline-dot');
    dots.forEach((dot, i) => {
      gsap.fromTo(dot, { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.4, delay: 0.6 + i * 0.15,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: section, start: 'top 50%', toggleActions: 'play none none none' },
      });
    });

    // Typewriter
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
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

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [fullText]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Decorative W */}
      <div className="big-w absolute left-[-3vw] top-1/2 -translate-y-1/2 text-[clamp(12rem,30vw,28rem)] font-black text-white opacity-0 leading-none select-none pointer-events-none">
        W
      </div>

      {/* Decorative gradient line */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent pointer-events-none" />

      {/* Royal Flush decoration - top right */}
      <div className="royal-flush absolute top-[10%] right-[2%] hidden lg:block pointer-events-none opacity-0">
        <RoyalFlush className="w-[280px] h-auto" />
      </div>

      {/* Floating chips decoration */}
      <div className="absolute bottom-[15%] right-[8%] text-4xl text-[#F7B500]/[0.04] font-bold select-none pointer-events-none animate-float" style={{ animationDelay: '-1s' }}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="22" stroke="rgba(247,181,0,0.1)" strokeWidth="1.5" fill="rgba(247,181,0,0.02)" />
          <circle cx="25" cy="25" r="15" stroke="rgba(247,181,0,0.06)" strokeWidth="0.8" fill="none" />
          <text x="25" y="29" textAnchor="middle" fontSize="12" fill="rgba(247,181,0,0.12)" fontFamily="Georgia,serif">$</text>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Name */}
        <h2 className="founder-name text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tighter mb-2">
          {m.founder?.name || 'Wesley'}
        </h2>

        {/* Role badge */}
        <div className="founder-role inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
          <span className="text-xs tracking-widest uppercase text-purple-300/70">{m.founder?.role}</span>
        </div>

        {/* Typewriter description */}
        <p className={`text-sm md:text-base text-white/40 max-w-xl leading-relaxed mb-8 min-h-[3rem] ${showCursor ? 'typewriter-cursor' : ''}`}>
          {typed}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="tag px-4 py-2 rounded-full border border-white/8 text-xs md:text-sm text-white/50 bg-white/[0.02] backdrop-blur-sm opacity-0"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Achievement timeline with chip icons */}
        <div className="flex items-center gap-0 mb-10 max-w-sm">
          {achievements.map((a, i) => (
            <div key={i} className="timeline-dot flex flex-col items-center flex-1 relative opacity-0">
              {/* Connector line */}
              {i < achievements.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-[1px] bg-gradient-to-r from-purple-500/20 to-purple-500/5 pointer-events-none" />
              )}
              {/* Chip dot */}
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
          className="inline-flex items-center gap-2 text-sm text-white/25 hover:text-white/50 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          {m.founder?.social}
        </a>
      </div>
    </section>
  );
}
