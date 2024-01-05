'use client';

import products from '@/assets/data.json';
import { useCart } from '@/components/CartContext';
import { Main } from '@/components/Main';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sneakers } from '@/lib/types';
import { cn } from '@/lib/utils';
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
      <Card className="relative mx-auto w-3/4 shadow-xl md:max-w-4xl">
        <Button className="absolute left-0 top-2" variant="link" asChild>
          <Link href="/sneakers">
            <ChevronLeft className="size-4" /> Return
          </Link>
        </Button>
        <div className="flex flex-col gap-6 px-5 py-10 md:flex-row">
          <div className="flex flex-1 flex-col justify-between">
            <Image
              src={img}
              width={350}
              height={350}
              alt="sneakers-preview"
              className="mx-auto object-cover"
            />
            <div>
              <div
                className={cn(
                  'mb-1 text-sm',
                  missingSize && 'text-destructive',
                )}
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
          </div>

          <div className="flex flex-1 flex-col">
            <div className="text-sm uppercase text-muted-foreground">
              {gender}&apos;s {brand}
            </div>
            <h1 className="text-2xl font-semibold uppercase">{name}</h1>
            <div className="mt-7 flex-1 text-sm text-black">{description}</div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <div className="flex gap-1">
                {itemFromCart ? (
                  <Button
                    size="lg"
                    className="uppercase"
                    variant="destructive"
                    onClick={() => handleRemoveFromCart(id)}
                  >
                    remove item
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="uppercase"
                    onClick={() => handleAddToCart(id)}
                  >
                    add to cart
                  </Button>
                )}
                <Button size="icon" className="h-11">
                  <Heart />
                </Button>
              </div>
              <div className="text-2xl font-semibold">${price}</div>
            </div>
          </div>
        </div>
      </Card>
    </Main>
  );
};

export default function SneakersDetail() {
  const { id } = useParams();
  const sneakers = products.find((item) => item.id === Number(id));

  if (!sneakers) {
    return <div>Not Found</div>;
  }

  return <DetailCard sneakers={sneakers} />;
}
