import { trpc } from '@/trpc/client';
import ItemFilter from './Item';
import BarLoader from "react-spinners/BarLoader";
import { cn, createURLQueries } from '@/lib/utils';
import Link from 'next/link';

interface Props{
  query: string;
  category: undefined | string;
};

export default function CategoriesFilter({query, category}: Props) {
  const { status, data: categories } = trpc.category.useQuery();

  return (
    <ItemFilter label="Category">
      { status !== 'success' ?
        <div className="flex-center w-20 h-14 p-4">
          <BarLoader color="#030712" height={3} />
        </div>
        :
        <ul className="flex flex-col max-h-32 h-auto overflow-y-auto overflow-x-hidden">
          { categories?.map(({name}, i) => {
            const actived = category === name;

            return(
              <li className="" key={i}>
                <Link
                  className={cn('p-2 w-36 flex text-xs font-semibold truncate uppercase', {
                  'bg-gray-400': actived 
                  })}
                  href={ createURLQueries(query, { category: actived ? undefined : name }) }>

                  {name}
                </Link>
              </li>
            )
          }) }
        </ul>
      }
    </ItemFilter>
  );
}
