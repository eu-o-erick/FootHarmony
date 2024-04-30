
import { Product } from '@/payload-types';
import { cn } from '@/lib/utils';
import CardProduct from '@/components/card_product';
import BeatLoader from 'react-spinners/BeatLoader';
import { SearchX } from 'lucide-react';
import { Queries } from '@/app/products/page';


interface Props{
  products: Product[] | undefined;
  status: "success" | "error" | "loading";
  queries: Queries;
};


export default function CatalogProducts({status, products, queries}: Props) {
  
  return (
    <section className='relative w-full flex-center max-w-[1448px] px-14 mx-auto overflow-x-hidden flex py-6 min-h-96'>

      { status === 'success' ?

        products?.length ?
          <ul className={cn(`w-full h-full grid gap-y-10 grid-cols-5 justify-items-center
            max-lg:grid-cols-4`
          )}>
            { products.map((product, i) => (
              <CardProduct key={i} product={product} color={queries.color} offer={queries.offer} />
            ))}
          </ul>
          :
          <div className="flex-center flex-col gap-2">
            <SearchX className='w-20 h-20 text-gray-500' />
            <p className='text-gray-400 w-[448px] text-center text-sm font-bold'>
              Sorry, we couldn&apos;t find any sneakers matching your search. Please try
              a different keyword or check back later for updates!
            </p>
          </div>
        : 
        <BeatLoader color="#030712" size={20} />
      }

    </section>
  );
};
