import { Queries } from '@/app/products/page';
import SearchNavbar from '@/components/navbar/icons/search';
import { cn, createURLQueries } from '@/lib/utils';
import { Offer } from '@/payload-types';
import { Filter } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Props {
  offers: Offer[] | undefined | null;
  status: "error" | "success" | "loading";
  isFilterOpen: boolean;
  toggleFilter: () => void;
  queries: Queries;
};



export default function OptionsHeader({status, offers, isFilterOpen, toggleFilter, queries}: Props) {
  const { genere, offer } = queries;

  const searchParams = useSearchParams();

  const query = searchParams.toString();


  return (
    <nav className='relative flex justify-between items-end gap-7 border-b-2 border-gray-950 w-full bg-gray-50 z-[49]'>

      <ul className='flex'>

        { ['men', 'women', 'unisex'].map((item, i) => {
          const actived = item === genere;

          return (
            <li key={i}>
              <Link href={createURLQueries(query, { genere: actived ? undefined : item })} className={
                cn('relative flex-center px-4 h-10 text-gray-800 hover:text-gray-800 hover:bg-gray-100 group transition-all', {
                  'mr-8': i === 2,
                  'bg-gray-950 hover:bg-gray-950': actived
                })}>

                <span className={cn("font-semibold uppercase", {
                  'text-gray-200': actived
                })}>
                  {item}
                </span>

              </Link>
            </li>
          )}
        )}


        { status === 'success' && offers?.map(({id, name}, i) => {
          const actived = id === offer;

          return (
            <li key={i}>
              <Link href={createURLQueries(query, { offer: actived ? undefined : id })} className={
                cn('relative flex-center px-4 h-10 text-gray-800 hover:text-gray-800 hover:bg-gray-100 group transition-all', {
                  'mr-8': i === 2,
                  'bg-gray-950 hover:bg-gray-950': actived
                })}>

                <span className={cn("font-semibold uppercase", {
                  'text-gray-200': actived
                })}>
                  {name}
                </span>

              </Link>
            </li>
          )}
        )}
      
      </ul>

      <div className="flex-center">
        <SearchNavbar className='w-10 h-10 p-2 !opacity-100 bg-gray-100 !scale-100' />

        <button className={
          cn('relative px-4 h-10 flex-center gap-2 hover:text-gray-800 hover:bg-gray-100 transition-all', {
            'bg-gray-950 hover:bg-gray-950': isFilterOpen
          })}
          onClick={toggleFilter}>
          
          <Filter className={cn("w-4 h-4 mt-px -mb-px", {
            'text-gray-200': isFilterOpen
          })} />

          <span className={cn("font-semibold uppercase", {
            'text-gray-200': isFilterOpen
          })}>
            FILTERS
          </span>

        </button>
      </div>

    </nav>
  );
};
