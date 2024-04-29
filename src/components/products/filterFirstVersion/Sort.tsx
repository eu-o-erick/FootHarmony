'use client';

import { Separator } from '@/components/ui/separator';
import { cn } from '../../../lib/utils';

interface Props{
  state: string | undefined;
  setState: React.Dispatch<React.SetStateAction<string | undefined>>;
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

export default function SortFilter({state, setState}: Props) {

  return (
    <li>
      <span className="font-bold">SORT</span>

      <ul className="mt-3 mb-6 flex flex-col gap-y-2">

        { SORT.map(({value, label}, i) => {
          const actived = value.toLowerCase() === state?.toLowerCase();

            return(
              <li key={i}>
                <button className="flex items-center gap-2" onClick={ () => setState( actived ? undefined : value) }>

                  <div className={cn("relative w-4 h-4 rounded-full border-2 border-gray-600 overflow-hidden bg-gray-950 flex-center", {
                      'border-gray-950': actived
                    })}>

                    <div className={cn("absolute-center h-4 w-4 rounded-full bg-gray-50 transition-all", {
                      'w-2 h-2': actived
                    })} />
                  
                  </div>

                  <span className="uppercase text-sm text-gray-800">
                    {label}
                  </span>

                </button>
              </li>
          )}
        )}
      </ul>
    </li>
  );
};
