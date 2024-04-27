"use client";

import { trpc } from "@/trpc/client";
import { useSearchParams } from 'next/navigation';

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeaderProducts from "@/components/products/header";
import CatalogProducts from "@/components/products/catalog";
import { useEffect, useState } from "react";
import Generes from "@/components/home/generes";


export interface Queries {
  search: string | undefined;
  category: string | undefined;
  brand: string | undefined;
  min_price: string | undefined;
  max_price: string | undefined;
  color: string | undefined;
  offer: string | undefined;
  genere: string | undefined;
  sort: string | undefined;
};


export default function Home() {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? undefined;
  const category = searchParams.get('category') ?? undefined;
  const brand = searchParams.get('brand') ?? undefined;
  const min_price = searchParams.get('min_price') ?? undefined;
  const max_price = searchParams.get('max_price') ?? undefined;
  const color = searchParams.get('color') ?? undefined;
  const offer = searchParams.get('offer') ?? undefined;
  const genere = searchParams.get('genere') ?? undefined;
  const sort = searchParams.get('sort') ?? undefined;
  
  const queries = { search, category, brand, min_price, max_price, color, offer, genere, sort };

  const { status, data: products } = trpc.products.useQuery(queries);


  const [isFilterOpen, setIsFilterOpen] = useState(true);

  function toggleFilter() {
    setIsFilterOpen(!isFilterOpen);
  
  };

  return (
    <div className="min-h-svh ">
      <Navbar />
      <Generes />
      <HeaderProducts queries={queries} isFilterOpen={isFilterOpen} toggleFilter={toggleFilter} />
      <CatalogProducts status={status} products={products} queries={queries} isFilterOpen={isFilterOpen} toggleFilter={toggleFilter} />
      <Footer />
    </div>
  );
};
