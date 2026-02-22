'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* Gold chip icon for VIP */
function GoldChip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="rgba(247,181,0,0.08)" stroke="rgba(247,181,0,0.3)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="rgba(247,181,0,0.2)" strokeWidth="0.8" />
      {/* Edge notches */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
        <line
          key={deg}
          x1={20 + 16 * Math.cos(deg * Math.PI / 180)}
          y1={20 + 16 * Math.sin(deg * Math.PI / 180)}
          x2={20 + 19 * Math.cos(deg * Math.PI / 180)}
          y2={20 + 19 * Math.sin(deg * Math.PI / 180)}
          stroke="rgba(247,181,0,0.4)"
          strokeWidth="2"
        />
      ))}
      {/* Center $ */}
      <text x="20" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="rgba(247,181,0,0.5)" fontFamily="Georgia,serif">$</text>
    </svg>
  );
}

const cardSuits = ['♣', '♦', '♠'];
const suitColors = ['rgba(255,255,255,0.06)', 'rgba(239,68,68,0.08)', 'rgba(139,92,246,0.08)'];
const cornerNumbers = ['7', '10', 'A'];

export default function Membership() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector('.mem-title');
    if (title) {
      gsap.fromTo(title, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
      });
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { y: 120, rotateX: 15, opacity: 0, scale: 0.9 },
        {
          y: 0, rotateX: 0, opacity: 1, scale: 1,
          duration: 0.8, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' },
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const tiers: { name: string; suit?: string; price: string; features: string[] }[] = m.membership?.tiers || [];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 sm:px-8 perspective-container relative">
      {/* Floating poker decoration */}
      <div className="absolute top-12 left-[8%] text-6xl text-white/[0.02] font-bold select-none pointer-events-none animate-float">♠</div>
      <div className="absolute bottom-12 right-[8%] text-5xl text-red-500/[0.03] font-bold select-none pointer-events-none animate-float" style={{ animationDelay: '-2s' }}>♥</div>

      <div className="max-w-5xl mx-auto">
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
