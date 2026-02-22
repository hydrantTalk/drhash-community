'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import Membership from '@/components/Membership';
import Founder from '@/components/Founder';
import Media from '@/components/Media';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <main className="relative">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Stats />
        <Membership />
        <Founder />
        <Media />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
