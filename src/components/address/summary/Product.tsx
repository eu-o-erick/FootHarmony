import { ItemCart } from '@/components/cart';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice, getPriceOffer } from '@/lib/utils';
import { Media } from '@/payload-types';
import Image from 'next/legacy/image';


interface Props{
  itemsCart: ItemCart[];
  status: "success" | "loading" | "error";
};

export default function ListProducts({ itemsCart, status }: Props) {



  return (
    <ul className='flex flex-col gap-4 p-4'>

      { status === 'success' ?

        itemsCart.map(({product, variation, size, quantity}, i) => {
          const priceDefault = variation.standard_price ?? product.standard_price;
          const priceOffer = getPriceOffer(variation, product);
          
          return(
            <li key={i}>

              <div className="relative min-w-16 aspect-[4/3] inline-block">
                <div className="relative w-full h-full">
                  <Image src={'/media/'+(variation.images[0].image as Media).filename} alt="COVER" objectFit='contain' layout='fill' />
                </div>
              </div>

              <div className="relative ml-2 inline-block" style={{width: 'calc(100% - 72px)'}}>
                <h3 className="font-semibold uppercase text-gray-600 text-xs mb-1 truncate max-w-full">{product.name}</h3>

                <p className="text-gray-400 uppercase text-[11px]">size: <span className='font-semibold text-gray-500 ml-1'>{size}</span></p>

                <p className="text-gray-400 uppercase text-[11px]">quantity: <span className='font-semibold text-gray-500 ml-1'>{quantity}</span></p>

                <span className="absolute right-2 bottom-0 text-xs font-semibold text-gray-600">
                  { formatPrice( (priceOffer ?? priceDefault) * quantity ) }
                </span>


              </div>


              <Separator className='my-3' />
            
            </li>
          )
        })

        :

        [0, 1].map((i) => (
          <li key={i} className='relative flex pb-3'>
            <Skeleton className='w-20 aspect-[4/3]' />

            <div className="relative ml-2 inline-block" style={{width: 'calc(100% - 72px)'}}>

              <Skeleton className="mb-1 w-2/4 h-4" />

              <Skeleton className="w-14 h-3.5 mb-1" />

              <Skeleton className="w-20 h-3.5" />

              <Skeleton className="absolute right-2 bottom-1 w-12 h-4" />

            </div>
          </li>
        ))

      }

    </ul>
  );
};
