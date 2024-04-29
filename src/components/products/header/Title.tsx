import { Queries } from '@/app/products/page';
import { Offer } from '@/payload-types';
import { Tally1 } from 'lucide-react';

interface Props {
  queries: Queries;
  offers: Offer[] | undefined | null;
};



export default function TitleProducts({queries, offers}: Props) {
  const { search, category, brand, genere, offer } = queries;




  return (
    <h4 className="text-2xl font-bold flex-center uppercase  mt-1 mb-5">
      <span>{ (search && 'SEARCH') ?? genere ?? 'shoes' }</span>
      <Tally1 className='flex-center ml-2 -mr-2' />
      <span>{ search ?? brand ?? category ?? offers?.find( off => off.id === offer )?.name ?? 'catalog' } </span>
    </h4>
  );
}
