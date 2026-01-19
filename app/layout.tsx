import type { Metadata, Viewport } from "next";
import { Nunito, Rhodium_Libre, Metrophobic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "@/styles/general.css";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Don't cache

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
  preload: true,
});

const rhodiumLibre = Rhodium_Libre({
  variable: "--font-rhodium-libre",
  subsets: ["latin"],
  weight: ["400"],
  display: 'swap',
  preload: true,
});

const metrophobic = Metrophobic({
  variable: "--font-metrophobic",
  subsets: ["latin"],
  weight: ["400"],
  display: 'swap',
  preload: true,
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#DC0000' },
    { media: '(prefers-color-scheme: dark)', color: '#050E3C' }
  ],
  colorScheme: 'dark',
};

// Metadata configuration
export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: 'Cafa Ticket - Event Ticketing Platform',
    template: '%s | Cafa Ticket'
  },
  description: 'Discover and book tickets for concerts, festivals, sports events, conferences, and more. Seamless event ticketing platform for organizers and attendees worldwide.',
  keywords: [
    'event tickets',
    'concert tickets',
    'festival tickets',
    'sports events',
    'event management',
    'ticket booking',
    'event platform',
    'live events',
    'entertainment tickets',
    'event organizer',
    'online ticketing',
    'event registration',
    'ticket sales',
    'event discovery'
  ],
  authors: [{ name: 'Cafa Ticket Team' }],
  creator: 'Cafa Ticket',
  publisher: 'Cafa Ticket',
  
  // Application name
  applicationName: 'Cafa Ticket',
  
  // Referrer policy
  referrer: 'origin-when-cross-origin',
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.cafaticket.com',
    siteName: 'Cafa Ticket',
    title: 'Cafa Ticket - Event Ticketing Platform',
    description: 'Discover and book tickets for concerts, festivals, sports events, conferences, and more. Seamless event ticketing platform worldwide.',
    images: [
      {
        url: 'https://www.cafaticket.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cafa Ticket - Event Ticketing Platform',
        type: 'image/png',
      }
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@cafaticket',
    creator: '@cafaticket',
    title: 'Cafa Ticket - Event Ticketing Platform',
    description: 'Discover and book tickets for concerts, festivals, sports events, conferences, and more worldwide.',
    images: ['https://www.cafaticket.com/twitter-image.png'],
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/safari-pinned-tab.svg',
        color: '#DC0000',
      },
    ],
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // App links
  appLinks: {
    web: {
      url: 'https://www.cafaticket.com',
      should_fallback: true,
    },
  },
  
  // Other
  category: 'entertainment',
  classification: 'Event Ticketing Platform',
  
  // Alternate languages (for future internationalization)
  alternates: {
    canonical: 'https://www.cafaticket.com',
    languages: {
      'en-US': 'https://www.cafaticket.com',
      'en-GB': 'https://www.cafaticket.com/en-gb',
      'fr-FR': 'https://www.cafaticket.com/fr',
      'es-ES': 'https://www.cafaticket.com/es',
    },
  },
  
  // Other metadata
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Cafa Ticket',
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Additional meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Cafa Ticket" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Cafa Ticket',
              url: 'https://www.cafaticket.com',
              logo: 'https://www.cafaticket.com/logo.png',
              description: 'Event ticketing platform for discovering and booking tickets worldwide',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@cafaticket.com',
                contactType: 'Customer Support',
                availableLanguage: ['English']
              }
            })
          }}
        />
      </head>
      <body
        className={`${nunito.variable} ${rhodiumLibre.variable} ${metrophobic.variable} antialiased`}
      >
        <Analytics />
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}