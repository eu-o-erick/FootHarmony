import { publicProcedure } from "../trpc";
import { z } from 'zod';
import { getPayloadClient } from "../../get-payload";
import { TRPCError } from "@trpc/server";
import { Product } from "@/payload-types";



export const getProductRouter = publicProcedure
  .input(
    z.object({
      id: z.string().nullish(),
    })
  )
  .query( async ({input}) => {
    const { id } = input;


    if(!id) return null;

    const payload = await getPayloadClient();

    const product = await payload.findByID({
      collection: 'product',
      id,
      depth: 3,

    }).catch((err: string) => new TRPCError({message: err, code: 'BAD_REQUEST'})) as Product | null;

    return product;
  }
);
