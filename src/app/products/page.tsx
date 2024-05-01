"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

import { closeDropDowns } from "@/lib/close-drop-down";

import Navbar from "@/components/navbar";
import Generes from "@/components/home/generes";
import HeaderProducts from "@/components/products/header";
import Filter from "@/components/products/filter";
import SearchDecription from '@/components/products/search';
import CatalogProducts from '@/components/products/catalog';
import DescriptionQueries from "@/components/products/desc_queries";
import Footer from "@/components/footer";


export default function Home() {
  const searchParams = useSearchParams();

  const query = searchParams.toString();

  const queries = query.split('&').map((key_value) => {
    const [key, value] = key_value.split('=');

    return {[key]: value};

  }).reduce((obj, item) => ({ ...obj, ...item }), {});

  const [isFilterOpen, setIsFilterOpen] = useState(true);

  
  useEffect(() => {
    document.body.addEventListener('click', closeDropDowns);
    return () => document.body.removeEventListener('click', closeDropDowns);
  }, []);

  function toggleFilter() {
    setIsFilterOpen(!isFilterOpen);
  };


  return (
    <div className="min-h-svh ">
      <Navbar />
      <Generes />
      <HeaderProducts queries={queries} isFilterOpen={isFilterOpen} toggleFilter={toggleFilter} />
      <Filter queries={queries} query={query} isFilterOpen={isFilterOpen} />
      <SearchDecription queries={queries} query={query} />
      <CatalogProducts query={query} queries={queries} />
      <DescriptionQueries queries={queries} />
      <Footer />
    </div>
  );
};
