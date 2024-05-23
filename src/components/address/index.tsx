import { useCart } from '@/hooks/useCart';
import FormAddress from './form';
import SummaryAddress from './summary';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { trpc } from '@/trpc/client';
import useItemsCart from '@/hooks/useItemsCart';


export default function AddressContent() {
  const { items } = useCart();

  const query = useSearchParams().get('product');
  const json = useMemo(() => JSON.parse(query ?? '{}'), [query]);


  const { data, status } = trpc.products.useQuery({
    ids: json?.product ?
      json.product
     :
      items.map(item => item.productId).join(',')
  });


  const { itemsCart } = useItemsCart({json, products: data?.products});


  return (
    <div className="flex items-start justify-between mt-12">
      <FormAddress />

      <SummaryAddress itemsCart={itemsCart} status={status} />
    </div>
  );
};
