'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/context/language-context'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeaturesSectionProps {
  onCtaClick: () => void
}

const pillars = [
  {
    id: 'expert-diagnosis',
    border: 'border-primary/30'
  },
  {
    id: 'time-cost',
    border: 'border-primary/30'
  },
  {
    id: 'reliability',
    border: 'border-primary/30'
  },
]

const diagnosisSteps = [
  { step: 1 },
  { step: 2 },
  { step: 3 },
  { step: 4 },
]

export function FeaturesSection({ onCtaClick }: FeaturesSectionProps) {
  const { t, language } = useLanguage()
  const [activePillar, setActivePillar] = useState<string>('expert-diagnosis')

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  } as any

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as any

  return (
    <section id="services" className="py-32 px-4 relative overflow-hidden bg-background">

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-xl uppercase tracking-[0.15em] mb-6">
            {t('features.badge')}
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tighter italic uppercase">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Pillar Selection Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={item}
              onClick={() => setActivePillar(pillar.id)}
              className={cn(
                "cursor-pointer p-6 rounded-2xl border bg-card",
                activePillar === pillar.id ? pillar.border : "border-border"
              )}
            >
              <h3 className="text-2xl font-black text-foreground mb-4 italic uppercase tracking-tighter">
                {t(`features.${pillar.id}.title`)}
              </h3>

              <p className="text-muted-foreground font-medium mb-8 leading-relaxed">
                {t(`features.${pillar.id}.tagline`)}
              </p>

              <Link
                href={pillar.id === 'expert-diagnosis' ? '/services/drain-cleaning' : pillar.id === 'time-cost' ? '/services' : '/team'}
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-secondary hover:gap-2 transition-all"
              >
                {pillar.id === 'expert-diagnosis' ? (language === 'de' ? 'Leistung ansehen' : 'View service') : pillar.id === 'time-cost' ? (language === 'de' ? 'Alle Leistungen' : 'All services') : t('features.learnMore')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Deep Dive */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-2xl p-6 lg:p-10 border border-border bg-card shadow-sm"
          >
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Side: Detail & Timeline */}
              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-foreground">
                    {t(`features.${activePillar}.title`)}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t(`features.${activePillar}.solution`)}
                  </p>
                </div>

                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 bg-muted/40 p-3 rounded-xl border border-border/60"
                    >
                      <span className="font-bold text-foreground tracking-tight">
                        {t(`features.${activePillar}.benefit${i}`)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side: Simple steps */}
              <div className="bg-muted rounded-2xl p-6 lg:p-8">
                <h4 className="text-lg font-semibold text-foreground mb-6">
                  {t('features.howItWorks')}
                </h4>

                <div className="space-y-10 relative">
                  <div className="absolute left-5 top-10 bottom-10 w-px bg-border" />

                  {diagnosisSteps.map((step, idx) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      className="flex gap-8 relative z-10"
                    >
                      <div>
                        <p className="text-xs font-semibold text-secondary uppercase tracking-[0.15em] mb-1">
                          Step {step.step}
                        </p>
                        <h5 className="text-base font-semibold text-foreground mb-1 tracking-tight">
                          {t(`features.masterDeepDive.step${step.step}.title`)}
                        </h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(`features.masterDeepDive.step${step.step}.desc`)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Simple services list */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t('services.commonIssues') || 'Typical plumbing problems'}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- {t('services.leaks') || 'Leaking pipes, taps and radiators'}</li>
              <li>- {t('services.blocks') || 'Blocked toilets, showers and kitchen sinks'}</li>
              <li>- {t('services.heating') || 'Problems with hot water and heating'}</li>
              <li>- {t('services.emergency') || 'Emergency water damage and burst pipes'}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t('services.projects') || 'Planned work and renovations'}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- {t('services.bathroom') || 'Bathroom modernisation and new fittings'}</li>
              <li>- {t('services.kitchen') || 'Kitchen sinks, dishwashers and washing machines'}</li>
              <li>- {t('services.replacement') || 'Replacement of old pipe sections and fittings'}</li>
              <li>- {t('services.checks') || 'Checking existing installations before buying or renting'}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
