# Rohr-Blitz Plumbing Landing Page - Implementation Kickstart

## Project Overview

A single-page, bilingual (EN/DE) landing page for a German plumbing service featuring an AI-powered diagnostic tool, emergency dispatch, and conversion-optimized design.

---

## Design Token System

### Color Palette (5 Colors Max)

| Token | Role | Value | Usage |
|-------|------|-------|-------|
| **Primary** | Brand / Trust | `#1E3A5F` (Navy Blue) | Headers, primary buttons, footer |
| **Secondary** | CTA / Action | `#F97316` (Orange-500) | "Get Estimate" buttons, hover states, highlights |
| **Destructive** | Emergency / Urgency | `#DC2626` (Red-600) | Emergency Notdienst button, severity indicators, pulsing dot |
| **Success** | Verified / Positive | `#10B981` (Emerald-500) | Checkmarks, verified badges, success states |
| **Neutral** | Backgrounds / Text | `#F8FAFC` (Slate-50) / `#1E293B` (Slate-800) | Page background, card surfaces, body text |

### CSS Custom Properties

```css
:root {
  /* Core Brand */
  --primary: oklch(0.33 0.07 250);           /* Navy Blue #1E3A5F */
  --primary-foreground: oklch(0.98 0 0);     /* White text on primary */
  
  /* CTA Orange */
  --secondary: oklch(0.70 0.18 45);          /* Orange #F97316 */
  --secondary-foreground: oklch(0.98 0 0);   /* White text on orange */
  
  /* Emergency Red */
  --destructive: oklch(0.53 0.22 27);        /* Red #DC2626 */
  --destructive-foreground: oklch(0.98 0 0); /* White text on red */
  
  /* Success Green */
  --success: oklch(0.62 0.17 160);           /* Emerald #10B981 */
  --success-foreground: oklch(0.98 0 0);     /* White text on green */
  
  /* Neutrals */
  --background: oklch(0.98 0.01 250);        /* Slate-50 #F8FAFC */
  --foreground: oklch(0.20 0.02 250);        /* Slate-800 #1E293B */
  --muted: oklch(0.93 0.01 250);             /* Slate-200 */
  --muted-foreground: oklch(0.45 0.02 250);  /* Slate-500 */
  --card: oklch(1 0 0);                      /* White cards */
  --card-foreground: oklch(0.20 0.02 250);   /* Dark text on cards */
  --border: oklch(0.88 0.01 250);            /* Slate-300 */
  
  /* Radius */
  --radius: 1rem;                            /* rounded-2xl base */
}
```

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | Inter | 700 (Bold) | 2.5rem - 4rem |
| Body | Inter | 400 (Regular) | 1rem - 1.125rem |
| Buttons | Inter | 600 (Semibold) | 1rem |
| Badges | Inter | 500 (Medium) | 0.875rem |

---

## CTA Placement Strategy (Minimum 3)

### CTA #1: Hero Section
- **Type:** Primary CTA within Diagnostic Funnel
- **Text:** "Get Free Estimate" / "Kostenlose Schätzung"
- **Style:** `bg-secondary text-secondary-foreground` (Orange)
- **Position:** End of Step 4 in diagnostic flow

### CTA #2: Floating Header
- **Type:** Emergency CTA (always visible)
- **Text:** "Emergency Notdienst" with pulsing red dot
- **Style:** `bg-destructive text-destructive-foreground` (Red)
- **Position:** Fixed header, top-right

### CTA #3: After Before/After Gallery
- **Type:** Secondary conversion point
- **Text:** "Start Your Diagnosis" / "Diagnose starten"
- **Style:** `bg-secondary text-secondary-foreground` (Orange)
- **Position:** Below gallery section

### CTA #4: Pricing Section
- **Type:** Plan selection CTAs
- **Text:** "Choose Plan" / "Plan wählen"
- **Style:** `bg-primary text-primary-foreground` (Navy) for standard, `bg-secondary` for highlighted tier
- **Position:** Each pricing card

### CTA #5: Footer
- **Type:** Final conversion anchor
- **Text:** "Get Started Now" / "Jetzt starten"
- **Style:** `bg-secondary text-secondary-foreground` (Orange)
- **Position:** Above footer credits

---

## Page Structure

