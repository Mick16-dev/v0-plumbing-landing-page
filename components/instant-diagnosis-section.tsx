'use client'

import { useLanguage } from '@/app/context/language-context'
import { Camera, MessageSquare, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function InstantDiagnosisSection() {
  const { language, t } = useLanguage()

  const steps =
    language === 'de'
      ? [
          {
            icon: Camera,
            title: 'Foto machen',
            text: 'Machen Sie ein oder zwei Fotos vom Problem (z.B. unter dem Waschbecken oder von der betroffenen Stelle).'
          },
          {
            icon: MessageSquare,
            title: 'Kurz beschreiben',
            text: 'Beschreiben Sie in ein paar Sätzen, was passiert ist und seit wann das Problem besteht.'
          },
          {
            icon: Phone,
            title: 'Erste Einschätzung bekommen',
            text: 'Wir melden uns schnell mit einer ersten Einschätzung zu Ursache, groben Kosten und was Sie bis zu unserem Eintreffen tun können.'
          }
        ]
      : [
          {
            icon: Camera,
            title: 'Take a quick photo',
            text: 'Take one or two photos of the problem (for example under the sink or at the damaged spot).'
          },
          {
            icon: MessageSquare,
            title: 'Tell us briefly',
            text: 'Write a few sentences about what happened and since when the problem exists.'
          },
          {
            icon: Phone,
            title: 'Get a first estimate',
            text: 'We call you back with a first idea of the cause, rough costs and what you can do until we arrive.'
          }
        ]

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-[0.15em] mb-4">
            {language === 'de' ? 'Foto-Diagnose (Prototyp)' : 'Photo diagnosis (prototype)'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">
            {language === 'de'
              ? 'Schicken Sie ein Foto – wir schätzen das Problem vorab ein.'
              : 'Send us a photo – we give you a first estimate before we come.'}
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {language === 'de'
              ? 'Die Funktion befindet sich noch im Aufbau, hilft uns aber jetzt schon, besser vorbereitet bei Ihnen zu erscheinen.'
              : 'This feature is still in development, but already helps us arrive better prepared for your job.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <step.icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground mb-4">
          {language === 'de'
            ? 'Hinweis: Die Einschätzung ersetzt keine Vor-Ort-Prüfung. Der endgültige Preis wird immer nach der Besichtigung mit Ihnen besprochen.'
            : 'Note: The first estimate does not replace an on-site inspection. The final price is always agreed with you after we have seen everything in person.'}
        </p>

        <div className="text-center">
          <Button
            size="sm"
            className="h-9 px-4 text-xs font-semibold rounded-lg"
            asChild
          >
            <a href="#request-diagnosis">
              {language === 'de' ? 'Foto und Problem jetzt senden' : 'Send photo and problem now'}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

