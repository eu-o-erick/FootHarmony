import CardProduct from "@/components/card_product"
import { Featured, Product } from "@/payload-types"
import { useEffect, useState } from "react";

interface Props {
  items: Featured[] | null | undefined;
  isLoading: boolean;
}

export default function ProductsFeatured({items, isLoading}: Props) {

  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    if(isLoading && !items?.length) return;

    setProducts( items?.[0].products as Product[] )

  }, [items, isLoading]);


  return(
    <div className="w-full flex-center flex-col">

      <h3 className="font-semibold text-gray-700 text-2xl">
        Step into Style: Discover Our Latest Shoe Collection!
      </h3>

      <p className="text-center px-5 pt-6 pb-16 max-w-[550px]">
        Step into comfort and style with our latest shoe collection! From sleek sneakers to elegant loafers,
        our shoes are designed to elevate every step you take. Crafted with premium materials and attention to detail,
        they offer the perfect blend of fashion and function. Discover your perfect pair today and make every stride a statement!
      </p>

      <ul className="w-full max-w-[800px] flex-center gap-7 ">

        { !products || !products.length ?
          <>loading</>

        :
          [...products, ...products, ...products, ...products].map((product, i) =>
            <CardProduct key={i} product={product} />
          )
        }

      </ul>

    </div>
  )
}