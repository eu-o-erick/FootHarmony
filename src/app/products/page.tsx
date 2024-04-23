"use client";

import { trpc } from "@/trpc/client";
import { useSearchParams } from 'next/navigation';

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useState } from "react";
import HeaderProducts from "@/components/products/header";
import CatalogProducts from "@/components/products/catalog";

type TSort = "bestsallers" | "new_arrivals" | "lowest_price" | "highest_price" | undefined;
type TGenere = "men" | "women" | "unisex" | undefined;


export default function Home() {
  const searchParams = useSearchParams();

  const categories = searchParams.get('categories') ?? undefined;
  const brand = searchParams.get('brand') ?? undefined;
  const min_price = searchParams.get('min_price') ?? undefined;
  const max_price = searchParams.get('max_price') ?? undefined;
  const color = searchParams.get('color') ?? undefined;
  const offer = searchParams.get('offer') ?? undefined;
  const genere = searchParams.get('genere') ?? undefined;
  const sort = searchParams.get('sort') ?? undefined;

  const query = searchParams.toString();

  const { status, data: products } = trpc.products.useQuery({
    categories,
    brand,
    min_price,
    max_price,
    color,
    offer,
    genere,
    sort
  });

  console.log('status: ', status)
  console.log('products: ', products)


  // fix hooks, when update item of offer, update content, but not id, and going down... life is a highway
  // pagination on trpc
  
  return (
    <div className="min-h-svh flex flex-col justify-between">
      <Navbar />
      <HeaderProducts query={query} queries={{ categories, brand, offer, genere }} />
      <CatalogProducts status={status} products={products} />
      <Footer />
    </div>
  );
};
