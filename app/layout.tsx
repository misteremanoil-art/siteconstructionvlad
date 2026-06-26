import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BackToTop } from '@/components/back-to-top'
import { DonationPromptSlot } from '@/components/donation-prompt-slot'
import { absoluteUrl, getSiteUrl, siteDescription, siteName } from '@/lib/seo'
import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Albert-Beniamin Cucu • Blog personal',
    template: '%s — Albert-Beniamin Cucu',
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: getSiteUrl() }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: '/',
  },
  keywords: [
    'Albert-Beniamin Cucu',
    'teologie',
    'studiu biblic',
    'pastor adventist',
    'rugăciune',
    'credință',
    'articole creștine',
    'Apocalipsa',
  ],
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: '/',
    siteName,
    title: 'Albert-Beniamin Cucu • Blog personal',
    description: siteDescription,
    images: [
      {
        url: '/images/site-logo-gold.png',
        width: 1200,
        height: 1200,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Albert-Beniamin Cucu • Blog personal',
    description: siteDescription,
    images: ['/images/site-logo-gold.png'],
  },
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
    { media: '(prefers-color-scheme: light)', color: '#f4f3f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0e11' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${getSiteUrl()}/#website`,
        url: getSiteUrl(),
        name: siteName,
        description: siteDescription,
        inLanguage: 'ro-RO',
        publisher: {
          '@id': `${getSiteUrl()}/#person`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${absoluteUrl('/cautare')}?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Person',
        '@id': `${getSiteUrl()}/#person`,
        name: siteName,
        url: getSiteUrl(),
        image: absoluteUrl('/images/author.jpg'),
        jobTitle: 'Pastor, teolog și autor',
        worksFor: {
          '@type': 'Organization',
          name: 'Biserica Adventistă de Ziua a Șaptea',
        },
      },
    ],
  }

  return (
    <html
      lang="ro"
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
          <DonationPromptSlot />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
