import { cn, createURLQueries } from '@/lib/utils';
import Link from 'next/link';
import { useState, useEffect } from 'react';


interface Props{
  query: string;
  page: undefined | string;
  totalPages: number;
};

export default function Pagination({ query, page, totalPages }: Props) {

  const [currentPage, setCurrentPage] = useState(0);
  const [arr, setArr] = useState<number[]>([]);


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

  }, [totalPages, page]);


  return (
    <nav className='mt-24 w-full'>
      <ul className="flex-center gap-3">
        { arr.map( i => (
          <li key={i}>
            <Link
             href={ createURLQueries(query, { page: String(i) }) }
             className={cn("w-7 h-7 bg-gray-100 border border-gray-950 hover:bg-gray-300 flex-center font-bold text-sm shadow-sm transition-all", {
              'bg-gray-950 text-gray-200 hover:bg-gray-950': i === currentPage
             })}>
              {i}
            </Link>
          </li>
        )) }
      </ul>
    </nav>
  );
}
