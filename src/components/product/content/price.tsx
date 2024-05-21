import { cn, formatPrice, getPriceOffer } from '@/lib/utils';
import { Product, Variation } from '@/payload-types';

interface Props{
  product: Product;
  variation: Variation;
  outOfStock: boolean;
};


export default function Price({product, variation, outOfStock}: Props) {

  const priceDefault = variation?.standard_price ?? product.standard_price;
  const priceOffer = getPriceOffer(variation, product);
  

  return (
    <div className={cn('flex items-center gap-2 text-xl', {
      'opacity-50': outOfStock
    })}>
      { (priceOffer && !outOfStock) && <span className="">{ formatPrice(priceOffer) }</span> }

      <span className={cn("", {
        'text-base text-gray-600 !line-through font-semibold': (priceOffer && !outOfStock)
      })}>
        { formatPrice(priceDefault) }
      </span>
    </div>
  );
};
