import path from "path";
import { buildConfig } from "payload/config"
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from "@payloadcms/db-mongodb";

import { Products } from "./collections/Products/Products";
import { Variations } from "./collections/Products/Variations";
import { Brands } from "./collections/Products/Brands";
import { Category } from "./collections/Products/Categories";
import { Tags } from "./collections/Products/Tags";
import { Media } from "./collections/Media";
import { Carousel } from "./collections/Home/Carousel";
import { Modal } from "./collections/Home/Modal";
import { Messages } from "./collections/Home/Message";
import { Featured } from "./collections/Home/Featured";
import { Orders } from "./collections/Oders";
import { Offers } from "./collections/Offers";
import { Coupons } from "./collections/Coupons";

import dotenv from 'dotenv';


dotenv.config({
  path: path.resolve(__dirname, '../.env')
})


export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Products, Variations, Brands, Category, Tags, Media, Carousel, Modal, Messages, Featured, Orders, Offers, Coupons],
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