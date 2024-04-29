import { Queries } from '@/app/products/page';
import CategoriesFilter from './Categories';
import { SlidersHorizontal } from 'lucide-react';
import BrandsFilters from './Brands';
import { cn } from '@/lib/utils';


interface Props{
  queries: Queries;
  query: string;
  isFilterOpen: boolean;
};

export default function Filter({queries, query, isFilterOpen}: Props) {

  return (
    <div className="w-full max-w-[1448px] mx-auto px-14">

      <div className={cn("border-b-2 flex items-center gap-5 px-5 h-14 transition-all", {
        'h-0 opacity-0': !isFilterOpen
      })}>
        <SlidersHorizontal className='text-gray-600 w-5 h-5 mr-3' />

        <CategoriesFilter query={query} category={queries.category} />
        <BrandsFilters />
      </div>
    </div>
  );
};
