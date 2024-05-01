import CardProduct from "@/components/card_product"
import SkeletonCardProduct from "@/components/card_product/Skeleton";
import { Product } from "@/payload-types"
import Link from "next/link";

interface Props {
  products: Product[] | undefined;
};


export default function ProductsFeatured({products}: Props) {

  return(
    <section className="w-full m-auto mt-32 max-w-[1024px] max-lg:px-14 flex flex-col max-sm:px-5 max-[480px]:px-3 max-[480px]:mt-20">

      <h3 className="font-semibold text-5xl mb-16 max-md:text-4xl  max-md:mb-10 max-sm:text-3xl max-sm:mb-8 max-[420px]:mx-0">
        Step into Style
      </h3>

      { !products || !products.length ?
        <SkeletonCardProduct />
      :
        <ul className="w-full grid gap-5 grid-cols-4 gap-y-5 max-lg:grid-cols-2 max-lg:px-4 max-lg:gap-10 max-md:px-0 max-sm:gap-y-5 max-sm:gap-x-2">
          { products.map((product, i) => (
            i < 4 && <CardProduct key={i} product={product} />
          ))} 
        </ul>
      }

      <Link href={'/products'} className="bg-gray-950 h-12 w-52 mx-auto my-20 text-gray-200 shadow-md flex-center hover:shadow-lg hover:bg-gray-900 transition-all max-sm:my-16">
        See All Products
      </Link>
    </section>
  );
};
