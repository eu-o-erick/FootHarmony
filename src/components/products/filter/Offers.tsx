import { trpc } from '@/trpc/client';
import ItemFilter from './Item';
import BarLoader from "react-spinners/BarLoader";
import { cn, createURLQueries } from '@/lib/utils';
import Link from 'next/link';

interface Props{
  query: string;
  offer: undefined | string;
};

export default function OffersFilter({query, offer}: Props) {
  const { status, data: offers } = trpc.offers.useQuery();

  return (
    <ItemFilter label="Offers" using={offer ? true : false} classNames="lg:hidden">
      { status !== 'success' ?
        <div className="flex-center w-20 h-14 p-4">
          <BarLoader color="#030712" height={3} />
        </div>
        :
        <ul className="flex flex-col max-h-32 h-auto py-2 overflow-y-auto">
          { offers?.map(({name, id}, i) => {
            const actived = id === offer;

            return(
              <li key={i}>
                <Link
                  className={cn('px-3 py-2 w-40 flex text-xs font-semibold truncate uppercase hover:bg-gray-100 transition-all', {
                  'bg-gray-200 hover:bg-gray-200': actived 
                  })}
                  href={ createURLQueries(query, { offer: actived ? undefined : id }) }>

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
