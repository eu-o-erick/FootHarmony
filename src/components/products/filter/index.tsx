import CategoriesFilter from './Categories';
import { SlidersHorizontal } from 'lucide-react';
import BrandsFilters from './Brands';
import { cn } from '@/lib/utils';
import ColorsFilter from './Colors';
import PriceFilter from './Price';
import SortFilter from './Sort';
import SizeFilter from './Sizes';
import OffersFilter from './Offers';
import GeneresFilter from './Generes';


interface Props{
  queries: {
    [x: string]: string;
  };
  query: string;
  isFilterOpen: boolean;
};

export default function Filter({queries, query, isFilterOpen}: Props) {

  return (
    <div className="w-full max-w-[1448px] mx-auto px-14 max-lg:px-6 max-sm:px-2">

      <div className={cn(`
        relative border-b-2 flex justify-between py-4 px-5 transition-all max-md:px-1
        h-[64px] max-[858px]:h-[114px] max-[500px]:h-[364px]
      `, {
        '!h-0 py-0 opacity-0 transition-all': !isFilterOpen
      })}>
        <div className='flex' style={{width: 'calc(100% - 80px)' }}>
          <SlidersHorizontal className='text-gray-600 w-[30px] h-[30px] p-1.5 mr-4 max-[500px]:mr-2' />

          <div className="flex items-center flex-wrap gap-5 max-[500px]:flex-col max-[500px]:items-start max-[500px]:flex-nowrap">
            <GeneresFilter query={query} genere={queries.genere} />
            <BrandsFilters query={query} brand={queries.brand} />
            <CategoriesFilter query={query} category={queries.category} />
            <ColorsFilter query={query} color={queries.color} />
            <PriceFilter query={query} min_price={queries.min_price} max_price={queries.max_price} />
            <SizeFilter query={query} size={queries.size} />
            <OffersFilter query={query} offer={queries.offer} />
          </div>
        </div>

        <SortFilter query={query} sort={queries.sort} />
      </div>
    </div>
  );
};
