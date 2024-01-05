'use client';

import products from '@/assets/data.json';
import { CartCard } from '@/components/CartCard';
import { useCart } from '@/components/CartContext';
import { Main } from '@/components/Main';
import { Button } from '@/components/ui/button';
import { CartItem, CartState } from '@/lib/types';
import { Badge, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const EmptyCart = () => (
  <div className="mx-auto flex w-fit flex-col items-center">
    <h1 className="text-4xl font-semibold md:text-6xl">Cart is Empty !!</h1>
    <Button size="lg" asChild className="mt-10 self-center">
      <Link href="/sneakers">Shop Now</Link>
    </Button>
  </div>
);

const CheckoutCard = ({ cart }: { cart: CartState }) => {
  const total = cart.items.reduce(
    (acc, item) =>
      acc + (products.find((product) => product.id === item.id)?.price || 0),
    0,
  );

  function checkout() {
    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: 'Sonner' }), 2500),
      );

    toast.promise(promise, {
      loading: 'Checking out...',
      success: () => {
        cart.checkout();
        return (
          <div className="flex items-center gap-2">
            <BadgeCheck className="size-4 text-green-500" />
            <div className="font-medium">Checkout successful!</div>
          </div>
        );
      },
      error: 'Error',
    });
  }

  return (
    <div className="relative mt-10 flex-1">
      <div className="sticky top-10 flex min-h-0 flex-col">
        <div className="text-xl font-bold text-slate-300 md:text-4xl">
          TOTAL ITEMS : {cart.itemCount}
        </div>
        <div className="text-xl font-bold text-slate-500 md:text-5xl">
          TOTAL PRICE : ${total}
        </div>
        <Button size="lg" className="mt-10" onClick={checkout}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default function ProductList() {
  const cart = useCart();

  return (
    <Main>
      <div className="flex flex-col gap-6 lg:flex-row">
        {cart.empty ? (
          <EmptyCart />
        ) : (
          <>
            <div className="flex flex-1 flex-col gap-6">
              {cart.items.map((item) => (
                <CartCard
                  key={item.id}
                  item={item}
                  onRemove={(id) => cart.removeItem(id)}
                />
              ))}
            </div>
            <CheckoutCard cart={cart} />
          </>
        )}
      </div>
    </Main>
  );
}
