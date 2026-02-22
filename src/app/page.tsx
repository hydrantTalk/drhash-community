'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LangProvider } from '@/context/LanguageContext';
import CryptoCanvas from '@/components/CryptoCanvas';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Membership from '@/components/Membership';
import Founder from '@/components/Founder';
import Team from '@/components/Media';
import CTA from '@/components/CTA';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      {/* Global floating crypto symbols background */}
      <CryptoCanvas />

      <main className="noise relative z-[1]">
        <Navbar />
        <Hero />
        <div className="section-divider" />
        <Stats />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Membership />
        <div className="section-divider" />
        <Founder />
        <div className="section-divider" />
        <Team />
        <div className="section-divider" />
        <CTA />
      </main>
    </>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <App />
    </LangProvider>
  );
}
