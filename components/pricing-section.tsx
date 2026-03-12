'use client'

import Link from 'next/link'
import { useLanguage } from '@/app/context/language-context'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const jobs = [
  {
    id: 'drain',
    slug: 'drain-cleaning',
    titleEn: 'Blocked toilet or drain',
    titleDe: 'Verstopfte Toilette oder Abfluss',
    fromPrice: 89,
    descEn: 'Includes arrival, simple unblocking and short function test.',
    descDe: 'Inklusive Anfahrt, einfacher Rohrreinigung und kurzem Funktionstest.'
  },
  {
    id: 'leak',
    slug: 'leak-repair',
    titleEn: 'Leak under sink or basin',
    titleDe: 'Leck unter Spüle oder Waschbecken',
    fromPrice: 99,
    descEn: 'Finding and sealing simple leaks on accessible pipework.',
    descDe: 'Auffinden und Abdichten einfacher Leckagen an zugänglichen Leitungen.'
  },
  {
    id: 'emergency',
    slug: 'emergency-plumbing',
    titleEn: 'Emergency evening visit',
    titleDe: 'Notdienst am Abend',
    fromPrice: 149,
    descEn: 'For acute water damage or complete blockages outside office hours.',
    descDe: 'Für akute Wasserschäden oder komplette Verstopfungen außerhalb der Bürozeiten.'
  }
]

interface PricingSectionProps {
  onCtaClick: () => void
}

export function PricingSection({ onCtaClick }: PricingSectionProps) {
  const { language, t } = useLanguage()

  return (
    <section id="pricing" className="py-32 px-4 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="inline-flex px-5 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-[0.2em] mb-6">
            {t('pricing.badge') || 'Prices you can understand'}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t('pricing.title')}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {jobs.map((job) => {
            const title = language === 'de' ? job.titleDe : job.titleEn
            const desc = language === 'de' ? job.descDe : job.descEn
            return (
              <div
                key={job.id}
                className="p-6 rounded-2xl border border-border bg-card text-foreground flex flex-col gap-4"
              >
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
                <div className="mt-auto flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    {language === 'de' ? 'ab' : 'from'}
                  </span>
                  <span className="text-2xl font-bold">€{job.fromPrice}</span>
                  <span className="text-xs text-muted-foreground">
                    {language === 'de' ? 'inkl. MwSt.' : 'incl. VAT'}
                  </span>
                </div>
                <Link
                  href={`/services/${job.slug}`}
                  className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1 mt-2"
                >
                  {language === 'de' ? 'Mehr erfahren' : 'Learn more'} <ArrowRight className="w-3 h-3" />
                </Link>
                <Button
                  onClick={onCtaClick}
                  className="mt-4 w-full h-10 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {language === 'de' ? 'Rückruf zu diesem Thema' : 'Call back about this'}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
