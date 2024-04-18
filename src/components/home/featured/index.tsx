"use client";

import { trpc } from "@/trpc/client";
import ProductsFeatured from "./Products";


export default function Featured() {

  const { isLoading, data: itemsFeatured } = trpc.featured.useQuery();

    console.log('isLoading: '+isLoading)
    console.log('itemsFeatured: '+itemsFeatured)

  return(
    <section className="flex flex-col items-center gap-20">
      <ProductsFeatured isLoading={isLoading} items={itemsFeatured} />
    </section>
  );
};