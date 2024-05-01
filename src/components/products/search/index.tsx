import { createURLQueries } from '@/lib/utils';
import { X } from 'lucide-react';
import Link from 'next/link';


interface Props{
  queries: {
    [x: string]: string
  };
  query: string;
};

export default function SearchDecription({queries, query}: Props) {

  if(!queries.search) return <></>;
  
  return(
    <h3 className={`
      text-xl flex items-center gap-2 font-semibold max-w-[1448px] mt-5 uppercase text-gray-500  mx-auto
      px-16 max-lg:px-8 max-md:text-base max-sm:px-4
    `}>

      <span>SEARCHING FOR:</span>
      <span className="font-bold truncate" style={{maxWidth: 'calc(100% - 170px'}}>{queries.search}</span>
      <Link
        className={`
          bg-gray-200 text-gray-400 flex-center p-1 w-5 h-5 ml-3 rounded-full 
          hover:bg-gray-300 hover:text-gray-500 transition-all
          max-md:h-4 max-md:w-4 max-md:ml-1 max-md:p-px 
        `}
       href={ createURLQueries(query, { search: undefined }) }>
        <X />
      </Link>
    </h3>
  );
};
