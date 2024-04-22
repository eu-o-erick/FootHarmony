"use client";

import { trpc } from "@/trpc/client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";


export default function Home() {

  const { isLoading, data: itemsFeatured } = trpc.featured.useQuery();

  return (
    <div className="min-h-svh flex flex-col justify-between">
      <Navbar />
      Hello world
      <Footer />
    </div>
  );
}
