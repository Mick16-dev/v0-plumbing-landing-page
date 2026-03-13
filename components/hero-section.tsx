'use client'

import { useState, useCallback } from 'react'
import { Upload, Droplet, CircleOff, Wrench, Plus, CheckCircle, Clock, ShieldCheck, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/context/language-context'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type IssueCategory = 'leaking' | 'clogged' | 'broken' | 'installation'

interface FormData {
  image: File | null
  imagePreview: string | null
  issueType: IssueCategory | null
  severity: number
  name: string
  phone: string
  email: string
  address: string
}

interface EstimateRange {
  min: number
  max: number
}

function calculateEstimate(category: IssueCategory, severity: number): EstimateRange {
  const baseRates: Record<IssueCategory, { min: number; max: number }> = {
    leaking: { min: 80, max: 150 },
    clogged: { min: 60, max: 120 },
    broken: { min: 150, max: 300 },
    installation: { min: 200, max: 500 }
  }

  const multiplier = 1 + (severity - 1) * 0.25
  const base = baseRates[category]

  return {
    min: Math.round(base.min * multiplier),
    max: Math.round(base.max * multiplier)
  }
}

interface HeroSectionProps {
  onCtaClick: () => void
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFunnelOpen, setIsFunnelOpen] = useState(false) // Funnel modal
  const [isFormOpen, setIsFormOpen] = useState(false) // Final info modal
  const [estimate, setEstimate] = useState<EstimateRange | null>(null)
  const [formData, setFormData] = useState<FormData>({
    image: null,
    imagePreview: null,
    issueType: null,
    severity: 3,
    name: '',
    phone: '',
    email: '',
    address: ''
  })

  const handleImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: event.target?.result as string
        }))
        setStep(2)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: event.target?.result as string
        }))
        setStep(2)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleIssueSelect = (type: IssueCategory) => {
    setFormData(prev => ({ ...prev, issueType: type }))
    setStep(3)
  }

  const handleSeverityChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, severity: value[0] }))
  }

  const handleSeverityContinue = async () => {
    setIsSubmitting(true)
    // Simulate Blueprint Scanning phase
    await new Promise(resolve => setTimeout(resolve, 3500))
    if (formData.issueType) {
      setEstimate(calculateEstimate(formData.issueType, formData.severity))
    }
    setIsSubmitting(false)
    setIsFormOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsFormOpen(false)
    setIsSuccess(true)
  }

  const issueCategories: { type: IssueCategory; icon: React.ReactNode; color: string }[] = [
    { type: 'leaking', icon: <Droplet className="w-8 h-8" />, color: 'text-blue-500' },
    { type: 'clogged', icon: <CircleOff className="w-8 h-8" />, color: 'text-secondary' },
    { type: 'broken', icon: <Wrench className="w-8 h-8" />, color: 'text-destructive' },
    { type: 'installation', icon: <Plus className="w-8 h-8" />, color: 'text-success' }
  ]

  const severityLabels = [
    t('severity.1'),
    t('severity.2'),
    t('severity.3'),
    t('severity.4'),
    t('severity.5')
  ]

  const variants = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 }
  }

  return (
    <section className="relative pt-40 pb-32 px-4 min-h-[90vh] mesh-gradient overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 grain-overlay opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-6xl sm:text-9xl font-black text-foreground leading-[0.9] tracking-tighter italic uppercase max-w-5xl mx-auto">
            {t('hero.title')}
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Magnetic strength={0.2}>
              <Button
                onClick={() => setIsFunnelOpen(true)}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-[0.2em] h-20 px-12 rounded-2xl text-lg shadow-2xl shadow-primary/20 group relative overflow-hidden active:scale-95 transition-all"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2">
                  {t('funnel.cta')}
                  <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </span>
              </Button>
            </Magnetic>
            
            <a 
              href="#services" 
              className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors py-4 px-8"
            >
              {t('nav.services')}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Funnel Modal */}
      <Dialog open={isFunnelOpen} onOpenChange={setIsFunnelOpen}>
        <DialogContent className="max-w-xl p-0 bg-transparent border-0 shadow-none overflow-visible">
          <Card className="glass-card overflow-hidden rounded-[3rem] border-white/40 shadow-2xl">
            <CardContent className="p-8 sm:p-12 relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    className="text-center py-8"
                  >
                    <div className="w-24 h-24 mx-auto mb-8 bg-success rounded-[2rem] flex items-center justify-center shadow-xl shadow-success/20 animate-float">
                      <CheckCircle className="w-12 h-12 text-success-foreground" />
                    </div>
                    <h2 className="text-3xl font-black text-foreground mb-4 italic uppercase">{t('funnel.success.title')}</h2>
                    <p className="text-muted-foreground mb-10 font-medium">{t('funnel.success.desc')}</p>

                    {estimate && (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-card/40 backdrop-blur-md rounded-3xl p-8 mb-10 border border-white/20"
                      >
                        <p className="text-5xl font-black text-foreground italic">
                          {estimate.min}-{estimate.max}€
                        </p>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-center gap-3 py-4 px-6 bg-primary rounded-2xl text-primary-foreground shadow-lg shadow-primary/20">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <span className="font-bold uppercase tracking-wider text-sm">
                        {t('funnel.success.eta')}: 15-30 min
                      </span>
                    </div>
                  </motion.div>
                ) : isSubmitting ? (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center justify-center text-center"
                  >
                    <div className="relative w-32 h-32 mx-auto mb-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-secondary/30 rounded-full"
                      />
                      <div className="absolute inset-4 border-2 border-secondary rounded-full flex items-center justify-center">
                        <Wrench className="w-10 h-10 text-secondary animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-foreground italic uppercase tracking-tighter mb-2">{t('hero.masterDiagnostic')}</h3>
                    <p className="text-secondary text-sm font-bold uppercase tracking-[0.2em] animate-pulse">{t('hero.analyzing')}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {/* Progress */}
                    <div className="flex items-center justify-between gap-3 mb-10">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="flex-1 relative h-2">
                          <div className="absolute inset-0 bg-muted/30 rounded-full" />
                          <motion.div
                            initial={false}
                            animate={{ width: s <= step ? '100%' : '0%' }}
                            className={cn(
                              "absolute inset-0 rounded-full transition-all duration-500",
                              s < step ? "bg-success" : "bg-secondary"
                            )}
                          />
                        </div>
                      ))}
                    </div>

                    {step === 1 && (
                      <div className="space-y-8">
                        <div className="text-center">
                          <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-2">{t('funnel.step1.title')}</h2>
                          <p className="text-muted-foreground font-medium">{t('funnel.step1.desc')}</p>
                        </div>
                        <div
                          onDrop={handleImageDrop}
                          onDragOver={(e) => e.preventDefault()}
                          className="relative border-4 border-dashed border-border hover:border-secondary rounded-[2.5rem] p-16 text-center cursor-pointer transition-all duration-500 hover:bg-white/50 group"
                        >
                          <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" id="image-upload" />
                          <label htmlFor="image-upload" className="cursor-pointer block">
                            <Upload className="w-12 h-12 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
                            <span className="block text-sm font-black uppercase tracking-widest text-foreground">{t('funnel.step1.formats')}</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-6 mb-8">
                          {formData.imagePreview && (
                            <img src={formData.imagePreview} alt="Issue" className="w-20 h-20 object-cover rounded-2xl ring-4 ring-white" />
                          )}
                          <h2 className="text-2xl font-black uppercase italic">{t('funnel.step2.title')}</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {issueCategories.map(({ type, icon, color }) => (
                            <button
                              key={type}
                              onClick={() => handleIssueSelect(type)}
                              className={cn(
                                "p-6 rounded-[2rem] border-2 text-left transition-all",
                                formData.issueType === type ? "border-secondary bg-white shadow-xl" : "border-border/50 bg-card/10 hover:bg-white"
                              )}
                            >
                              <div className={cn(color, "mb-4")}>{icon}</div>
                              <p className="font-black text-[10px] uppercase tracking-widest leading-none">{t(`issue.${type}`)}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-10">
                        <h2 className="text-2xl font-black uppercase italic text-center">{t('funnel.step3.title')}</h2>
                        <div className="px-6 space-y-10">
                          <Slider value={[formData.severity]} onValueChange={handleSeverityChange} min={1} max={5} step={1} />
                          <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground">
                            {severityLabels.map((l, i) => <span key={i} className={formData.severity === i+1 ? "text-primary":""}>{l}</span>)}
                          </div>
                          <div className={cn("text-center p-10 rounded-[2rem] shadow-lg transition-all", 
                            formData.severity >= 4 ? "bg-destructive/10 text-destructive-foreground" : 
                            formData.severity >= 3 ? "bg-amber-500/10 text-amber-600" : "bg-success/10 text-success"
                          )}>
                            <p className="font-black text-4xl uppercase italic">{severityLabels[formData.severity - 1]}</p>
                          </div>
                          <Button onClick={handleSeverityContinue} className="w-full h-16 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl">{t('hero.calculate')}</Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      {/* Final Step Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-[3rem] border-0 p-10">
          <h2 className="text-3xl font-black uppercase italic text-center mb-8">{t('funnel.step4.title')}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { id: 'name', label: t('form.name'), type: 'text' },
              { id: 'phone', label: t('form.phone'), type: 'tel' },
              { id: 'email', label: t('form.email'), type: 'email' },
              { id: 'address', label: t('form.address'), type: 'text' }
            ].map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-50">{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  required
                  value={(formData as any)[field.id]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                  className="bg-muted/50 border-0 rounded-2xl h-14"
                />
              </div>
            ))}
            <Button type="submit" className="w-full bg-secondary text-white font-black uppercase tracking-[0.2em] h-16 rounded-2xl mt-8 shadow-xl shadow-secondary/20">{t('funnel.cta')}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
