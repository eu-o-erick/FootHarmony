import { trpc } from '@/trpc/client';
import TitleProducts from './Title';
import BreadcrumbProducts from './Breadcrumb';
import OptionsHeader from './Options';
import BreadcrumbComponent, { BreadCrumbElement } from '@/components/breadcrumb';

interface Props {
  queries: {
    [x: string]: string;
  };
  toggleFilter: () => void;
  isFilterOpen: boolean;
};


export default function HeaderProducts({queries, toggleFilter, isFilterOpen}: Props) {
  const { status, data: offers } = trpc.offers.useQuery();

  const breadcrumbElements: BreadCrumbElement[] = ( () => {

    const arr: BreadCrumbElement[] = [
      {
        label: 'home',
        href: '/'
      },{
        label: 'products',
        href: '/products'
      }      
    ];

    if(queries.brand) {
      arr.push({
        label: queries.brand.replaceAll('+', ' ')
      });

    };

    return arr;
  })();
  
  

  return (
    <header className='relative flex flex-col items-start max-w-[1448px] w-full mx-auto mt-10 px-14 max-lg:px-6 max-sm:px-2'>
      <BreadcrumbComponent elements={breadcrumbElements} />
      <TitleProducts queries={queries} offers={offers} />
      <OptionsHeader status={status} offers={offers} queries={queries} toggleFilter={toggleFilter} isFilterOpen={isFilterOpen} />
    </header>
  );
}
