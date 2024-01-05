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
}) => (
  <Link href={`/sneakers/${id}`}>
    <Card className="w-72 hover:shadow-2xl bg-transparent shadow-sm border border-slate-100 outline outline-slate-100 rounded-2xl">
      <Image
        src={img}
        alt={nickname}
        width={200}
        height={200}
        className="mx-auto"
      />
      <CardContent>
        <h3 className="text-lg text-mono font-semibold tracking-tight truncate">
          {nickname}
        </h3>
        <p className="leading-6 mt-1 line-clamp-4 text-ellipsis overflow-hidden">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <Button size="sm">Add to Cart</Button>
          <div className="text-xl font-semibold">${price}</div>
        </div>
      </CardFooter>
    </Card>
  </Link>
);
