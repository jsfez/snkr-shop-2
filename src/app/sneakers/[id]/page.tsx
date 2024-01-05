'use client';

import products from '@/assets/data.json';
import { useCart } from '@/components/CartContext';
import { Main } from '@/components/Main';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sneakers } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

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
  const itemFromCart = cart.items.find((item) => item.id === id);
  const [size, setSize] = useState<number | null>(null);
  const [missingSize, setMissingSize] = useState<boolean>(false);
  const gender = genders?.[0];

  console.log(cart.items);

  function handleAddToCart(id: number) {
    if (!size) {
      setMissingSize(true);
      return;
    }

    setMissingSize(false);
    cart.addItem({ id, size });
  }

  function handleRemoveFromCart(id: number) {
    setMissingSize(false);
    setSize(null);
    cart.removeItem(id);
  }

  return (
    <Main>
      <Card className="mx-auto w-3/4 shadow-xl md:max-w-4xl">
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
              <ToggleGroup
                type="single"
                variant="outline"
                className="flex-wrap justify-start"
              >
                {Array.from({ length: 8 }, (_, i) => {
                  const value = 5 + i;
                  return (
                    <ToggleGroupItem
                      value={`size-${value}`}
                      key={value}
                      disabled={
                        Boolean(itemFromCart) || [6, 8, 9].includes(value)
                      }
                      className="h-10 w-10"
                      onClick={() => {
                        setMissingSize(false);
                        setSize(value);
                      }}
                    >
                      {value}
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-sm uppercase text-muted-foreground">
              {gender}&apos;s {brand}
            </div>
            <h1 className="text-2xl font-semibold uppercase">{name}</h1>
            <h3 className="mb-7 text-2xl font-semibold">${price}</h3>
            <small className="text-sm text-black">{description}</small>

            <div className="mt-14 flex gap-1">
              <Button size="icon" className="h-11">
                <Heart />
              </Button>
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
