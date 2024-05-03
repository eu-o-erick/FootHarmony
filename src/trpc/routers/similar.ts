import { publicProcedure } from "../trpc";
import { z } from 'zod';
import { getPayloadClient } from "../../get-payload";
import { TRPCError } from "@trpc/server";
import { Product } from "@/payload-types";


export const getSimilarRouter = publicProcedure
  .input(
    z.object({
      id: z.string(),
      category: z.string(),
      brand: z.string(),
      tags: z.optional( z.string() ),
    })
  )
  .query( async ({input}) => {
    const { id, category, brand, tags } = input;

    const where = {

      id: {
        not_equals: id
      },

      or: [

        {
          'details.brand.name': {
            contains: brand.replaceAll('+', ' ')
          },
        },

        {
          'details.categories.name': {
            contains: category.replaceAll('+', ' ')
          },
        },

        {
          ...(tags ? {
            'details.tags.name': {
              in: tags
            }
          } : {})
        },
      ]
    };


    const payload = await getPayloadClient();

    const { docs: products } = await payload.find({
      collection: 'product',
      where,
      depth: 3,
      limit: 10,
      sort: 'sold',

    }).catch((err: string) => new TRPCError({message: err, code: 'BAD_REQUEST'})) as {
      docs: Product[] | undefined,
    };

    return products;
  }
);
