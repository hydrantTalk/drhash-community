'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Membership() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        {
          y: 200,
          rotateX: 25,
          opacity: 0,
          scale: 0.85,
        },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: `${15 + i * 12}% bottom`,
            end: `${40 + i * 12}% bottom`,
            scrub: 1,
          },
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const tiers: { name: string; price: string; features: string[] }[] = m.membership?.tiers || [];

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center py-32 px-4 perspective-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl w-full">
        {tiers.map((tier, i) => {
          const isVip = i === tiers.length - 1;
          return (
            <div
              key={i}
              ref={(el: HTMLElement | null) => { cardsRef.current[i] = el; }}
              className={`${isVip ? 'glow-card-vip' : 'glow-card'} p-8 md:p-10 flex flex-col will-change-transform`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Name */}
              <h3 className={`text-xl font-bold mb-1 ${isVip ? 'text-grad' : 'text-white'}`}>
                {tier.name}
              </h3>

              {/* Price */}
              <div className={`text-4xl md:text-5xl font-black mb-6 ${isVip ? 'text-grad' : 'text-white'}`}>
                {tier.price}
              </div>

              {/* Divider */}
              <div className={`h-px mb-6 ${isVip ? 'bg-purple-500/30' : 'bg-white/10'}`} />

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {tier.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm text-white/50">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isVip ? 'bg-purple-500' : 'bg-white/20'}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
