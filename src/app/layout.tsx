import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import './globals.css';

import { MainNav } from '@/components/MainNav';
import { cn } from '@/lib/utils';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'SNKR shop',
  description: 'Buy the best sneakers in the world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col px-6 w-full mx-auto',
          fontSans.variable,
        )}
      >
        <MainNav />
        <div>{children}</div>
      </body>
    </html>
  );
}
