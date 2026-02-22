'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* X / Twitter icon */
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* Gradient avatar with initial letter */
function GradientAvatar({ name, color }: { name: string; color: string }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-4xl md:text-5xl font-black text-white/90 relative"
      style={{
        background: `linear-gradient(135deg, ${color}33, ${color}11)`,
        border: `2px solid ${color}55`,
        boxShadow: `0 0 40px ${color}22, inset 0 0 30px ${color}11`,
      }}
    >
      {initial}
      {/* Glow ring */}
      <div
        className="absolute inset-[-3px] rounded-full pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, transparent 60%, ${color}44 80%, transparent 100%)`,
          animation: 'spin 6s linear infinite',
        }}
      />
    </div>
  );
}

/* Decorative marquee symbols */
const marqueeSymbols = '♠ ♥ ♦ ♣ ₿ $ ♠ ♥ ♦ ♣ ₿ $ ♠ ♥ ♦ ♣ ₿ $';

export default function Team() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);

  const members: { name: string; handle: string; url: string; color: string }[] = m.team?.members || [];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title entrance
    const title = section.querySelector('.team-title');
    if (title) {
      gsap.fromTo(title, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
      });
    }

    // Cards 3D flip entrance
    const cards = section.querySelectorAll('.team-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, rotateY: 60, scale: 0.85 },
        {
          opacity: 1, rotateY: 0, scale: 1,
          duration: 0.9, delay: i * 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' },
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 overflow-hidden perspective-container relative">
      {/* Decorative poker chip corners */}
      <div className="absolute top-8 left-8 w-16 h-16 rounded-full border border-purple-500/10 flex items-center justify-center text-purple-500/10 text-2xl pointer-events-none">♠</div>
      <div className="absolute top-8 right-8 w-16 h-16 rounded-full border border-pink-500/10 flex items-center justify-center text-pink-500/10 text-2xl pointer-events-none">♥</div>
      <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full border border-blue-500/10 flex items-center justify-center text-blue-500/10 text-2xl pointer-events-none">♦</div>
      <div className="absolute bottom-8 right-8 w-16 h-16 rounded-full border border-green-500/10 flex items-center justify-center text-green-500/10 text-2xl pointer-events-none">♣</div>

      {/* Title */}
      <div className="team-title text-center mb-12 md:mb-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-3">{m.team?.title}</h2>
        <div className="w-12 h-0.5 bg-purple-500/40 mx-auto" />
      </div>

      {/* Decorative symbol marquee */}
      <div className="relative mb-12">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />
        <div className="marquee-track marquee-left opacity-[0.06]">
          {marqueeSymbols.split(' ').concat(marqueeSymbols.split(' ')).map((s, i) => (
            <span key={i} className="text-4xl md:text-5xl font-bold whitespace-nowrap">{s}</span>
          ))}
        </div>
      </div>

      {/* Team cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-6">
        {members.map((member, i) => (
          <a
            key={i}
            href={member.url}
            target="_blank"
            rel="noopener noreferrer"
            className="team-card glow-card p-8 md:p-10 text-center group opacity-0 hover:-translate-y-2 transition-all duration-500"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <GradientAvatar name={member.name} color={member.color} />
            </div>

            {/* Name */}
            <h3 className="text-xl md:text-2xl font-bold text-white/90 mb-1 group-hover:text-grad transition-all duration-300">
              {member.name}
            </h3>

            {/* Handle */}
            <p className="text-sm text-white/30 mb-5 font-mono">{member.handle}</p>

            {/* X button */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all duration-300">
              <XIcon className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              <span className="text-xs text-white/40 group-hover:text-white/80 transition-colors tracking-wider uppercase">Follow</span>
            </div>

            {/* Suit watermark */}
            <div
              className="absolute bottom-3 right-4 text-5xl pointer-events-none select-none opacity-[0.03]"
              style={{ color: member.color }}
            >
              {i === 0 ? '♠' : i === 1 ? '♥' : '♦'}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
