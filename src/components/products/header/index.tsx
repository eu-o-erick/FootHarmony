import { trpc } from '@/trpc/client';
import TitleProducts from './Title';
import BreadcrumbProducts from './Breadcrumb';
import OptionsHeader from './Options';

interface Props {
  queries: {
    [x: string]: string;
  };
  toggleFilter: () => void;
  isFilterOpen: boolean;
};



export default function HeaderProducts({queries, toggleFilter, isFilterOpen}: Props) {
  const { status, data: offers } = trpc.offers.useQuery();


  return (
    <header className='relative flex flex-col items-start max-w-[1448px] w-full mx-auto mt-10 px-14 max-lg:px-6 max-sm:px-2'>
      <BreadcrumbProducts />
      <TitleProducts queries={queries} offers={offers} />
      <OptionsHeader status={status} offers={offers} queries={queries} toggleFilter={toggleFilter} isFilterOpen={isFilterOpen} />
    </header>
  );
}
