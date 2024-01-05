'use client';

import { useCart } from '@/components/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export const ProductCard = ({
  id,
  nickname,
  story_html: description,
  price,
  original_picture_url: img,
}: {
  id: number;
  nickname: string;
  story_html: string;
  price: number;
  original_picture_url: string;
}) => {
  const cart = useCart();
  const itemFromCart = cart.items.find((item) => item.id === id);

  return (
    <Card className="w-72 bg-background hover:shadow-2xl">
      <Image
        src={img}
        alt={nickname}
        width={200}
        height={200}
        className="mx-auto"
      />
      <CardContent>
        <h3 className="text-mono truncate text-lg font-semibold tracking-tight">
          {nickname}
        </h3>
        <p className="mt-1 line-clamp-4 overflow-hidden text-ellipsis leading-6">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <Link href={`/sneakers/${id}`}>
            <Button size="sm">Preview</Button>
          </Link>
          <div className="text-xl font-semibold">${price}</div>
        </div>
      </CardFooter>
    </Card>
  );
};
