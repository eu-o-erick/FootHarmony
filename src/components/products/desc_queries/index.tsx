import { trpc } from '@/trpc/client';

interface Props{
  queries: {
    [x: string]: string;
  };
};

const SORT = [
  {
    label: 'Best Sallers',
    value: 'sold'
  },{
    label: 'New Arrivals',
    value: 'createAt'
  },{
    label: 'Lowest Price',
    value: 'standard_price'
  },{
    label: 'Highest Price',
    value: '-standard_price'
  },
];



export default function DescriptionQueries({ queries }: Props) {
  const { data: offers } = trpc.offers.useQuery();

  const QUERIES = [
    {
      label: 'Brand Filtered: ',
      value: queries.brand?.replaceAll('+', ' ')
    },{
      label: 'Category Filtered: ',
      value: queries.category?.replaceAll('+', ' ')
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
      value: queries.offer && offers?.find((offer) => offer.id === queries.offer)?.name
    },{
      label: 'Size Filtered: ',
      value: queries.size
    },{
      label: 'Sort By: ',
      value: queries.sort && SORT.find(sort => sort.value === queries.sort)?.label
    }
  ];


  return (
    <div className={`
      w-full max-w-[1448px] mx-auto px-16 mt-20 flex flex-wrap gap-x-8 gap-y-3 opacity-40
      max-lg:px-10 max-sm:px-4 max-[500px]:flex-col max-[500px]:mt-12
    `}>

      { QUERIES.map(({label, value}, i) => value && (

        <div key={i} className="text-sm uppercase max-[500px]:text-xs font-semibold">
          {label}
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
};
