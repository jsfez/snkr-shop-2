'use client';

import { useCart } from '@/components/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export type ProductCardProps = {
  id: number;
  nickname: string;
  story_html: string;
  price: number;
  original_picture_url: string;
};

export const ProductCard = ({
  product: {
    id,
    nickname,
    story_html: description,
    price,
    original_picture_url: img,
  },
}: {
  product: ProductCardProps;
}) => {
  const cart = useCart();
  const itemFromCart = cart.items.find((item) => item.id === id);

  return (
    <Card className="w-72 bg-background hover:shadow-2xl">
      <div className="flex h-[200px] items-center justify-center">
        <Image src={img} alt={nickname} width={150} height={150} />
      </div>
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
