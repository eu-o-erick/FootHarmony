import { cn, formatPrice } from '@/lib/utils';
import { Product, Variation } from '@/payload-types';

interface Props{
  product: Product;
  variation: Variation;
};


export default function Price({product, variation}: Props) {

  const priceDefault = variation?.standard_price ?? product.standard_price;
  const priceOffer = variation?.offer?.offer_price ?? product.offer?.offer_price;


  return (
    <div className='flex items-center gap-2 text-lg font-bold my-4'>
      { priceOffer && <span className="">{ formatPrice(priceOffer) }</span> }

      <span className={cn("", {
        'text-base text-gray-600 !line-through': priceOffer
      })}>
        { formatPrice(priceDefault) }
      </span>
    </div>
  );
};
