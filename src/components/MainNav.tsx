'use client';

import { cn, twx } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { useCart } from './CartContext';

type NavItemProps = LinkProps & {
  children: React.ReactNode;
  $active?: boolean;
  className?: string;
};

const NavItem = ({ className, $active, ...props }: NavItemProps) => {
  return (
    <Link
      className={cn(
        'relative font-medium transition-colors hover:text-foreground/80',
        $active ? 'text-foreground' : 'text-foreground/60',
        className,
      )}
      {...props}
    />
  );
};

export const MainNav = () => {
  const pathname = usePathname();
  const cart = useCart();

  return (
    <nav className="flex h-14 max-w-full items-center justify-between gap-10 overflow-auto pr-2">
      <Link href="/" className="flex shrink-0 items-center">
        <Image
          src="/images/logo.png"
          alt="snkr-shop-logo"
          height={50}
          width={50}
        />
        <div className="ml-2 text-center">
          <span className="text-2xl font-[1000]">SNKR.</span>
          <span className="text-sm font-extrabold">shop</span>
        </div>
      </Link>

      <div className="flex items-center gap-6 text-sm">
        <NavItem href="/" $active={pathname === '/'}>
          Home
        </NavItem>
        <NavItem href="/sneakers" $active={pathname === '/sneakers'}>
          Sneakers
        </NavItem>
        <NavItem href="/cart" $active={pathname?.startsWith('/cart')}>
          <ShoppingCart />
          <div className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-slate-500 text-xs font-bold text-white">
            {cart.itemCount}
          </div>
        </NavItem>
      </div>
    </nav>
  );
};
