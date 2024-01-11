import { fetchProduct } from '@/lib/utils';
import { Metadata, ResolvingMetadata } from 'next';

import SneakersDetail from './sneakersDetail';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const sneakers = fetchProduct(id);

  if (!sneakers) {
    return {
      title: 'Sneakers not found',
    };
  }

  return {
    title: `SNKR ${sneakers.nickname}`,
  };
}

export default function Page({ params }: Props) {
  return <SneakersDetail />;
}
