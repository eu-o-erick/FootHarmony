import ItemFilter from './Item';
import { cn, createURLQueries } from '@/lib/utils';
import Link from 'next/link';

interface Props{
  query: string;
  genere: undefined | string;
};

const GENERES = ['men', 'women', 'unisex']

export default function GeneresFilter({query, genere}: Props) {

  return (
    <ItemFilter label="Genere" using={genere ? true : false} classNames="hidden max-[500px]:block">
      <ul className="flex flex-col max-h-32 h-auto py-2 overflow-y-auto">
        { GENERES?.map((GENERE, i) => {
          const actived = GENERE === genere;

          return(
            <li key={i}>
              <Link
                className={cn('px-3 py-2 w-40 flex text-xs font-semibold truncate uppercase hover:bg-gray-100 transition-all', {
                'bg-gray-200 hover:bg-gray-200': actived 
                })}
                href={ createURLQueries(query, { genere: actived ? undefined : GENERE }) }>

                {GENERE}
              </Link>
            </li>
          )
        }) }
      </ul>
    </ItemFilter>
  );
};
