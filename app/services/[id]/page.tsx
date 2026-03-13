'use client'

import { useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/app/context/language-context'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Clock, Shield, Wrench } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const serviceDetails: Record<string, any> = {
  'leaking-pipe-repair': {
    titleEn: 'Leaking Pipe Repair',
    titleDe: 'Undichte Rohrreparatur',
    descEn: 'Comprehensive diagnostics and precision repair for any leaking pipe in your home.',
    descDe: 'Umfassende Diagnostik und Präzisionsreparatur für jedes undichte Rohr in Ihrem Haus.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1600&h=900&fit=crop',
    featuresEn: ['Emergency 30min response', 'Materials included', '2-year warranty', 'Certified technicians'],
    featuresDe: ['Notfall-Reaktion in 30 Min', 'Materialien inklusive', '2 Jahre Garantie', 'Zertifizierte Techniker']
  },
  'clogged-drain-unclogging': {
    titleEn: 'Drain Unclogging',
    titleDe: 'Abfluss-Entstopfung',
    descEn: 'Powerful mechanical and chemical solutions to clear the most stubborn blockages.',
    descDe: 'Leistungsstarke mechanische und chemische Lösungen für hartnäckigste Verstopfungen.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&h=900&fit=crop',
    featuresEn: ['Power-jet cleaning', 'Camera inspection', 'Deep-clean guarantee', 'No-mess promise'],
    featuresDe: ['Hochdruckreinigung', 'Kamera-Inspektion', 'Tiefenreinigungsgarantie', 'Sauberkeitsversprechen']
  },
  'broken-fixture-replacement': {
    titleEn: 'Broken Fixture Replacement',
    titleDe: 'Armatur-Austausch',
    descEn: 'Professional installation of faucets, toilets, and showers with premium hardware.',
    descDe: 'Professionelle Installation von Armaturen, Toiletten und Duschen mit Premium-Hardware.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop',
    featuresEn: ['Premium brands available', 'Leak-proof seal', 'Same-day service', 'Disposal of old fixtures'],
    featuresDe: ['Premium-Marken verfügbar', 'Auslaufsichere Versiegelung', 'Service am selben Tag', 'Entsorgung alter Armaturen']
  },
  'new-installation': {
    titleEn: 'New Installation',
    titleDe: 'Neuinstallation',
    descEn: 'Planning and executing complete plumbing systems for new homes or renovations.',
    descDe: 'Planung und Ausführung kompletter Sanitärsysteme für Neubauten oder Renovierungen.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1600&h=900&fit=crop',
    featuresEn: ['Full system design', 'Standard compliance', 'Water efficiency focus', 'Long-term support'],
    featuresDe: ['Komplettes Systemdesign', 'Standardkonformität', 'Fokus auf Wassereffizienz', 'Langzeit-Support']
  }
}

export default function ServicePage() {
  const { id } = useParams()
  const { language, t } = useLanguage()
  const service = serviceDetails[id as string] || serviceDetails['leaking-pipe-repair']

  return (
    <main className="min-h-screen bg-background">
      <Header onEmergencyClick={() => {}} />

      <div className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/#services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-black uppercase tracking-widest text-xs">
            <ArrowLeft className="w-4 h-4" />
            {language === 'de' ? 'Zurück' : 'Back'}
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h1 className="text-5xl sm:text-7xl font-black text-foreground italic uppercase tracking-tighter leading-none">
                {language === 'de' ? service.titleDe : service.titleEn}
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-medium leading-relaxed italic">
                {language === 'de' ? service.descDe : service.descEn}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {(language === 'de' ? service.featuresDe : service.featuresEn).map((f: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 bg-muted/30 p-4 rounded-2xl border border-white/40">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-xs font-black uppercase tracking-wider">{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('hero.response')}</p>
                    <p className="text-sm font-bold">15-30 Min</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('footer.certifiedMeister')}</p>
                    <p className="text-sm font-bold">Verified Expert</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full sm:w-auto h-20 px-12 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] rounded-2xl text-lg shadow-2xl">
                {t('funnel.cta')}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl"
            >
              <img src={service.image} alt={service.titleEn} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>

      <Footer onCtaClick={() => {}} />
    </main>
  )
}
