'use client';

import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const els = section.querySelectorAll('.cta-anim');
    els.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 25 }, {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.1,
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
      });
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
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
      {/* Bitcoin-inspired glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] rounded-full bg-[#F7931A]/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[200px] h-[200px] rounded-full bg-pink-500/3 blur-[100px] pointer-events-none" />

      {/* Floating BTC decorations */}
      <div className="absolute top-[15%] left-[8%] text-6xl text-[#F7931A]/[0.04] font-bold select-none pointer-events-none animate-float">₿</div>
      <div className="absolute bottom-[20%] right-[10%] text-5xl text-purple-500/[0.04] font-bold select-none pointer-events-none animate-float" style={{ animationDelay: '-3s' }}>♠</div>
      <div className="absolute top-[25%] right-[15%] text-4xl text-white/[0.03] font-bold select-none pointer-events-none animate-float" style={{ animationDelay: '-1.5s' }}>#</div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Title */}
        <h2 className="cta-anim text-3xl md:text-5xl font-black tracking-tight text-white/90 mb-4 opacity-0">
          {m.cta?.title}
        </h2>

        {/* Desc */}
        <p className="cta-anim text-sm text-white/30 mb-3 opacity-0">{m.cta?.desc}</p>

        {/* Email */}
        <p className="cta-anim text-xs text-white/20 mb-10 opacity-0">
          ✉ {m.cta?.email}
        </p>

        {/* Magnetic button with glow pulse */}
        <div className="cta-anim opacity-0" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
          <a
            ref={btnRef}
            href="https://x.com/DrhashClub"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn glow-pulse inline-flex px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-base tracking-wide transition-shadow duration-500"
          >
            {m.cta?.btn}
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-20 pt-8 border-t border-white/5 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-sm font-black tracking-tight text-white/50">DR.<span className="text-grad">HASH</span></span>
        </div>
        <p className="text-[10px] text-white/15 tracking-widest">{m.footer}</p>
      </div>
    </section>
  );
}
