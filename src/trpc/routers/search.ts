import { z } from "zod";
import { publicProcedure } from "../trpc";
import { getPayloadClient } from "../../get-payload";
import { Product } from "@/payload-types";



export const searchRouter = publicProcedure.input(
  z.object({
    value: z.string()
  }))
  .query( async ({input}) => {
    const { value } = input;

    if(value.replace(/ /g, '').length <3) return [];

    const payload = await getPayloadClient();

    const { docs: products } = await payload.find({
      collection: 'product',
      where: {
        or: [
          {
            or: [
              {
                'details.tags.name': {
                  in: value.replace(/ /g, ','),
                }
              },
              {
                'details.tags.name': {
                  like: value,
                }
              },
              {
                'details.tags.name': {
                  contains: value,
                }
              },
            ]
          },
          {
            or: [
              {
                name: {
                  in: value.replace(/ /g, ','),
                }
              },
              {
                name: {
                  like: value,
                }
              },
              {
                name: {
                  contains: value,
                }
              },
            ]
          },
        ]
      },
      limit: 10
    }) as { docs: Product[] | undefined };

    console.log('fez a requisição')

    return products;
  }
);
