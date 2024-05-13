import { cn, createURLQueries } from '@/lib/utils';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';


interface Props{
  query: string;
  page: undefined | string;
  totalPages: number;
};

export default function Pagination({ query, page, totalPages }: Props) {

  const [currentPage, setCurrentPage] = useState(0);
  const [arr, setArr] = useState<number[]>([]);
  const [showLimit, setShowLimit] = useState(5);

  console.log('showLimit: ', showLimit)

  useEffect(() => {
    let arr = [];

    for(let i = 1; i <= totalPages; i++) {
      arr.push(i);

    };

    setArr(arr);


    setCurrentPage( (() => {
      const nPage = Number(page);

      return (isNaN(nPage) || nPage > totalPages || nPage < 1) ? 1 : nPage;
    })() );


    setShowLimit( (() => {
      const limit = currentPage + 2;

      if(totalPages < 5 || limit <= 5) {
        return 5;
      
      } else if(limit > totalPages) {
        return totalPages;
      
      } else {
        return limit;
      
      };

    })() );

  }, [totalPages, page]);


  useEffect(() => {
    if(!currentPage) return;

    let limit = currentPage + 2;
    console.log('currentPage: ', currentPage)
    console.log('limit: ', limit)

    if(totalPages < 5 || limit <= 5) {
      limit = 5;
    
    } else if(limit > totalPages) {
      limit = totalPages;
    
    };

    setShowLimit(limit);

  }, [currentPage]);


  return (
    <nav className='mt-24 w-full'>
      <ul className="flex-center gap-3">

        <li className=' font-semibold bg-white text-xs shadow-sm transition-all'>
          { currentPage > 1 ?
            <Link
              href={ createURLQueries(query, { page: String(currentPage - 1) }) }
              className="h-8 pl-2 pr-3 flex-center gap-px hover:bg-gray-200 text-gray-950 border border-gray-950">
              <IoIosArrowRoundBack className='w-5 h-5' />
              PREVIOUS
            </Link>
          :
            <span className="h-8 pl-2 pr-3 flex-center gap-px cursor-default hover:bg-white text-gray-500 border border-gray-500">
              <IoIosArrowRoundBack className='w-5 h-5' />
              PREVIOUS
            </span>
          }
        </li>

        { arr.map( i => {
          if(i <= showLimit - 5 || i > showLimit) return undefined;

          return(
            <li key={i} className=''>
              <Link
              href={ createURLQueries(query, { page: String(i) }) }
              className={cn("w-8 h-8 bg-white border border-gray-950 rounded-sm hover:bg-gray-200 flex-center font-bold text-sm shadow-sm transition-all", {
                'bg-gray-950 text-gray-200 hover:bg-gray-950 border-gray-950': i === currentPage,
              })}>
                {i}
              </Link>
            </li>
          )}
        ) }

        <li className=' font-semibold bg-white text-xs shadow-sm transition-all'>
          { currentPage + 1 <= totalPages ?
            <Link
              href={ createURLQueries(query, { page: String(currentPage + 1) }) }
              className="h-8 pr-2 pl-3 flex-center gap-px hover:bg-gray-200 text-gray-950 border border-gray-950">
              NEXT
              <IoIosArrowRoundForward className='w-5 h-5' />
            </Link>
          :
            <span className="h-8 pr-2 pl-3 flex-center gap-px cursor-default hover:bg-white text-gray-500 border border-gray-500">
              NEXT
              <IoIosArrowRoundForward className='w-5 h-5' />
            </span>
          }
        </li>

      </ul>
    </nav>
  );
}
