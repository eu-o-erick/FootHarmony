import { paymenteRouter } from "./routers/payment";
import { router } from "./trpc";
import { getProductsRouter } from "./routers/products";
import { getMessagesRouter } from "./routers/messages";
import { getModalRouter } from "./routers/modal";
import { getOffersRouter } from "./routers/offers";
import { getFeaturedsRouter } from "./routers/featureds";
import { getBrandsRouter } from "./routers/brands";
import { getCategoriesRouter } from "./routers/categories";
import { searchRouter } from "./routers/search";
import { getProductRouter } from "./routers/product";


export const appRouter = router({
  payment: paymenteRouter,
  products: getProductsRouter,
  product: getProductRouter,
  search: searchRouter,
  messages: getMessagesRouter,
  modal: getModalRouter,
  offers: getOffersRouter,
  brands: getBrandsRouter,
  category: getCategoriesRouter,
  featured: getFeaturedsRouter,
});


export type AppRouter = typeof appRouter;