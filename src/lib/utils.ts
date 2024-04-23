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
