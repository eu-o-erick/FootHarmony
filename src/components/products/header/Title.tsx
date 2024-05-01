import { Offer } from '@/payload-types';
import { Tally1 } from 'lucide-react';

interface Props {
  queries: {
    [x: string]: string;
  };
  offers: Offer[] | undefined | null;
};



export default function TitleProducts({queries, offers}: Props) {
  const { search, category, brand, genere, offer } = queries;

  
  return (
    <h4 className="text-2xl font-bold flex-center uppercase truncate mt-1 mb-5 max-lg:text-xl">
      <span>{ (search && 'SEARCH') ?? genere ?? 'shoes' }</span>
      <Tally1 className='flex-center ml-2 -mr-2' />
      <span>{ search ?? offers?.find( off => off.id === offer )?.name ?? brand ?? category  ?? 'catalog' } </span>
    </h4>
  );
}
