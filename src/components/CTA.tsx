'use client';

import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* Floating chip SVG */
function FloatingChip({ className, color, delay }: { className?: string; color: string; delay: number }) {
  return (
    <div className={`${className} animate-float select-none pointer-events-none`} style={{ animationDelay: `${delay}s` }}>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="19" stroke={`${color}30`} strokeWidth="1.5" fill={`${color}05`} />
        <circle cx="22" cy="22" r="13" stroke={`${color}15`} strokeWidth="0.8" fill="none" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
          <line
            key={deg}
            x1={22 + 17 * Math.cos(deg * Math.PI / 180)}
            y1={22 + 17 * Math.sin(deg * Math.PI / 180)}
            x2={22 + 20 * Math.cos(deg * Math.PI / 180)}
            y2={22 + 20 * Math.sin(deg * Math.PI / 180)}
            stroke={`${color}25`}
            strokeWidth="2"
          />
        ))}
        <text x="22" y="26" textAnchor="middle" fontSize="11" fontWeight="bold" fill={`${color}35`} fontFamily="Georgia,serif">$</text>
      </svg>
    </div>
  );
}

export default function CTA() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const els = section.querySelectorAll('.cta-anim');
      els.forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 25 }, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 95%', toggleActions: 'play none none none' },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] rounded-full bg-[#F7931A]/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[200px] h-[200px] rounded-full bg-pink-500/3 blur-[100px] pointer-events-none" />

      {/* Floating poker/chip decorations */}
      <div className="absolute top-[12%] left-[6%] text-6xl text-[#F7931A]/[0.04] font-bold select-none pointer-events-none animate-float">₿</div>
      <div className="absolute top-[20%] right-[12%] text-4xl text-white/[0.03] font-bold select-none pointer-events-none animate-float" style={{ animationDelay: '-1.5s' }}>#</div>
      <div className="absolute bottom-[25%] left-[15%] text-5xl text-red-500/[0.04] select-none pointer-events-none animate-float" style={{ animationDelay: '-2s' }}>♥</div>

      {/* Floating chips */}
      <FloatingChip className="absolute top-[15%] right-[8%]" color="#8E7CC3" delay={0} />
      <FloatingChip className="absolute bottom-[20%] left-[5%]" color="#F7931A" delay={-2} />
      <FloatingChip className="absolute top-[60%] right-[15%]" color="#EC4899" delay={-4} />
      <FloatingChip className="absolute bottom-[35%] right-[25%] hidden md:block" color="#22C55E" delay={-1} />
      <FloatingChip className="absolute top-[35%] left-[20%] hidden md:block" color="#3B82F6" delay={-3} />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Title */}
        <h2 className="cta-anim text-3xl md:text-5xl font-black tracking-tight text-white/90 mb-4 opacity-0">
          {m.cta?.title}
        </h2>

        {/* Desc */}
        <p className="cta-anim text-sm text-white/30 mb-10 opacity-0">{m.cta?.desc}</p>

        {/* Button with suit decorations */}
        <div className="cta-anim opacity-0 flex items-center justify-center gap-4" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
          <span className="text-2xl text-purple-500/20 hidden sm:inline">♠</span>
          <a
            ref={btnRef}
            href="https://x.com/DrHashClub"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn glow-pulse inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-base tracking-wide transition-shadow duration-500"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            {m.cta?.btn}
          </a>
          <span className="text-2xl text-pink-500/20 hidden sm:inline">♦</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-20 pt-8 border-t border-white/5 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-sm font-black tracking-tight text-white/50">DR.<span className="text-grad">HASH</span></span>
        </div>
        <a href="mailto:support@drhash.io" className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors mb-3">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
          support@drhash.io
        </a>
        <p className="text-[10px] text-white/15 tracking-widest">{m.footer}</p>
      </div>
    </section>
  );
}
