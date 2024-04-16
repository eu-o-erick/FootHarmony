"use client";

import { Brand, Modal, Offer, Product, Variation } from "@/payload-types";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function ButtonModal({modal}: {modal: Modal}) {
  const { linkType, product, variation, brand, category, offer, buttonLabel } = modal;

  const [url, setUrl] = useState('');

  useEffect(() => {

    switch (linkType) {
      case 'Product':
        setUrl('/product/'+(product as Product).id)
        break;

      case 'Variation':
        let variationProduct = (variation as Variation).product as Product;
        setUrl('/product/' + variationProduct.id + '?variation=' + (variation as Variation).id);
        break;

      case 'Brand':
        setUrl(`/products?brand=${encodeURIComponent((brand as Brand).name)}`)
        break;

      case 'Category':
        setUrl(`/products?category=${encodeURIComponent((category as Brand).name)}`)
        break;

      case 'Offer':
        setUrl(`/products?offer=${(offer as Offer).id}`)
        break;
    };


  }, [modal])


  if(linkType === 'None') {
    <></>
  
  } else {
    return (
      <Link href={url} className="w-full p-3 bg-gray-900 text-gray-200 text-center shadow-md">
        { buttonLabel ?? 'See '+linkType }
      </Link>
    );
  };
};