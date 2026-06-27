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
    default: 'VPPCONSTRUCT LTD',
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
  keywords: [
    'builders edgware',
    'construction company london',
    'renovations edgware',
    'general building services',
    'vppconstruct ltd',
    'edgware builders',
  ],
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: '/',
    siteName,
    title: 'VPPCONSTRUCT LTD',
    description: siteDescription,
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VPPCONSTRUCT LTD',
    description: siteDescription,
    images: ['/placeholder.jpg'],
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
    { media: '(prefers-color-scheme: light)', color: '#f3eee6' },
    { media: '(prefers-color-scheme: dark)', color: '#111417' },
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
          '@id': `${getSiteUrl()}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${getSiteUrl()}/#organization`,
        name: siteName,
        url: getSiteUrl(),
        image: absoluteUrl('/placeholder.jpg'),
        description: siteDescription,
        areaServed: 'Edgware, London',
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
