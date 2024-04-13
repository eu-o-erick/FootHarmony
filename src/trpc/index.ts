import { paymenteRouter } from "./payment-router";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { Message, Modal } from "@/payload-types";
import { z } from "zod";


export const appRouter = router({
  payment: paymenteRouter,

  messages: publicProcedure.query( async () => {

    const payload = await getPayloadClient({});

    const { docs: messages } = await payload.find({
      collection: 'message',
    }) as { docs: Message[] };

    return messages;
  }),

  modal: publicProcedure.input(z.object({ modalId: z.string() })).query( async ({input}) => {
    const { modalId } = input;

    if(modalId === '') return; 

    const payload = await getPayloadClient({});

    const modal = await payload.findByID({
      collection: 'modal',
      id:  modalId,

    }) as Modal;

    return modal;
  }),

});


export type AppRouter = typeof appRouter;