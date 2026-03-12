'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/app/context/language-context'
import { getServiceBySlug } from '@/lib/services-data'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { JoinModal } from '@/components/join-modal'
import { notFound } from 'next/navigation'

export default function ServicePage() {
  const params = useParams()
  const slug = params?.slug as string
  const service = getServiceBySlug(slug)
  const { language } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!service) {
    notFound()
  }

  const title = language === 'de' ? service.titleDe : service.titleEn
  const intro = language === 'de' ? service.introDe : service.introEn
  const whatWeDo = language === 'de' ? service.whatWeDoDe : service.whatWeDoEn
  const whenToCall = language === 'de' ? service.whenToCallDe : service.whenToCallEn
  const process = language === 'de' ? service.processDe : service.processEn

  return (
    <main className="min-h-screen bg-background">
      <Header onEmergencyClick={() => setIsModalOpen(true)} />

      <section className="pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> {language === 'de' ? 'Zurück zu den Leistungen' : 'Back to services'}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-6">{title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{intro}</p>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {language === 'de' ? 'Vorher und Nachher' : 'Before & after'}
          </h2>
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-black/5">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.afterImage})` }} />
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${service.beforeImage})`, clipPath: 'inset(0 50% 0 0)' }}
            />
            <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 text-white text-sm font-bold uppercase rounded-xl">
              {language === 'de' ? 'Vorher' : 'Before'}
            </div>
            <div className="absolute top-6 right-6 px-4 py-2 bg-success/90 text-white text-sm font-bold uppercase rounded-xl">
              {language === 'de' ? 'Nachher' : 'After'}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {language === 'de'
              ? 'Typische Ausgangslage und Ergebnis unserer Arbeit (Beispielbilder).'
              : 'Typical starting point and result of our work (sample images).'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {language === 'de' ? 'Was wir machen' : 'What we do'}
            </h2>
            <ul className="space-y-3">
              {whatWeDo.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-secondary font-bold shrink-0">–</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {language === 'de' ? 'Wann Sie anrufen sollten' : 'When to call'}
            </h2>
            <ul className="space-y-3">
              {whenToCall.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-secondary font-bold shrink-0">–</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {language === 'de' ? 'So läuft ein typischer Einsatz ab' : 'How a typical visit works'}
          </h2>
          <div className="space-y-10">
            {process.map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'de' ? 'Kostenloser Kostenvoranschlag' : 'Free quote'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === 'de'
              ? 'Grobe Preisspanne: ab €' + service.fromPrice + '. Der genaue Preis hängt von Aufwand und Material ab.'
              : 'Rough price range: from €' + service.fromPrice + '. Exact price depends on effort and materials.'}
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-8 rounded-xl inline-flex items-center gap-2"
          >
            {language === 'de' ? 'Anfrage senden' : 'Send request'} <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer onCtaClick={() => setIsModalOpen(true)} />
      <JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
