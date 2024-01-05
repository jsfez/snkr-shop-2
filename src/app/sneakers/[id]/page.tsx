'use client';

import products from '@/assets/data.json';
import { Main } from '@/components/Main';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

type Sneakers = (typeof products)[0];

const DetailCard = ({
  sneakers: {
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
  const gender = genders?.[0];

  return (
    <Main>
      <Card className="shadow-xl w-3/4 md:max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3 py-10 px-5">
          <div className="flex flex-col justify-between flex-1">
            <Image
              src={img}
              width={350}
              height={350}
              alt="sneakers-preview"
              className="mx-auto md:h-[350px] md:w-[350px] object-cover"
            />

            <div>
              <div className="uppercase text-sm mb-1">choose size</div>
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
                      disabled={[6, 8, 9].includes(value)}
                      className="w-10 h-10"
                    >
                      {value}
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </div>
          </div>

          <div className="flex-1">
            <div className="uppercase text-muted-foreground text-sm">
              {gender}&apos;s {brand}
            </div>
            <h1 className="uppercase text-2xl font-semibold">{name}</h1>
            <h3 className="text-2xl font-semibold mb-7">${price}</h3>
            <small className="text-black text-sm">{description}</small>

            <div className="flex gap-1 mt-8">
              <Button size="icon" className="h-11">
                <Heart />
              </Button>
              <Button size="lg" className="uppercase">
                add to cart
              </Button>
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
