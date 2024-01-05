import products from '@/assets/data.json';
import { Main } from '@/components/Main';
import { ProductCard } from '@/components/ProductCard';

export default function SneakersList() {
  return (
    <Main>
      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </Main>
  );
}
