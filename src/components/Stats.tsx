'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const { m } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const items: { value: string; label: string }[] = m.stats?.items || [];

  return (
    <section ref={wrapRef} className="relative h-screen overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center h-full gap-8 md:gap-16 px-[10vw] will-change-transform"
        style={{ width: 'max-content' }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center px-4 md:px-8">
            <span className="text-[clamp(4rem,12vw,10rem)] font-black text-grad leading-none tracking-tight">
              {item.value}
            </span>
            <span className="mt-2 text-sm md:text-base tracking-[0.2em] uppercase text-white/30 font-light">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
