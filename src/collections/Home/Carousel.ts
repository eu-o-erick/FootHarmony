import { CollectionConfig } from "payload/types";

export const Carousel: CollectionConfig = {
  slug: 'carousel',
  access: {
    create: ({req}) => req.user,
    read: () => true,
    update: ({req}) => req.user,
    delete: ({req}) => req.user,
  },
  fields: [

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'type',
      label: 'Type',
      type: 'radio',
      defaultValue: 'Link',
      options: ['Link', 'Modal'],
      required: true,
    },

    {
      name: 'linkTo',
      label: 'Link To',
      type: 'relationship',
      relationTo: ['product', 'variation', 'brand', 'category', 'offer'],
      hasMany: false,
      required: true,
      admin: {
        condition: (data, siblingData, { user }) => data.type === 'Link'
      }
    },

    {
      name: 'modal',
      label: 'Modal',
      type: 'relationship',
      relationTo: 'modal',
      hasMany: false,
      required: true,
      admin: {
        condition: (data, siblingData, { user }) => data.type === 'Modal'
      }
    },
  ]
}