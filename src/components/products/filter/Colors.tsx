import ItemFilter from './Item';
import { cn, createURLQueries } from '@/lib/utils';
import Link from 'next/link';

import { colors } from '@/constants/colors';

interface Props{
  query: string;
  color: undefined | string;
};



export default function ColorsFilter({query, color}: Props) {

  return (
    <ItemFilter label="Colors">
      <ul className="grid grid-cols-4 py-3 px-4 w-40 gap-1.5 justify-center">
        { colors.map( ({label, className}, i) => {
          const actived = color === label;

          return(
            <li className="flex-center" key={i}>

              <Link
                className={cn('flex w-6 h-6 border border-gray-200 hover:border-gray-300 shadow-sm transition-all '+className, {
                'border-gray-400 hover:border-gray-400 scale-110': actived 
                })}
                href={ createURLQueries(query, { color: actived ? undefined : label }) } />

            </li>
          )
        }) }
      </ul>
    </ItemFilter>
  );
}
