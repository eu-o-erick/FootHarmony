"use client";

import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { Brand, Media, Product } from "@/payload-types";

import Navbar from "@/components/navbar";
import Generes from "@/components/home/generes";
import Banner from "@/components/home/banner";
import Brands from "@/components/home/brands";
import SpecialBrand from "@/components/home/special_brand";
import ProductsFeatured from "@/components/home/products";
import About from "@/components/home/about";
import Categories from "@/components/home/categories";
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

  useEffect(() => {
    const featured = itemsFeatured?.[0];

    if(!featured || isLoading || typeof featured === 'string') {
      setProducts(undefined)
      setBrands(undefined)

    } else {
      setProducts( featured.products.filter( item => typeof item !== 'string') )
      setBrands(featured.brands)
    }
    

  }, [isLoading, itemsFeatured]);

  return (
    <div className="min-h-svh">
      <Navbar />
      <Generes />
      <Banner />
      <Brands brands={brands} />
      <SpecialBrand />
      <ProductsFeatured products={products} />
      <About />
      <Categories />
      <Footer />
    </div>
  );
}
