import ItemFilter from './Item';
import { cn, createURLQueries } from '@/lib/utils';
import Link from 'next/link';

import { sizes } from '@/constants/sizes';

interface Props{
  query: string;
  size: undefined | string;
};



export default function SizeFilter({query, size}: Props) {

  return (
    <ItemFilter label="Size" using={size ? true : false}>
      <ul className="grid grid-cols-4 py-3 px-4 w-48 gap-2 justify-center">
        { sizes.map( (option, i) => {
          const actived = option === size;

          return(
            <li className="flex-center" key={i}>

              <Link
               className={cn('flex-center w-8 text-xs py-1 font-bold border border-gray-300 hover:border-gray-400 shadow-sm transition-all', {
                'bg-gray-950 hover:bg-gray-950 text-gray-200': actived 
               })}
               href={ createURLQueries(query, { size: actived ? undefined : option }) }>
                {option}
              </Link>

            </li>
          )
        }) }
      </ul>
    </ItemFilter>
  );
};
