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

  const [categories] = useState( searchParams.get('categories') ?? undefined );
  const [brand] = useState( searchParams.get('brand') ?? undefined );
  const [min_price] = useState( searchParams.get('min_price') ?? undefined );
  const [max_price] = useState( searchParams.get('max_price') ?? undefined );
  const [color] = useState( searchParams.get('color') ?? undefined );
  const [sort] = useState( (searchParams.get('sort') as TSort | null) ?? undefined );
  const [genere] = useState( (searchParams.get('genere') as TGenere | null) ?? undefined );

  const { status, data: products } = trpc.products.useQuery({
    categories,
    brand,
    min_price,
    max_price,
    color,
    sort,
    genere
  });

  console.log('status: ', status)
  console.log('products: ', products)

  return (
    <div className="min-h-svh flex flex-col justify-between">
      <Navbar />
      Hello world
      <Footer />
    </div>
  );
};


// me de um exemplo usando payload cms com JS, eu quero que voce use o metodo "find" e procure por algo, e use MUITAS query, usando o where, me os exemplos das queries sendo usada

// tem que ter essas queries: produto com o preço padrão ou o preço de oferta acima de 90, com o preço padrão ou o preço de oferta abaixo de 95, produtos da marca adidas, com a categoria de "running", com a cor primaria ou a cor secundaria "black", e do genero "men", que se encaixe em todas essas requisições 

// estou usando payload cms com trpc e next