'use client';

import { cn, twx } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

type NavItemProps = LinkProps & {
  children: React.ReactNode;
  $active?: boolean;
  className?: string;
};

const NavItem = ({ className, $active, ...props }: NavItemProps) => {
  return (
    <Link
      className={cn(
        'font-medium transition-colors hover:text-foreground/80',
        $active ? 'text-foreground' : 'text-foreground/60',
        className,
      )}
      {...props}
    />
  );
};

export const MainNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex h-10 max-w-full items-center justify-between gap-10 overflow-auto">
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
        </NavItem>
      </div>
    </nav>
  );
};
