import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BackToTop } from '@/components/back-to-top'
import {
  absoluteUrl,
  getSiteUrl,
  phoneInternational,
  primaryArea,
  serviceAreas,
  services,
  siteDescription,
  siteKeywords,
  siteName,
  siteTitle,
} from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteTitle,
    template: '%s | VPPCONSTRUCT LTD',
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: getSiteUrl() }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: '/',
  },
  keywords: siteKeywords,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/images/vppconstruct-hero.png',
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/images/vppconstruct-hero.png'],
  },
  category: 'construction',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3eee6' },
    { media: '(prefers-color-scheme: dark)', color: '#111417' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteUrl = getSiteUrl()
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: 'en-GB',
        publisher: {
          '@id': `${siteUrl}/#localbusiness`,
        },
      },
      {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
        '@id': `${siteUrl}/#localbusiness`,
        name: siteName,
        url: siteUrl,
        logo: absoluteUrl('/images/vpp-logo.jpg'),
        image: [
          absoluteUrl('/images/vppconstruct-hero.png'),
          absoluteUrl('/images/vppconstruct-extension.png'),
          absoluteUrl('/images/vppconstruct-interior.png'),
        ],
        description: siteDescription,
        telephone: phoneInternational,
        priceRange: '££',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Edgware',
          addressRegion: 'London',
          addressCountry: 'GB',
        },
        areaServed: serviceAreas.map((area) => ({
          '@type': 'Place',
          name: area,
        })),
        makesOffer: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service,
            areaServed: primaryArea,
          },
        })),
      },
    ],
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-background"
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <BackToTop />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  )
}
