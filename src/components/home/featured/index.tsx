"use client";

import { trpc } from "@/trpc/client";
import ProductsFeatured from "./Products";
import BrandsFeatured, { TBrandsFeatured } from "./Brands";
import { useEffect, useState } from "react";
import { Product } from "@/payload-types";
import CategoriesFeatured, { TCategoryFeatured } from "./Categories";
import Link from "next/link";
import ButtonUI from "@/components/ui/Button";
import SpecialBrand from "./SpeacialBrand";


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
    <section className="flex flex-col items-center gap-40">
      <ProductsFeatured products={products} />
      <BrandsFeatured brands={brands} />

      <SpecialBrand />

      <CategoriesFeatured categories={categories} />

      <ButtonUI link="/products" className="mb-20 max-w-[490px]">
        see all products
      </ButtonUI>
    </section>
  );
};