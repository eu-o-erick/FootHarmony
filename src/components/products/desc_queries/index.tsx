import { Queries } from '@/app/products/page';


interface Props{
  queries: Queries;
};

export default function DescriptionQueries({ queries }: Props) {

  const QUERIES = [
    {
      label: 'Brand Filtered: ',
      value: queries.brand
    },{
      label: 'Category Filtered: ',
      value: queries.category
    },{
      label: 'Color Filtered: ',
      value: queries.color
    },{
      label: 'Genere Filtered: ',
      value: queries.genere
    },{
      label: 'Min Price: ',
      value: Number(queries.min_price) > 0 ? queries.min_price : undefined
    },{
      label: 'Max Price: ',
      value: Number(queries.max_price) < 500 ? queries.max_price : undefined
    },{
      label: 'Offer Filtered: ',
      value: queries.offer
    },{
      label: 'Search For: ',
      value: queries.search
    },{
      label: 'Size Filtered: ',
      value: queries.size
    },{
      label: 'Sort By: ',
      value: queries.sort
    }
  ];

  return (
    <div className="w-full max-w-[1300px] mx-auto px-20 mt-20 opacity-40">

      { QUERIES.map(({label, value}, i) => value && (

        <div key={i} className="text-sm uppercase my-1">
          <span className="font-semibold">{label}</span>
          <span className="font-bold "><strong>{value}</strong></span>
        </div>
      ))}
    </div>
  );
}
