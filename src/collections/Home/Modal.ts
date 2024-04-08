import { CollectionConfig } from "payload/types";

export const Modal: CollectionConfig = {
  slug: 'modal',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: ({req}) => req.user,
    read: () => true,
    update: ({req}) => req.user,
    delete: ({req}) => req.user,
  },
  fields: [

    {
      name: 'banner',
      label: 'Banner Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
    },

    {
      name: 'linkTo',
      label: 'Link To',
      type: 'relationship',
      relationTo: ['product', 'variation', 'brand', 'category', 'offer'],
      hasMany: false,
    },
  ]
}