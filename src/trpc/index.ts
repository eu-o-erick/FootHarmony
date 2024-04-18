import { paymenteRouter } from "./payment-router";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { Carousel, Message, Modal, Offer } from "@/payload-types";
import { z } from "zod";


export const appRouter = router({
  payment: paymenteRouter,

  messages: publicProcedure.query( async () => {

    const payload = await getPayloadClient({});

    const { docs: messages } = await payload.find({
      collection: 'message',
    }) as { docs: Message[] | null };

    return messages;
  }),

  modal: publicProcedure.input(z.object({ modalId: z.string() })).query( async ({input}) => {
    const { modalId } = input;

    if(modalId === '') return; 

    const payload = await getPayloadClient({});

    const modal = await payload.findByID({
      collection: 'modal',
      id:  modalId,

    }) as Modal | null;


    return modal;
  }),

  
  offers: publicProcedure.query( async () => {

    const payload = await getPayloadClient({});

    const { docs: offer } = await payload.find({
      collection: 'offer',
    }) as { docs: Offer[] | null };

    return offer;
  }),
    
  carousel: publicProcedure.query( async () => {

    const payload = await getPayloadClient({});

    const { docs: carousel } = await payload.find({
      collection: 'carousel',
    }) as { docs: Carousel[] | null };

    return carousel;
  }),

});


export type AppRouter = typeof appRouter;