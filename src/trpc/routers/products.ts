import { publicProcedure } from "../trpc";
import { z } from 'zod';
import { colors as COLORS } from "../../constants/colors";
import { getPayloadClient } from "../../get-payload";
import { TRPCError } from "@trpc/server";
import { Product } from "@/payload-types";


const SORT = ['sold', 'createAt', 'standard_price', '-standard_price'];
const GENERES = ['men', 'women', 'unisex'];

// /products?categories=single&brand=adidas&min_price=90&max_price=92&color=white&genere=unisex&sort=bestsallers

export const getProductsRouter = publicProcedure
  .input(
    z.object({
      categories: z.optional( z.string() ),
      brand: z.optional( z.string() ),
      min_price: z.optional( z.string() ),
      max_price: z.optional( z.string() ),
      color: z.optional( z.string() ),
      genere: z.optional( z.string() ),
      offer: z.optional( z.string() ),
      sort: z.optional( z.string() ),
    })
  )
  .query( async ({input}) => {
    const { categories, brand, color, genere, offer, sort } = input;
    const min_price = Number(input.min_price);
    const max_price = Number(input.max_price);


    const where = {

      ...brand && {
        'details.brand.name': {
          contains: brand
        }
      },
    
      ...categories && {
        'details.categories.name': {
          contains: categories
        }
      },
    
      ...GENERES.includes(genere ?? '') && {
        'genere': {
          equals: genere
        }
      },
  
      and: [
  
        (color && COLORS.find( c => c.label.toLowerCase() === color.toLowerCase()) ) ? {
          or: [
  
            {
              'variations.primary_color': {
                contains: color
              },
            },{
              'variations.secondary_color': {
                contains: color
              }
            },
          ]
        } : {},
    
        (min_price && !isNaN(min_price)) ? {
          or: [
            {
              'standard_price': {
                greater_than_equal: min_price
              },
            },{
              'variations.standard_price': {
                greater_than_equal: min_price
              },
            }
          ]
        } : {},
        
        (max_price && !isNaN(max_price)) ? {
          or: [
            {
              'standard_price': {
                less_than_equal: max_price
              },
            },{
              'offer.offer_price': {
                less_than_equal: max_price
              },
            },{
              'variations.standard_price': {
                less_than_equal: max_price
              },
            },{
              'variations.offer.offer_price': {
                less_than_equal: max_price
              },
            }
          ]
        } : {},

        offer ? {
          or: [
            {
              'offer.relationTo.id': {
                equals: offer
              },
            },{
              'variations.offer.relationTo': {
                equals: offer
              },
            }
          ]
        } : {}
      ]
    };


    const payload = await getPayloadClient();

    const { docs: products } = await payload.find({
      collection: 'product',
      where,
      depth: 3,
      limit: 10,
      sort: SORT.includes(sort ?? '') ? sort : undefined
    }).catch((err: string) => new TRPCError({message: err, code: 'BAD_REQUEST'})) as { docs: Product[] | undefined };

    return products;
  }
);
