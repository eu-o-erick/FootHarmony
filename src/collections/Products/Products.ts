import { CollectionConfig } from "payload/types";
import { slateEditor } from "@payloadcms/richtext-slate";
import { handlerBeforeChange } from "../hooks/products/before_change";
import { decreaseBrands, decreaseCategories, removeOfVariations, removeOfOffer } from "../hooks/products/after_delete";
import { relationToVariations, increaseBrands, increaseCategories } from "../hooks/products/after_change";


export const Products: CollectionConfig = {
  slug: 'product',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: ({req}) => req.user,
    read: () => true,
    update: ({req}) => req.user,
    delete: ({req}) => req.user,
  },
  hooks: {
    beforeChange: [handlerBeforeChange],
    afterChange: [relationToVariations, increaseBrands, increaseCategories],
    afterDelete: [removeOfVariations, removeOfOffer, decreaseBrands, decreaseCategories],
  },
  fields: [
    // name
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    
    // subtitle
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      required: true,
    },
    
    // desc
    {
      name: 'description',
      type: 'richText',
      editor: slateEditor({}),
      required: true,
    },

    // genere
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

    // price
    {
      name: 'standard_price',
      label: 'Standard Price',
      type: 'number',
      required: true,
    },

    // variations
    {
      name: 'variations',
      label: 'Variations',
      type: 'relationship',
      relationTo: 'variation',
      hasMany: true,
      filterOptions() { 
        return {
          product: {
            exists: false
          }
        }
      },
      validate: () => true
    },

    // details
    {
      name: 'details',
      label: 'Details',
      type: 'group',
      fields: [
        // brand
        {
          name: 'brand',
          label: 'Brand',
          type: 'relationship',
          relationTo: 'brand',
          required: true,
          hasMany: false,
        },
        // categories
        {
          name: 'categories',
          label: 'Categories',
          type: 'relationship',
          required: true,
          hasMany: true,
          relationTo: 'category',
        },
        // tags
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

    // offer
    {
      name: 'offer',
      type: 'relationship',
      relationTo: 'offer',
      required: false,
      hasMany: false,
      admin: {
        hidden: true
      }
    },

    // stripeId
    {
      name: 'stripeId',
      access: {
        create: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    // priceId
    {
      name: 'priceId',
      access: {
        create: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },

    // sold
    {
      name: 'sold',
      access: {
        create: () => false,
        update: () => false,
      },
      type: 'number',
      defaultValue: 0,
      required: true,
    },
  ]
}