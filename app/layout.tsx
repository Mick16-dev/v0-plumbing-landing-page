import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from './context/language-context'
import './globals.css'

const bricolage = Bricolage_Grotesque({ 
  subsets: ["latin"], 
  variable: '--font-heading',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#1E3A5F',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Rohr-Blitz | Master Expert Plumbing Diagnosis & Repair',
  description: 'Experience the future of home maintenance. Instant visual diagnosis, 24/7 premium emergency service, and transparent estimates in seconds with Rohr-Blitz Master Technicians.',
  keywords: ['plumbing', 'master diagnosis', 'emergency plumber', 'Germany', 'home repair', 'Rohr-Blitz', 'leak detection', 'clogged drain repair', 'pipe burst service', 'Meisterbetrieb'],
  authors: [{ name: 'Rohr-Blitz' }],
  openGraph: {
    title: 'Rohr-Blitz | Expert Master Plumbing',
    description: 'Instant visual plumbing diagnosis and expert repair service. Available 24/7.',
    type: 'website',
    locale: 'de_DE',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PlumbingService",
  "name": "Rohr-Blitz",
  "image": "https://rohr-blitz.de/og-image.jpg",
  "@id": "https://rohr-blitz.de",
  "url": "https://rohr-blitz.de",
  "telephone": "+49123456789",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Musterstraße 1",
    "addressLocality": "Berlin",
    "postalCode": "10115",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 52.5200,
    "longitude": 13.4050
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "areaServed": [
    { "@type": "City", "name": "Berlin" },
    { "@type": "City", "name": "Munich" },
    { "@type": "City", "name": "Hamburg" },
    { "@type": "City", "name": "Frankfurt" },
    { "@type": "City", "name": "Cologne" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Plumbing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Emergency Leak Repair"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pipe Diagnostic Analysis"
        }
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${bricolage.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased selection:bg-secondary/30 selection:text-secondary-foreground overflow-x-hidden">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
