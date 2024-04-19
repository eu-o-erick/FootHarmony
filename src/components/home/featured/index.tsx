"use client";

import { trpc } from "@/trpc/client";
import ProductsFeatured from "./Products";


export default function Featured() {

  const { isLoading, data: itemsFeatured } = trpc.featured.useQuery();


  return(
    <section className="flex flex-col items-center gap-20">
      <ProductsFeatured isLoading={isLoading} items={itemsFeatured?.filter( item => typeof item !== 'string')} />
    </section>
  );
};