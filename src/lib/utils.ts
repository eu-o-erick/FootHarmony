import { Offer } from "@/payload-types";
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
  const { currency = "USD", notation = "compact" } = options;

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

export function createURLQueries(queries: string, obj: { [k: string]: string }) {

  let keys_values = queries.split('&');

  for (const keyObj in obj) {

    let has = false;

    keys_values = keys_values.map( key_value => {
      const key = key_value.split('=')[0];
      const value = key_value.split('=')[1];

      if(keyObj === key && obj[keyObj] === value) {
        has = true;
        return '';

      } else if(keyObj === key) {
        has = true;
        return key+'='+obj[keyObj];
      
      } else {
        return key_value;

      };

    })

    !has && keys_values.push(keyObj+'='+obj[keyObj])
  
  };

  return '/products?'+keys_values.join('&');
}