
import { Product } from '@/payload-types';
import { cn } from '@/lib/utils';
import CardProduct from '@/components/card_product';


interface Props{
  products: Product[] | undefined;
  status: "success" | "error" | "loading";
};


export default function CatalogProducts({status, products}: Props) {

  
  return (
    <section className='relative w-full max-w-[1448px] px-14 mx-auto overflow-x-hidden flex py-6'>

      { status === 'success' ?

        products?.length ?
          <ul className={cn(`w-full h-full grid gap-y-10 grid-cols-3 justify-items-center
            max-lg:grid-cols-4`
          )}>
            { products.map((product, i) => (
              <CardProduct key={i} product={product} />
            ))}
          </ul>
          :
          <p className="">nenhum produto</p>
        : 
        <h4 className="text-4xl">loading</h4>
      }

    </section>
  );
};
