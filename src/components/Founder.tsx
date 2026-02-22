'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Founder() {
  const { messages, t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const achievements: string[] = messages.founder?.achievements || [];

  return (
    <section id="founder" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute left-1/4 top-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px]" />

      <div className="container-max relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary-light font-medium">
            {t('founder.badge')}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-12">
          {/* Left - Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-accent-pink to-accent-blue opacity-20 blur-xl animate-pulse-slow" />
              
              {/* Avatar placeholder */}
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-surface-light to-surface border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="text-6xl md:text-7xl font-black text-gradient mb-1">W</div>
                  <div className="text-sm text-muted font-medium">{t('founder.title')}</div>
                </div>
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border border-primary/10" />
                <div className="absolute -inset-2 rounded-full border border-primary/5" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2 -right-2 px-3 py-1.5 rounded-lg bg-surface border border-primary/30 text-xs text-primary-light font-medium shadow-lg"
              >
                🃏 Poker Pro
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-2 -left-2 px-3 py-1.5 rounded-lg bg-surface border border-accent-pink/30 text-xs text-accent-pink font-medium shadow-lg"
              >
                📈 Top Trader
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-2">
              {t('founder.title')}
            </h2>
            <p className="text-primary-light font-medium text-lg mb-6">
              {t('founder.role')}
            </p>
            <p className="text-muted leading-relaxed text-base md:text-lg mb-8">
              {t('founder.description')}
            </p>

            {/* Achievements */}
            <div className="space-y-3 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-300">{achievement}</span>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <a
              href="https://x.com/CryptoApprentil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white hover:bg-white/5 hover:border-primary/30 transition-all duration-300 text-sm font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {t('founder.social')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
