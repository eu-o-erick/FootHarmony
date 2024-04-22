import { publicProcedure } from "../trpc";
import { getPayloadClient } from "../../get-payload";
import { Offer } from "../../payload-types";

export const getOffersRouter = publicProcedure.query( async () => {

  const payload = await getPayloadClient({});

  const { docs: offer } = await payload.find({
    collection: 'offer',
  }) as { docs: Offer[] | null };

  return offer;
});
