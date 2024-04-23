import { Modal } from "../../payload-types";
import { publicProcedure } from "../trpc";
import { getPayloadClient } from "../../get-payload";
import { z } from "zod";

export const getModalRouter = publicProcedure
  .input( z.object({
    modalId: z.string().nullable()
    
  })).query( async ({input}) => {
    const { modalId } = input;

    if(!modalId) return null; 

    const payload = await getPayloadClient({});

    const modal = await payload.findByID({
      collection: 'modal',
      id:  modalId,

    }) as Modal | null;


    return modal;
  }
);
