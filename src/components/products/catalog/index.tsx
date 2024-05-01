import { trpc } from "@/trpc/client";
import { cn } from '@/lib/utils';
import CardProduct from '@/components/card_product';
import BeatLoader from 'react-spinners/BeatLoader';
import { SearchX } from 'lucide-react';
import Pagination from "./pagination";
import SkeletonCardProduct from "@/components/card_product/Skeleton";


interface Props{
  queries: {
    [x: string]: string;
  };
  query: string;
};


export default function CatalogProducts({query, queries}: Props) {
  const { status, data } = trpc.products.useQuery(queries);
  const { products, totalPages } = data ?? { products: undefined, totalPages: 0 };
  // mt-10 px-14 max-lg:px-6 max-sm:px-2

 
  return (
    <section className={`
      relative w-full flex-center flex-col max-w-[1448px] px-14 mx-auto overflow-x-hidden
      py-6 min-h-96 max-lg:px-6 max-sm:px-2 max-[500px]:px-1
    `}>

      { status === 'success' ?

        products?.length ?
          
          <ul className={cn(`
            w-full h-full grid gap-10 grid-cols-4 justify-items-center mt-10 max-[1448px]:gap-3
            max-lg:gap-5 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-5 max-sm:px-5 
            max-[500px]:px-0 max-[500px]:gap-x-1 max-[500px]:mt-4
          `)}>

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
          
        <ul className={cn(`
          w-full h-full grid gap-10 grid-cols-4 justify-items-center mt-10 max-[1448px]:gap-3
          max-lg:gap-5 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-5 max-sm:px-5 
          max-[500px]:px-0 max-[500px]:gap-x-1 max-[500px]:mt-4
        `)}>

          { [0,1,2,3].map((i) => (
            <SkeletonCardProduct key={i} />
          ))}
        </ul>
      }

      { totalPages > 1 && <Pagination query={query} page={queries.page} totalPages={totalPages} /> }

    </section>
  );
};
