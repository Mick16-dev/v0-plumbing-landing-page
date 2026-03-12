'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/app/context/language-context'
import { services } from '@/lib/services-data'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { JoinModal } from '@/components/join-modal'

export default function ServicesPage() {
  const { language } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Header onEmergencyClick={() => setIsModalOpen(true)} />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-6">
            {language === 'de' ? 'Unsere Leistungen' : 'Our Services'}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {language === 'de'
              ? 'Von der Notfall-Reparatur bis zur Badmodernisierung – wir übernehmen die komplette Sanitärarbeit in Berlin und Umgebung.'
              : 'From emergency repairs to bathroom renovations – we handle the full range of plumbing work in Berlin and the surrounding area.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group block p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="aspect-video rounded-xl mb-6 bg-muted overflow-hidden"
                  style={{
                    backgroundImage: `url(${service.afterImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {language === 'de' ? service.titleDe : service.titleEn}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {language === 'de' ? service.shortDescDe : service.shortDescEn}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {language === 'de' ? 'ab' : 'from'} €{service.fromPrice}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary group-hover:gap-2 transition-all">
                    {language === 'de' ? 'Mehr erfahren' : 'Learn more'} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'de' ? 'Brauchen Sie eine Beratung?' : 'Need advice?'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {language === 'de'
              ? 'Rufen Sie uns an oder schreiben Sie uns – wir nennen Ihnen grobe Kosten und mögliche Termine.'
              : 'Call or message us – we will give you rough costs and possible appointment times.'}
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-8 rounded-xl"
          >
            {language === 'de' ? 'Anfrage senden' : 'Send request'}
          </Button>
        </div>
      </section>

      <Footer onCtaClick={() => setIsModalOpen(true)} />
      <JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
