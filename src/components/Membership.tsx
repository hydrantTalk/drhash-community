'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Membership() {
  const { messages, t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const tiers = messages.membership?.tiers || [];

  return (
    <section id="membership" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute right-0 top-1/3 w-[600px] h-[600px] bg-accent-pink/5 rounded-full blur-[120px]" />

      <div className="container-max relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary-light font-medium">
            {t('membership.badge')}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16"
        >
          {t('membership.title')}
        </motion.h2>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier: { name: string; price: string; features: string[]; highlight: boolean }, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className={`relative rounded-2xl p-6 md:p-8 transition-all duration-500 ${
                tier.highlight
                  ? 'bg-gradient-to-b from-primary/20 via-surface to-surface border border-primary/40 shadow-[0_0_40px_rgba(139,92,246,0.15)]'
                  : 'glass-card hover:border-white/20'
              }`}
            >
              {/* Highlight badge */}
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-primary-light text-white text-xs font-bold uppercase tracking-wider">
                  Popular
                </div>
              )}

              {/* Tier Name */}
              <h3 className={`text-xl font-bold mb-2 ${tier.highlight ? 'text-primary-light' : 'text-white'}`}>
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className={`text-3xl md:text-4xl font-black ${tier.highlight ? 'text-gradient' : 'text-white'}`}>
                  {tier.price}
                </span>
              </div>

              {/* Divider */}
              <div className={`h-px mb-6 ${tier.highlight ? 'bg-primary/30' : 'bg-white/10'}`} />

              {/* Features */}
              <ul className="space-y-3">
                {tier.features.map((feature: string, fIndex: number) => (
                  <li key={fIndex} className="flex items-start gap-3 text-sm">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-primary-light' : 'text-primary/60'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-muted leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-8">
                <a
                  href="#contact"
                  className={`block w-full py-3 rounded-xl text-center font-semibold text-sm transition-all duration-300 ${
                    tier.highlight
                      ? 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                      : 'border border-white/20 text-white hover:bg-white/5 hover:border-white/30'
                  }`}
                >
                  {tier.highlight
                    ? (messages.contact?.cta || 'Join Now')
                    : (messages.hero?.cta_learn || 'Learn More')}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
