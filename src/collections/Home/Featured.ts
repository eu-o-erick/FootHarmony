import { CollectionConfig } from "payload/types";

export const Featured: CollectionConfig = {
  slug: 'featured',
  access: {
    create: ({req}) => req.user,
    read: ({req}) => req.user,
    update: ({req}) => req.user,
    delete: ({req}) => req.user,
  },
  fields: [

    {
      name: 'products',
      label: 'Products (at least 4)',
      type: 'relationship',
      relationTo: 'product',
      required: true,
      hasMany: true,
    },


    {
      name: 'brands',
      label: 'Brands (at least 4)',
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
    },

    {
      name: 'categories',
      label: 'Categories (at least 4)',
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
          name: 'category',
          label: 'Category',
          type: 'relationship',
          relationTo: 'category',
          hasMany: false,
          required: true,
        },

      ]
    }
    
  ]
}