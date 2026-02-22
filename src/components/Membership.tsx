'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const suitSymbols = ['♠', '♣', '♦'];
const suitColors = ['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.04)', 'rgba(239,68,68,0.06)'];

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

  const tiers: { name: string; price: string; features: string[] }[] = m.membership?.tiers || [];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 sm:px-8 perspective-container relative">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="mem-title text-center mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-3">{m.membership?.title}</h2>
          <div className="w-12 h-0.5 bg-purple-500/40 mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {tiers.map((tier, i) => {
            const isVip = i === tiers.length - 1;
            return (
              <div
                key={i}
                ref={(el: HTMLElement | null) => { cardsRef.current[i] = el; }}
                className={`${isVip ? 'animated-border' : 'glow-card'} p-6 md:p-8 flex flex-col will-change-transform opacity-0 relative`}
                style={{ transformStyle: 'preserve-3d', borderRadius: '1rem' }}
              >
                {/* Poker suit watermark */}
                <div className="absolute top-3 right-4 text-4xl md:text-5xl select-none pointer-events-none leading-none"
                  style={{ color: suitColors[i] }}
                >
                  {suitSymbols[i]}
                </div>

                {/* VIP badge */}
                {isVip && (
                  <div className="self-start px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] tracking-widest uppercase text-purple-300 font-bold mb-3">
                    Popular
                  </div>
                )}

                {/* Name */}
                <h3 className={`text-lg font-bold mb-1 ${isVip ? 'text-grad' : 'text-white/90'}`}>
                  {tier.name}
                </h3>

                {/* Price */}
                <div className={`text-3xl md:text-4xl font-black mb-5 ${isVip ? 'text-grad' : 'text-white'}`}>
                  {tier.price}
                </div>

                {/* Divider with suit */}
                <div className="flex items-center gap-2 mb-5">
                  <div className={`flex-1 h-px ${isVip ? 'bg-purple-500/25' : 'bg-white/8'}`} />
                  <span className={`text-[10px] ${isVip ? 'text-purple-400/40' : 'text-white/10'}`}>{suitSymbols[i]}</span>
                  <div className={`flex-1 h-px ${isVip ? 'bg-purple-500/25' : 'bg-white/8'}`} />
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-white/40 leading-relaxed">
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isVip ? 'text-purple-400' : 'text-white/15'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Bottom poker suit decoration */}
                <div className="absolute bottom-3 left-4 text-xl select-none pointer-events-none opacity-[0.03]">
                  {suitSymbols[i]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
