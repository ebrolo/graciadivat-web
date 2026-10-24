import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { LanguageProvider } from '@/context/LanguageContext';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://graciadivat.hu'),
  title: 'Grácia Divat | Exkluzív Női Ruhaszalon Nyíregyháza',
  description:
    'Nyíregyháza szívében, a Luther utcában várjuk a hölgyeket prémium estélyi, bál- és alkalmi ruhákkal, személyre szabott stílustanácsadással és 5 csillagos kiszolgálással.',
  keywords: [
    'Grácia Divat',
    'női ruha Nyíregyháza',
    'alkalmi ruha Nyíregyháza',
    'estélyi ruha',
    'báliruha',
    'szalagavató ruha',
    'Luther utca divat',
  ],
  authors: [{ name: 'Grácia Divat' }],
  openGraph: {
    title: 'Grácia Divat | Exkluzív Női Ruhaszalon Nyíregyháza',
    description:
      'Prémium estélyi, bál- és alkalmi ruhák Nyíregyházán, a Luther utcában. Kifinomult stílus és személyes tanácsadás.',
    url: 'https://graciadivat.hu',
    siteName: 'Grácia Divat',
    locale: 'hu_HU',
    type: 'website',
    images: [
      {
        url: '/images/hero/hero_look_01_black_satin.jpg',
        width: 1920,
        height: 1080,
        alt: 'Grácia Divat Nyíregyháza',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAF8F5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
