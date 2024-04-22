import CardProduct from "@/components/card_product"
import SkeletonCardProduct from "@/components/card_product/Skeleton";
import { Product } from "@/payload-types"
import Link from "next/link";

interface Props {
  products: Product[] | undefined;
};


export default function ProductsFeatured({products}: Props) {

  return(
    <section className="w-full m-auto mt-32 max-w-[1024px] max-lg:px-10 flex flex-col max-sm:px-5 max-[480px]:px-3 max-[480px]:mt-20">

      <h3 className="font-semibold text-5xl mb-16 max-md:text-4xl max-md:mx-10 max-md:mb-10 max-sm:text-2xl max-sm:mb-5 max-[420px]:mx-0">
        Step into Style
      </h3>

      { !products || !products.length ?
        <SkeletonCardProduct />
      :
        <ul className="w-full flex justify-between max-md:justify-evenly max-md:flex-wrap max-md:gap-y-5 max-[420px]:justify-between">
          { products.map((product, i) => (
            i < 4 && <CardProduct key={i} product={product} />
          ))} 
        </ul>
      }

      <Link href={'/products'} className="bg-gray-950 h-12 w-52 mx-auto my-20 text-gray-200 shadow-md flex-center hover:shadow-lg hover:bg-gray-900 transition-all max-sm:my-10">
        See All Products
      </Link>
    </section>
  );
};
