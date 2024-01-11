import products from '@/assets/data.json';
import { Main } from '@/components/Main';
import { ProductCard } from '@/components/ProductCard';

export default function SneakersList() {
  const productsShortList = products.slice(0, 20);

  return (
    <Main>
      <div className="flex flex-wrap justify-center gap-6">
        {productsShortList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Main>
  );
}
