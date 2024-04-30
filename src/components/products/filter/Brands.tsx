import { trpc } from '@/trpc/client';
import ItemFilter from './Item';
import BarLoader from "react-spinners/BarLoader";
import { cn, createURLQueries } from '@/lib/utils';
import Link from 'next/link';

interface Props{
  query: string;
  brand: undefined | string;
};

export default function BrandsFilters({query, brand}: Props) {
  const { status, data: brands } = trpc.brands.useQuery();

  return (
    <ItemFilter label="Brands" using={brand ? true : false}>
      { status !== 'success' ?
        <div className="flex-center w-20 h-14 p-4">
          <BarLoader color="#030712" height={3} />
        </div>
        :
        <ul className="flex flex-col max-h-32 h-auto py-2 overflow-y-auto">
          { brands?.map(({name}, i) => {
            const actived = brand === name;

            return(
              <li className="" key={i}>
                <Link
                  className={cn('px-3 py-2 w-36 flex text-xs font-semibold truncate uppercase hover:bg-gray-100 transition-all', {
                  'bg-gray-200 hover:bg-gray-200': actived 
                  })}
                  href={ createURLQueries(query, { brand: actived ? undefined : name }) }>

                  {name}
                </Link>
              </li>
            )
          }) }
        </ul>
      }
    </ItemFilter>
  );
};
