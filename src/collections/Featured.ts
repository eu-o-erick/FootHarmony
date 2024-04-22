import { CollectionConfig } from "payload/types";

export const Featured: CollectionConfig = {
  slug: 'featured',
  access: {
    create: ({req}) => req.user,
    read: () => true,
    update: ({req}) => req.user,
    delete: ({req}) => req.user,
  },
  fields: [

    {
      name: 'products',
      label: 'Products',
      type: 'relationship',
      relationTo: 'product',
      minRows: 4,
      maxRows: 4,
      required: true,
      hasMany: true,
    },

    {
      name: 'brands',
      label: 'Brands (at least 5)',
      type: 'array',
      fields: [

        {
          name: 'cover',
          label: 'Cover',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'brand',
          label: 'Brand',
          type: 'relationship',
          relationTo: 'brand',
          hasMany: false,
          required: true,
        },

      ]
    }
  ]
}