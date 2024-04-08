import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { z } from 'zod';
import { getPayloadClient } from "../get-payload";


export const paymenteRouter = router({
  createSession: publicProcedure.input(z.object({productIds: z.array(z.string())})).mutation( async ({input}) => {
    const { productIds } = input;

    if(!productIds.length) throw new TRPCError({ code: 'BAD_REQUEST' });

    const payload = await getPayloadClient();

    const { docs: product } = await payload.find({
      collection: 'product',
      where: {
        id: {
          in: productIds
        }
      }
    });

    console.log(product);

  })
});