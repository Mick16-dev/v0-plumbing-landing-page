'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/context/language-context'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'
import { 
  ArrowRight, 
  MoveHorizontal,
  Camera,
  Search,
  FileText,
  Wrench,
  Timer
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ComparisonSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel: string
  afterLabel: string
}

function ComparisonSlider({ beforeImage, afterImage, beforeLabel, afterLabel }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-[2.5rem] cursor-ew-resize select-none border border-white/20 shadow-xl group"
      onMouseMove={handleMouseMove}
      onMouseDown={(e) => handleMove(e.clientX)}
      onTouchMove={handleTouchMove}
      onTouchStart={(e) => handleMove(e.touches[0].clientX)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${afterImage})` }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${beforeImage})`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      />
      <div
        className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-center border border-white/50"
        >
          <MoveHorizontal className="w-5 h-5 text-primary" />
        </motion.div>
      </div>
      <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-white/10">
        {beforeLabel}
      </div>
      <div className="absolute top-6 right-6 px-4 py-2 bg-success/80 backdrop-blur-md text-success-foreground text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-white/10">
        {afterLabel}
      </div>
    </div>
  )
}

const services = [
  {
    id: 'leaking-pipe-repair',
    beforeImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1585128903994-9788298932a4?w=800&h=600&fit=crop',
    titleEn: 'Leaking Pipe Repair',
    titleDe: 'Undichte Rohrreparatur',
    descEn: 'Fixed burst water pipe under kitchen sink with precision.',
    descDe: 'Geplatzte Wasserleitung unter Spüle mit Präzision repariert.'
  },
  {
    id: 'clogged-drain-unclogging',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
    titleEn: 'Drain Unclogging',
    titleDe: 'Abfluss-Entstopfung',
    descEn: 'Cleared severe bathroom drain blockage permanently.',
    descDe: 'Starke Badezimmer-Verstopfung dauerhaft beseitigt.'
  },
  {
    id: 'broken-fixture-replacement',
    beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop',
    titleEn: 'Faucet Replacement',
    titleDe: 'Armatur-Austausch',
    descEn: 'Installed modern fixtures in master bath seamlessly.',
    descDe: 'Moderne Armaturen im Hauptbad nahtlos installiert.'
  }
]

const diagnosisSteps = [
  { icon: Camera, step: 1 },
  { icon: Search, step: 2 },
  { icon: FileText, step: 3 },
  { icon: Wrench, step: 4 },
]

interface ServicesSectionProps {
  onCtaClick: () => void
}

export function ServicesSection({ onCtaClick }: ServicesSectionProps) {
  const { language, t } = useLanguage()

  return (
    <section id="services" className="py-32 px-4 relative overflow-hidden bg-background">
      <div className="absolute inset-0 mesh-gradient opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl sm:text-7xl font-black text-foreground mb-8 tracking-tighter italic uppercase">
            {language === 'de' ? 'Unsere Leistungen' : 'Our Services'}
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed italic">
            {language === 'de' ? 'Entdecken Sie unsere meisterhafte Arbeit. Von akuten Notfällen bis hin zu geplanten Modernisierungen.' : 'Discover our master craftsmanship. From acute emergencies to planned modernizations.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 space-y-24">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2">
                    <ComparisonSlider
                      beforeImage={service.beforeImage}
                      afterImage={service.afterImage}
                      beforeLabel={language === 'de' ? 'Vorher' : 'Before'}
                      afterLabel={language === 'de' ? 'Nachher' : 'After'}
                    />
                  </div>
                  <div className="w-full md:w-1/2 space-y-6">
                    <h3 className="text-3xl font-black text-foreground italic uppercase tracking-tighter leading-none">
                      {language === 'de' ? service.titleDe : service.titleEn}
                    </h3>
                    <p className="text-lg text-muted-foreground font-medium italic">
                      {language === 'de' ? service.descDe : service.descEn}
                    </p>
                    <Link 
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all"
                    >
                      {language === 'de' ? 'Mehr erfahren' : 'Learn More'}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 sticky top-32"
          >
            <div className="bg-primary rounded-[3rem] p-10 shadow-2xl shadow-primary/20 relative group overflow-hidden">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity" />

              <h4 className="text-2xl font-black text-white italic uppercase tracking-widest mb-12 flex items-center gap-4">
                <Timer className="w-8 h-8 text-secondary" />
                {t('features.howItWorks')}
              </h4>

              <div className="space-y-12 relative">
                <div className="absolute left-6 top-10 bottom-10 w-px bg-white/10" />

                {diagnosisSteps.map((step, idx) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex gap-8 relative z-10"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 ring-4 ring-primary border border-white/20 shadow-lg">
                      <step.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-1">{t('features.step')} {step.step}</p>
                      <h5 className="text-xl font-bold text-white mb-2 leading-none">{t(`features.masterDeepDive.step${step.step}.title`)}</h5>
                      <p className="text-sm text-white/60 font-medium leading-relaxed">{t(`features.masterDeepDive.step${step.step}.desc`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Magnetic strength={0.2} className="w-full">
                <Button
                  onClick={onCtaClick}
                  className="w-full mt-16 bg-secondary text-white hover:bg-secondary/90 font-black uppercase tracking-[0.2em] py-8 rounded-2xl text-lg shadow-xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {t('features.cta')}
                    <ArrowRight className="w-6 h-6" />
                  </span>
                </Button>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
