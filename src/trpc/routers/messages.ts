import { publicProcedure } from "../trpc";
import { getPayloadClient } from "../../get-payload";
import { Message } from "postcss";

export const getMessagesRouter = publicProcedure.query( async () => {

  const payload = await getPayloadClient({});

  const { docs: messages } = await payload.find({
    collection: 'message',
  }) as { docs: Message[] | null };

  return messages;
});
