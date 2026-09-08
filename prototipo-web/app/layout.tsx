import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Polyver · I-Citas',
  description:
    'La infraestructura urbana de encuentros que convierte compatibilidad, agenda y ciudad en citas presenciales reales.',
  applicationName: 'Polyver',
  icons: {
    icon: '/polyver-logo.jpeg',
    apple: '/polyver-logo.jpeg',
  },
  openGraph: {
    title: 'Polyver · La cita es el producto',
    description: 'Menos chat. Más vida real.',
    siteName: 'Polyver',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/og-polyver.png',
        width: 1728,
        height: 896,
        alt: 'Polyver · La cita es el producto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polyver · I-Citas',
    description: 'La forma inteligente de conocer el amor.',
    images: ['/og-polyver.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
