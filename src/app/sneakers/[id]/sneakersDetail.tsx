'use client';

import { useCart } from '@/components/CartContext';
import { Main } from '@/components/Main';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sneakers } from '@/lib/types';
import { cn, fetchProduct } from '@/lib/utils';
import {
  BadgeAlert,
  BadgeCheck,
  BadgeX,
  ChevronLeft,
  Heart,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const SizeToggleGroup = ({
  value,
  onValueChange,
  disabled = false,
  disabledSizes = [],
}: {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  disabledSizes: number[];
}) => (
  <ToggleGroup
    type="single"
    variant="outline"
    className="flex-wrap justify-start"
    value={value}
    onValueChange={onValueChange}
  >
    {Array.from({ length: 8 }, (_, i) => {
      const size = 5 + i;
      return (
        <ToggleGroupItem
          value={String(size)}
          key={size}
          disabled={disabled || disabledSizes.includes(size)}
          className="h-10 w-10"
        >
          {size}
        </ToggleGroupItem>
      );
    })}
  </ToggleGroup>
);

const DetailCard = ({
  sneakers: {
    id,
    original_picture_url: img,
    price,
    story_html: description,
    name,
    brand_name: brand,
    gender: genders,
  },
}: {
  sneakers: Sneakers;
}) => {
  const cart = useCart();
  const router = useRouter();
  const itemFromCart = cart.items.find((item) => item.id === id);
  const [size, setSize] = useState<number | null>(itemFromCart?.size ?? null);
  const [missingSize, setMissingSize] = useState<boolean>(false);
  const gender = genders?.[0];

  function handleAddToCart(id: number) {
    if (!size) {
      setMissingSize(true);
      toast.warning('Choose size before add to cart.', {
        icon: <BadgeAlert className="size-5 text-orange-500" />,
      });
      return;
    }

    setMissingSize(false);
    cart.addItem({ id, size });
    toast.success('Added to cart.', {
      icon: <BadgeCheck className="size-5 text-green-500" />,
      action: {
        label: 'Open Cart →',
        onClick: () => router.push('/cart'),
      },
    });
  }

  function handleRemoveFromCart(id: number) {
    setMissingSize(false);
    setSize(null);
    cart.removeItem(id);
    toast.error('Removed from cart.', {
      icon: <BadgeX className="size-5 text-destructive" />,
    });
  }

  return (
    <Main>
      <Card className="relative mx-auto shadow-xl">
        <Button className="absolute left-0 top-2" variant="link" asChild>
          <Link href="/sneakers">
            <ChevronLeft className="size-4" /> Return
          </Link>
        </Button>
        <div className="grid grid-cols-1 gap-x-6 px-5 py-10 md:grid-cols-2">
          <div className="flex h-[220px] items-center justify-center">
            <Image
              src={img}
              width={200}
              height={200}
              alt="sneakers-preview"
              className="-my-8 object-cover md:my-0"
            />
          </div>

          <div>
            <div className="text-sm uppercase text-muted-foreground">
              {gender}&apos;s {brand}
            </div>
            <h1 className="font-semibold uppercase md:text-2xl">{name}</h1>
            <div className="mt-3 line-clamp-4 flex-1 text-sm text-black md:mt-7 md:line-clamp-4">
              {description}
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <div
              className={cn('mb-1 text-sm', missingSize && 'text-destructive')}
            >
              CHOOSE SIZE
            </div>
            <SizeToggleGroup
              value={String(size ?? '')}
              onValueChange={(value) => setSize(Number(value))}
              disabledSizes={[6, 8, 9]}
              disabled={Boolean(itemFromCart)}
            />
          </div>

          <div className="mt-6 flex flex-wrap-reverse items-start justify-between gap-3 md:mt-0">
            <div className="flex gap-1">
              {itemFromCart ? (
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={() => handleRemoveFromCart(id)}
                >
                  REMOVE ITEM
                </Button>
              ) : (
                <Button size="lg" onClick={() => handleAddToCart(id)}>
                  ADD TO CART
                </Button>
              )}
              <Button size="icon" className="h-11">
                <Heart />
              </Button>
            </div>
            <div className="pb-2 text-right text-2xl font-semibold">
              ${price}
            </div>
          </div>
        </div>
      </Card>
    </Main>
  );
};

export default function SneakersDetail() {
  const { id } = useParams();
  const sneakers = fetchProduct(id as string);

  if (!sneakers) {
    return <div>Not Found</div>;
  }

  return <DetailCard sneakers={sneakers} />;
}
