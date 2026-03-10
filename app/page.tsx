'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { InstantDiagnosisSection } from '@/components/instant-diagnosis-section'
import { AboutSection } from '@/components/about-section'
import { ServiceAreaSection } from '@/components/service-area-section'
import { BeforeAfterGallery } from '@/components/before-after-gallery'
import { TestimonialsSection } from '@/components/testimonials-section'
import { TrustBadges } from '@/components/trust-badges'
import { FeaturesSection } from '@/components/features-section'
import { MasterExpertSection } from '@/components/master-expert-section'
import { PricingSection } from '@/components/pricing-section'
import { FaqSection } from '@/components/faq-section'
import { Footer } from '@/components/footer'
import { JoinModal } from '@/components/join-modal'
import { StackingSection } from '@/components/ui/stacking-section'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main className="min-h-screen bg-background">
      <Header onEmergencyClick={openModal} />
      
      <HeroSection onCtaClick={openModal} />
      
      <StackingSection index={1}>
        <InstantDiagnosisSection />
      </StackingSection>

      <StackingSection index={2}>
        <TrustBadges />
      </StackingSection>
      
      <StackingSection index={3}>
        <MasterExpertSection />
      </StackingSection>
      
      <StackingSection index={4}>
        <FeaturesSection onCtaClick={openModal} />
      </StackingSection>
      
      <StackingSection index={5}>
        <BeforeAfterGallery onCtaClick={openModal} />
      </StackingSection>
      
      <StackingSection index={6}>
        <TestimonialsSection />
      </StackingSection>
      
      <StackingSection index={7}>
        <PricingSection onCtaClick={openModal} />
      </StackingSection>
      
      <StackingSection index={8}>
        <AboutSection />
      </StackingSection>

      <StackingSection index={9}>
        <ServiceAreaSection />
      </StackingSection>

      <StackingSection index={10}>
        <FaqSection />
      </StackingSection>
      
      <Footer onCtaClick={openModal} />
      <JoinModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  )
}
