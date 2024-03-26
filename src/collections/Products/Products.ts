import payload from "payload";
import { CollectionConfig } from "payload/types";
import { Product } from "@/payload-types";
import { slateEditor } from "@payloadcms/richtext-slate";
import { stripe } from '../../lib/stripe'
import { BeforeChangeHook } from "payload/dist/collections/config/types";


const handlerBeforeChange: BeforeChangeHook = async (args) => {

  const data = args.data as Product;

  if (args.operation === 'create') {

    const createdProduct = await stripe.products.create({
      name: data.name,
      default_price_data: {
        currency: 'USD',
        unit_amount: Math.round(data.standard_price * 100),
      },
    });

    const updated = {
      ...data,
      stripeId: createdProduct.id,
      priceId: createdProduct.default_price as string,
    };

    return updated;

  } else if (args.operation === 'update') {
    console.log('atualizou o produto')

    const updatedProduct = await stripe.products.update(data.stripeId!, {
      name: data.name,
      default_price: data.priceId!,
    });

    const updated = {
      ...data,
      stripeId: updatedProduct.id,
      priceId: updatedProduct.default_price as string,
    };

    return updated;
  }

  // remover o produto das ofertas e excluir os preços
}


export const Products: CollectionConfig = {
  slug: 'product',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: ({req}) => req.user,
    read: ({req}) => req.user,
    update: ({req}) => req.user.email === 'aaa@aaa.com',
    delete: ({req}) => req.user,
  },
  hooks: {
    beforeChange: [handlerBeforeChange],
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      // required: true,
    },
    
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      // required: true,
    },
    
    {
      name: 'description',
      type: 'richText',
      editor: slateEditor({}),
      // required: true,
    },

    {
      name: 'genere',
      label: 'Genere',
      type: 'radio',
      defaultValue: 'Unisex',
      options: ['Unisex', 'Male', 'Female'],
      required: true,
      admin: {
        layout: 'horizontal',
      },
    },

    {
      name: 'standard_price',
      label: 'Standard Price',
      type: 'number',
      // required: true,
    },

    {
      name: 'variations',
      label: 'Variations',
      type: 'relationship',
      relationTo: 'variation',
      // required: true,
      hasMany: true,
    },

    {
      name: 'details',
      label: 'Details',
      type: 'group',
      fields: [
        {
          name: 'brand',
          label: 'Brand',
          type: 'relationship',
          relationTo: 'brand',
          // required: true,
          hasMany: false,
        },
        {
          name: 'categories',
          label: 'Categories',
          type: 'relationship',
          // required: true,
          hasMany: true,
          relationTo: 'category',
        },
        {
          name: 'tags',
          label: 'Tags',
          type: 'relationship',
          required: false,
          hasMany: true,
          relationTo: 'tag',
        },
      ],
    },

    {
      name: 'offers',
      type: 'relationship',
      relationTo: 'offer',
      required: false,
      hasMany: true,
      access: {
        read: () => false,
        update: () => false,
        create: () => false,
      },
      admin: {
        hidden: true
      }
    },

    {
      name: 'stripeId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'priceId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },

    {
      name: 'sold',
      access: {
        create: () => false,
        read: () => true,
        update: () => false,
      },
      type: 'number',
      defaultValue: 0,
      required: true,
    },

  ]
}