```
┌─────────────────────────────────────────────────────────┐
│ HEADER (Fixed)                                          │
│ [Logo] [Language Toggle: EN/DE] [Emergency CTA - Red]   │
├─────────────────────────────────────────────────────────┤
│ HERO: AI DIAGNOSTIC FUNNEL                              │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Step 1: Upload Image (Drag & Drop)                  │ │
│ │ Step 2: Select Issue Category                       │ │
│ │ Step 3: Severity Slider                             │ │
│ │ Step 4: Contact Info → [GET ESTIMATE CTA]           │ │
│ │ Success Overlay: "Technician reviewing..."          │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ BEFORE/AFTER GALLERY                                    │
│ [Draggable comparison sliders]                          │
│ [START YOUR DIAGNOSIS CTA]                              │
├─────────────────────────────────────────────────────────┤
│ SOCIAL PROOF / TESTIMONIALS                             │
│ [Video thumbnails] [Star ratings] [Review count]        │
├─────────────────────────────────────────────────────────┤
│ OBJECTION REMOVAL                                       │
│ [Trust badges] [Certifications] [Response time stats]   │
├─────────────────────────────────────────────────────────┤
│ PRICING TIERS                                           │
│ [Basic] [Standard] [Premium]                            │
│ [CHOOSE PLAN CTAs]                                      │
├─────────────────────────────────────────────────────────┤
│ AEO FAQ (Answer Engine Optimized)                       │
│ [Accordion-style Q&A in both languages]                 │
├─────────────────────────────────────────────────────────┤
│ FOOTER                                                  │
│ [GET STARTED NOW CTA]                                   │
│ [Contact] [Legal] [Social Links]                        │
└─────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. Header Component
- Fixed position, glassmorphism background
- Logo (left)
- Language toggle (center-right)
- Emergency button with pulsing animation (right)

### 2. DiagnosticFunnel Component
- Multi-step form with progress indicator
- ImageUploader (drag-drop, client-side preview only)
- IssueSelector (category cards)
- SeveritySlider (1-5 scale with color gradient)
- ContactForm (name, phone, email)
- SuccessOverlay (countdown timer)

### 3. BeforeAfterGallery Component
- Image comparison slider (react-compare-image or custom)
- Project cards with descriptions

### 4. TestimonialsSection Component
- Video thumbnail grid (opens modal)
- Star rating component
- Review count badge

### 5. TrustBadges Component
- Certification icons
- Response time stats
- Insurance/license badges

### 6. PricingTiers Component
- 3-column card layout
- Feature comparison list
- Highlighted "popular" tier

### 7. FAQAccordion Component
- Collapsible Q&A
- Schema.org FAQ markup for SEO/AEO

### 8. Footer Component
- Final CTA
- Contact information
- Legal links
- Social media icons

---

## Internationalization (i18n)

### Implementation Approach
- Use `next-intl` or custom context provider
- Store preference in `localStorage`
- Default: Browser language detection

### Translation Keys Structure
```typescript
{
  header: {
    emergency: { en: "Emergency Notdienst", de: "Notdienst 24/7" }
  },
  hero: {
    title: { en: "AI-Powered Plumbing Diagnosis", de: "KI-gestützte Sanitär-Diagnose" },
    cta: { en: "Get Free Estimate", de: "Kostenlose Schätzung" }
  },
  // ... etc
}
```

---

## AI Diagnostic Logic (Rule-Based Mock)

```typescript
function calculateEstimate(category: string, severity: number): EstimateRange {
  const baseRates = {
    leaking: { min: 80, max: 150 },
    clogged: { min: 60, max: 120 },
    broken: { min: 150, max: 300 },
    installation: { min: 200, max: 500 }
  };
  
  const multiplier = 1 + (severity - 1) * 0.25; // 1x to 2x based on severity
  const base = baseRates[category];
  
  return {
    min: Math.round(base.min * multiplier),
    max: Math.round(base.max * multiplier),
    currency: "EUR"
  };
}
```

---

## Technical Specifications

### Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** Framer Motion
- **i18n:** Custom context or next-intl
- **Form Handling:** React Hook Form + Zod

### Performance Targets
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Cumulative Layout Shift: < 0.1

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation for all interactive elements
- Screen reader announcements for form steps
- Reduced motion support

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Update globals.css with design tokens
- [ ] Create Header component with language toggle
- [ ] Set up i18n context/provider

### Phase 2: Hero & Diagnostic
- [ ] Build DiagnosticFunnel multi-step form
- [ ] Implement ImageUploader with preview
- [ ] Create SeveritySlider component
- [ ] Add estimate calculation logic
- [ ] Build SuccessOverlay with countdown

### Phase 3: Social Proof
- [ ] Create BeforeAfterGallery with slider
- [ ] Build TestimonialsSection with video modal
- [ ] Add TrustBadges component

### Phase 4: Conversion
- [ ] Build PricingTiers component
- [ ] Create FAQAccordion with schema markup
- [ ] Implement Footer with final CTA

### Phase 5: Polish
- [ ] Add Framer Motion animations
- [ ] Mobile responsiveness pass
- [ ] Accessibility audit
- [ ] Performance optimization

---

## File Structure

```
app/
├── globals.css          # Updated design tokens
├── layout.tsx           # Root layout with fonts
├── page.tsx             # Main landing page
├── context/
│   └── language-context.tsx
├── lib/
│   └── translations.ts  # i18n strings
components/
├── header.tsx
├── diagnostic-funnel/
│   ├── index.tsx
│   ├── image-uploader.tsx
│   ├── issue-selector.tsx
│   ├── severity-slider.tsx
│   ├── contact-form.tsx
│   └── success-overlay.tsx
├── before-after-gallery.tsx
├── testimonials-section.tsx
├── trust-badges.tsx
├── pricing-tiers.tsx
├── faq-accordion.tsx
└── footer.tsx
```

---

## Ready to Build

This document provides all specifications needed to begin implementation. Start with Phase 1 (Foundation) to establish the design system, then proceed sequentially through each phase.
