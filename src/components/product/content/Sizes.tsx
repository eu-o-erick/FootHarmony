import { sizes } from '@/constants/sizes';
import { cn } from '@/lib/utils';
import { Variation } from '@/payload-types';
import { useState } from 'react';

interface Props{
  variation: Variation;
  size: number | undefined;
  setSize: React.Dispatch<React.SetStateAction<number | undefined>>;
  outOfStock: boolean;
  isError: boolean;
};


export default function Sizes({variation, size: sizeState, setSize, outOfStock, isError}: Props) {
  
  const [remaining, setRemaining] = useState<number | undefined>(undefined);


  return (
    <div className="mt-5 flex flex-col gap-3">
      <h4 className="font-semibold text-gray-700">SIZES</h4>

      <ul className='relative flex flex-wrap gap-3'>
        { sizes.map((size, i) => {
          const available = variation.stock.find(({amount, size: SIZE}) => SIZE === size && amount > 0);
          const actived = i === sizeState;

          return(
            <li key={i}>
              <button className={cn("flex-center w-9 h-8 border rounded-sm bg-white border-gray-950 font-bold text-sm transition-all", {
                  'cursor-default shadow-inset opacity-50 border-transparent': !available,
                  'bg-gray-950 text-gray-200 !border-gray-950': actived,
                  '!opacity-20': outOfStock,
                  'border-2 border-red-300': isError
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

        { outOfStock && <li className="absolute-center px-4 py-2 bg-gray-950 text-gray-200">OUT OF STOCK</li> }

      </ul>

      <span className="relative bottom-3 uppercase text-[11px] h-0 font-bold text-gray-600 text-right">
        { (sizeState && remaining && remaining < 10) && `Only ${remaining} Remaining` }
      </span>
    </div>
  );
}
