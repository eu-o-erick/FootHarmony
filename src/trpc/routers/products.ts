import { publicProcedure } from "../trpc";
import { z } from 'zod';
import { colors as COLORS } from "../../constants/colors";
import { getPayloadClient } from "../../get-payload";
import { TRPCError } from "@trpc/server";
import { Product } from "@/payload-types";


const SORT = ['sold', 'createAt', 'standard_price', '-standard_price'];
const GENERES = ['men', 'women', 'unisex'];


export const getProductsRouter = publicProcedure
  .input(
    z.object({
      search: z.optional( z.string() ),
      category: z.optional( z.string() ),
      brand: z.optional( z.string() ),
      min_price: z.optional( z.string() ),
      max_price: z.optional( z.string() ),
      color: z.optional( z.string() ),
      genere: z.optional( z.string() ),
      offer: z.optional( z.string() ),
      size: z.optional( z.string() ),
      sort: z.optional( z.string() ),
      page: z.optional( z.string() ),
      ids: z.optional( z.string() ),
    })
  )
  .query( async ({input}) => {
    const { search, category, brand, color, genere, offer, size, sort, ids } = input;
    const min_price = Number(input.min_price);
    const max_price = Number(input.max_price);
    const page = Number(input.page);

    if(ids === '') return { products: undefined, totalPages: 0 };

    const where = {

      ...( ids && {
        'id': {
          in: ids
        }
      }),

      ...(brand && {
        'details.brand.name': {
          contains: brand.replaceAll('+', ' ')
        }
      }),
    
      ...(category && {
        'details.categories.name': {
          contains: category.replaceAll('+', ' ')
        }
      }),
    
      ...(GENERES.includes(genere ?? '') && {
        'genere': {
          equals: genere
        }
      }),

      ...(size && {
        'variations.stock.size': {
          equals: size
        }
      }),

      and: [

        search ? {
          or: [
            {
              or: [
                {
                  'details.tags.name': {
                    in: search.replace(/ /g, ','),
                  }
                },
                {
                  'details.tags.name': {
                    like: search,
                  }
                },
                {
                  'details.tags.name': {
                    contains: search,
                  }
                },
              ]
            },
            {
              or: [
                {
                  name: {
                    in: search.replace(/ /g, ','),
                  }
                },
                {
                  name: {
                    like: search,
                  }
                },
                {
                  name: {
                    contains: search,
                  }
                },
              ]
            },
          ]
        } : {},

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

    const { docs: products, totalPages  } = await payload.find({
      collection: 'product',
      where,
      depth: 3,
      limit: 24,
      sort: SORT.includes(sort ?? '') ? sort : undefined,
      page: isNaN(page) ? 1 : page,

    }).catch((err: string) => new TRPCError({message: err, code: 'BAD_REQUEST'})) as {
      docs: Product[] | undefined,
      totalPages: number
    };

    return { products, totalPages };
  }
);
