import products from '@/assets/data.json';
import { Main } from '@/components/Main';
import { ProductCard } from '@/components/ProductCard';

export default function Cart() {
  return (
    <Main>
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </Main>
  );
}
