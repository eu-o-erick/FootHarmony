import { Brand, Category, Product } from '@/payload-types';
import { Tally1 } from 'lucide-react';
import { Fragment } from 'react';

interface Props{
  product: Product;
};


export default function Info({product}: Props) {

  return (
    <div className="flex flex-col">

      <h6 className='uppercase flex items-center text-sm font-semibold text-gray-600 overflow-hidden'>
        <span>{(product.details.brand as Brand).name}</span>

        <Tally1 className='flex-center ml-1.5 -mr-1.5 w-4 h-4' />

        {product.details.categories.map((category, i) => (
          <Fragment key={i}>
            <span>{(category as Brand).name}</span>

            { product.details.categories.length - 1 < i && <Tally1 className='flex-center ml-1.5 -mr-1.5 w-4 h-4' /> }

          </Fragment>
        ))}
      </h6>

      <h1 className="text-3xl font-bold uppercase my-2 break-words">{product.name}</h1>

    </div>
  );
};
