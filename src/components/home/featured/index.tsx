"use client";

import { trpc } from "@/trpc/client";
import ProductsFeatured from "./Products";
import BrandsFeatured, { TBrandsFeatured } from "./Brands";
import { useEffect, useState } from "react";
import { Product } from "@/payload-types";
import CategoriesFeatured, { TCategoryFeatured } from "./Categories";


export default function Featured() {
  const { isLoading, data: itemsFeatured } = trpc.featured.useQuery();

  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [brands, setBrands] = useState<TBrandsFeatured[] | undefined | null>(undefined);
  const [categories, setCategories] = useState<TCategoryFeatured[] | undefined | null>(undefined);

  useEffect(() => {
    const featured = itemsFeatured?.[0];

    if(!featured || isLoading || typeof featured === 'string') {
      setProducts(undefined)
      setBrands(undefined)
      setCategories(undefined)

    } else {
      setProducts( featured.products.filter( item => typeof item !== 'string') )
      setBrands(featured.brands)
      setCategories(featured.categories)
    }
    

  }, [isLoading, itemsFeatured]);
  

  return(
    <section className="flex flex-col items-center gap-40 max-w-[1024px] m-auto">
      <ProductsFeatured products={products} />
      <BrandsFeatured brands={brands} />
      <CategoriesFeatured categories={categories} />
    </section>
  );
};