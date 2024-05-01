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
  queries: {
    [x: string]: string;
  };
};



export default function OptionsHeader({status, offers, isFilterOpen, toggleFilter, queries}: Props) {
  const { genere, offer, search } = queries;

  const searchParams = useSearchParams();

  const query = searchParams.toString();


  return (
    <nav className='relative flex justify-between border-b-2 border-gray-950 w-full bg-gray-50 z-[49]'>

      <ul className='flex max-[500px]:hidden'>

        { ['men', 'women', 'unisex'].map((item, i) => {
          const actived = item === genere;

          return (
            <li key={i}>
              <Link href={createURLQueries(query, { genere: actived ? undefined : item })} className={
                cn('relative flex-center px-4 h-10 text-gray-800 hover:text-gray-800 hover:bg-gray-100 group transition-all max-lg:h-8 max-lg:text-sm', {
                  'mr-8 max-lg:mr-4': i === 2,
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
            <li key={i} className='max-lg:hidden'>
              <Link href={createURLQueries(query, { offer: actived ? undefined : id })} className={
                cn('relative flex-center px-4 h-10 text-gray-800 hover:text-gray-800 hover:bg-gray-100 group transition-all max-lg:h-8 max-lg:text-sm', {
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

      <div className="flex-center max-[500px]:w-full max-[500px]:justify-between">
        <SearchNavbar className={cn('w-10 h-10 p-2 !opacity-100 bg-gray-100 !scale-100 max-lg:h-8 max-lg:w-8', {
          'max-[500px]:bg-gray-950 max-[500px]:!text-gray-200 ': search
        })} />

        <button className={
          cn('relative px-4 h-10 flex-center gap-2 hover:text-gray-800 hover:bg-gray-100 transition-all max-lg:h-8 max-[500px]:bg-gray-100', {
            '!bg-gray-950 hover:!bg-gray-950': isFilterOpen
          })}
          onClick={toggleFilter}>
          
          <Filter className={cn("w-4 h-4 mt-px -mb-px max-lg:w-3 max-lg:h-3", {
            'text-gray-200': isFilterOpen
          })} />

          <span className={cn("font-semibold uppercase max-lg:text-sm", {
            'text-gray-200': isFilterOpen
          })}>
            FILTERS
          </span>

        </button>
      </div>

    </nav>
  );
};
