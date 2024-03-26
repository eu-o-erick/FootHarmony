import { CollectionConfig } from "payload/types";

export const Brands: CollectionConfig = {
  slug: 'brand',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: ({req}) => req.user,
    read: ({req}) => req.user,
    update: ({req}) => req.user,
    delete: ({req}) => req.user,
  },
  fields: [
    {
      name: 'name',
      label: 'Brand Name',
      type: 'text',
      required: true
    },
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      required: true,
      defaultValue: 0,
      access: {
        create: () => false,
        read: () => true,
        update: () => false,
      },
    }

  ]
}