'use client';

import { cn } from '../../../lib/utils';
import { colors } from '@/constants/colors';

interface Props{
  state: string | undefined;
  setState: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function ColorsFilter({state, setState}: Props) {

  
  return (
    <li className='py-3'>
      <span className="font-bold text-gray-800">COLORS</span>

      <ul className="flex justify-between flex-wrap mt-5 mb-7 gap-x-3 gap-y-3">

        { colors.map((color, i) => (
          <li key={i}>
            <button className={cn("flex-center border-2 border-gray-100 hover:border-gray-200 transition-all", {
              'border-gray-800 scale-110 hover:border-gray-800 hover:scale-110': color.label.toLowerCase() === state?.toLowerCase()
            })} onClick={ () => setState(color.label) }>
              
              <div className={"w-6 h-6 "+color.class} />

            </button>
          </li>
        ))}

      </ul>
    </li>
  );
}
