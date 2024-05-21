import { Offer, Product, Variation } from "@/payload-types";
import { type ClassValue, clsx } from "clsx"
import { FilterOptions } from "payload/types";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice( price: number | string, options: {
  currency?: "USD" | "EUR" | "GBP" | "BDT",
  notation?: Intl.NumberFormatOptions["notation"]
} = {}) {
  const { currency = "USD", notation = "standard" } = options;

  const numericPrice = typeof price === "string"  ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export const filterOptionsOffer: FilterOptions<any> = ({data, id}) => {
  const ids = (data as Offer).items?.map( (item) => (item.product ?? item.variation) as string | undefined ) ?? [];
  const str = ids.filter( item => item ).join();


  return {
    or: [
      {
        "offer.relationTo": {
          exists: false
        },
      },{
        "offer.relationTo": {
          equals: id
        },
      },
    ],
    id: {
      not_in: str
    },
  };
};

export function createURLQueries(queries: string, obj: { [k: string]: string | undefined }) {
  if(!obj) return '';

  let keys_values = queries.split('&');

  for (const keyObj in obj) {
    const newValue = obj[keyObj];

    let has = false;

    keys_values = keys_values.map((key_value) => {
      const [key, value] = key_value.split('=');

      if(key === keyObj && newValue && value !== newValue ) {
        has = true;
        return `${key}=${newValue}`;
      
      } else if(key === keyObj && !newValue) {
        has = true;
        return '';
      
      } else {
        return key_value;
      };
      
    });

    (!has && newValue) && keys_values.push(`${keyObj}=${newValue}`);
  };


  return `/products?${keys_values.filter(str => str.trim() !== "").join('&')}`;
};


export function getPriceOffer(variation: Variation | undefined, product: Product | undefined) {
  
  function validDate(date: string | undefined) {
    if(!date) return;
  
    const currentDate = new Date();
    const expirationDate = new Date(date);
  
    return currentDate < expirationDate;
  };


  const variationOffer = variation?.offer?.relationTo as Offer | undefined;
  const productOffer = product?.offer?.relationTo as Offer | undefined;

  if(variationOffer?.enable && validDate(variationOffer.expiration) && variation?.offer?.offer_price) {
    return variation.offer.offer_price;

  } else if(productOffer?.enable && validDate(productOffer.expiration) && product?.offer?.offer_price) {
    return product.offer.offer_price;

  };
};


