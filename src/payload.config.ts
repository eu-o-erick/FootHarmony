import path from "path";
import { buildConfig } from "payload/config"
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from "@payloadcms/db-mongodb";

import { Products } from "./collections/Products";
import { Variations } from "./collections/Variations";
import { Brands } from "./collections/Brands";
import { Category } from "./collections/Categories";
import { Tags } from "./collections/Tags";
import { Media } from "./collections/Media";
import { Carousel } from "./collections/Carousel";
import { Modal } from "./collections/Modal";
import { Messages } from "./collections/Message";
import { Featured } from "./collections/Featured";
import { Orders } from "./collections/Oders";
import { Offers } from "./collections/Offers";
import { Coupons } from "./collections/Coupons";

import dotenv from 'dotenv';


dotenv.config({
  path: path.resolve(__dirname, '../.env')
})


export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Products, Variations, Brands, Category, Tags,  Offers, Coupons, Carousel, Modal, Messages, Featured, Media, Orders],
  routes: {
    admin: '/admin',
  },
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: ' - FOOTHARMONY',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg'
    }
  },
  rateLimit: {
    max: 2000
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  }
});