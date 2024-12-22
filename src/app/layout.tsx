import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';

import MainLayout from '@/components/layouts/MainLayout';
import Providers from '@/components/providers';
import { Toaster } from 'react-hot-toast';
import localFont from 'next/font/local';
import './globals.css';

// Load the local font
const sfPro = localFont({
  src: [
    {
      path: '../../public/fonts/SF-Pro-Rounded-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Rounded-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Rounded-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sf-pro',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const APP_NAME = 'Social Agents';
const APP_DESCRIPTION = 'Solana Farcaster Client';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  openGraph: {
    images: [
      {
        url: '/api/og',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: [{ url: '/logos/152_152.png', sizes: '152x152' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#fff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="bg-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="white"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <MainLayout>{children}</MainLayout>
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
