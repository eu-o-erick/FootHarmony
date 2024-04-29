import ItemFilter from './Item';
import { cn, createURLQueries } from '@/lib/utils';
import Link from 'next/link';


interface Props{
  query: string;
  sort: undefined | string;
};


const SORT = [
  {
    label: 'Best Sallers',
    value: 'sold'
  },{
    label: 'New Arrivals',
    value: 'createAt'
  },{
    label: 'Lowest Price',
    value: 'standard_price'
  },{
    label: 'Highest Price',
    value: '-standard_price'
  },
];


export default function SortFilter({query, sort}: Props) {

  return (
    <ItemFilter label="Sort">
      <ul className="flex flex-col py-2">
        { SORT.map( ({label, value}, i) => {
          const actived = sort === label;

          return(
            <li className="flex-center" key={i}>

              <Link
               className={cn('px-3 py-2 w-36 flex text-xs font-semibold truncate uppercase hover:bg-gray-100 transition-all', {
                'bg-gray-200 hover:bg-gray-200': actived 
               })}
               href={ createURLQueries(query, { sort: actived ? undefined : value }) }>
                {label}
              </Link>

            </li>
          )
        }) }
      </ul>
    </ItemFilter>
  );
}
