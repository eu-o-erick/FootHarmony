"use client";

import { trpc } from "@/trpc/client";
import { useSearchParams } from 'next/navigation';

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useState } from "react";

type TSort = "bestsallers" | "new_arrivals" | "lowest_price" | "highest_price" | undefined;
type TGenere = "men" | "women" | "unisex" | undefined;


export default function Home() {
  const searchParams = useSearchParams();

  const [category] = useState( searchParams.get('category') ?? undefined );
  const [brand] = useState( searchParams.get('brand') ?? undefined );
  const [min_price] = useState( searchParams.get('min_price') ?? undefined );
  const [max_price] = useState( searchParams.get('max_price') ?? undefined );
  const [color] = useState( searchParams.get('color') ?? undefined );
  const [sort] = useState( (searchParams.get('sort') as TSort | null) ?? undefined );
  const [genere] = useState( (searchParams.get('genere') as TGenere | null) ?? undefined );

  const { status, data: products } = trpc.products.useQuery({
    category,
    brand,
    min_price,
    max_price,
    color,
    sort,
    genere
  });

  console.log(status)

  return (
    <div className="min-h-svh flex flex-col justify-between">
      <Navbar />
      Hello world
      <Footer />
    </div>
  );
};
