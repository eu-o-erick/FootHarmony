"use client";

import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { Brand, Media, Product } from "@/payload-types";
import CategoriesFeatured, { TCategoryFeatured } from "@/components/home/categories";

import Navbar from "@/components/navbar";
import Banner from "@/components/home/banner";
import Brands from "@/components/home/brands";
import SpecialBrand from "@/components/home/special_brand";
import About from "@/components/home/about";
import ProductsFeatured from "@/components/home/products";
import Footer from "@/components/footer";



export interface TBrandsFeatured {
  cover: string | Media;
  brand: string | Brand;
  id?: string | null | undefined;
}


export default function Home() {
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

  return (
    <div className="min-h-svh flex flex-col justify-between">
      <Navbar />
      <Banner />

      <Brands brands={brands} />
      <SpecialBrand />
      <About />
      <ProductsFeatured products={products} />
      <CategoriesFeatured categories={categories} />

      <Footer />
    </div>
  );
}
