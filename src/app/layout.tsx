import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PublicEnvScript } from 'next-runtime-env';

import './globals.css';
import type { ReactNode } from 'react';

const getFont = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HR',
  description: 'HR Description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <PublicEnvScript />
      </head>
      <body className={`${getFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
