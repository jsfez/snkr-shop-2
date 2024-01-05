import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import './globals.css';

import { CartProvider } from '@/components/CartContext';
import { MainNav } from '@/components/MainNav';
import { Toaster } from '@/components/ui/sonner';
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
          'mx-auto flex min-h-screen w-full flex-col bg-background px-6 font-sans antialiased',
          fontSans.variable,
        )}
      >
        <CartProvider>
          <MainNav />
          <div>{children}</div>
          <Toaster position="top-center" visibleToasts={1} />
        </CartProvider>
      </body>
    </html>
  );
}
