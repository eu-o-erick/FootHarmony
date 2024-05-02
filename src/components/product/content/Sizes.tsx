'use client';

import { sizes } from '@/constants/sizes';
import { cn } from '@/lib/utils';
import { Variation } from '@/payload-types';
import { useState } from 'react';


interface Props{
  variation: Variation;
  size: number | undefined;
  setSize: React.Dispatch<React.SetStateAction<number | undefined>>;
};


export default function Sizes({variation, size: sizeState, setSize}: Props) {
  
  const [remaining, setRemaining] = useState<number | undefined>(undefined);


  return (
    <div className="mt-5 flex flex-col gap-3">
      <h4 className="font-semibold text-gray-700">SIZES</h4>

      <ul className='flex flex-wrap gap-3 w-[340px]'>
        { sizes.map((size, i) => {
          const available = variation.stock.find(({amount, size: SIZE}) => SIZE === size && amount > 0);
          const actived = i === sizeState;

          return(
            <li key={i}>
              <button className={cn("flex-center w-9 h-8 border rounded-sm bg-white border-gray-950 font-bold text-sm transition-all", {
                  'cursor-default shadow-inset opacity-50 border-transparent': !available,
                  'bg-gray-950 text-gray-200': actived
                })}
                onClick={ () => {
                  if(!available) return;

                  setSize(actived ? undefined : i);
                  setRemaining(actived ? undefined : available.amount);
                }}>

                {size}
              </button>
            </li>
          )}
        )}
      </ul>

      <span className="uppercase text-xs font-bold h-4 text-gray-600">{ remaining && remaining < 10 && `Only ${remaining} Remaining` }</span>
    </div>
  );
}
