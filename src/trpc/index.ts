import { paymenteRouter } from "./routers/payment";
import { router } from "./trpc";
import { getProductsRouter } from "./routers/products";
import { getMessagesRouter } from "./routers/messages";
import { getModalRouter } from "./routers/modal";
import { getOffersRouter } from "./routers/offers";
import { getFeaturedsRouter } from "./routers/featureds";


export const appRouter = router({
  payment: paymenteRouter,
  products: getProductsRouter,
  messages: getMessagesRouter,
  modal: getModalRouter,
  offers: getOffersRouter,
  featured: getFeaturedsRouter,
});


export type AppRouter = typeof appRouter;