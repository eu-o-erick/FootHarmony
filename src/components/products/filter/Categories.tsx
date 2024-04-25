'use client';

import { cn } from '../../../lib/utils';
import { trpc } from '@/trpc/client';

interface Props{
  state: string | undefined;
  setState: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function CategoriesFilter({state, setState}: Props) {
  const { status, data: categories } = trpc.category.useQuery();

  
  return (
    <li>
      <span className="font-bold text-gray-800">CATEGORIES</span>

      <ul className="flex flex-col mt-3 mb-7">
      
        { (status === 'success' && categories?.length ) && 
          
          categories.map((category, i) => {
            const actived = category.name.toLowerCase() === state?.toLowerCase();

            return(
              <li key={i}>

                <button className={cn("relative h-7 flex-center justify-between font-semibold opacity-50 hover:opacity-80 group transition-all", {
                  'opacity-100 hover:opacity-100': actived
                })} onClick={ () => setState(category.name) }>
                  
                  <span className={cn("z-50 bg-white px-2 text-xs border-l-2 h-5 flex-center uppercase", {
                    'hover:opacity-100 border-l-2 border-gray-950': actived
                  })}>
                    {category.name}
                  </span>
                  
                  <span className={cn("z-50 bg-white pl-2 text-sm", {
                    'text-base hover:opacity-100': actived
                  })}>
                    {category.quantity}
                  </span>

                  <div className={cn("absolute top-2/4 left-0 translate-y-2/4 w-full h-px bg-gray-400 group-hover:bg-gray-950 transition-all", {
                    'bg-gray-950 h-[2px]': actived
                  })}/>
                
                </button>
              </li>
            )}
          )
        }
      </ul>
    </li>
  );
};
