import { CollectionConfig } from "payload/types";

export const Category: CollectionConfig = {
  slug: 'category',
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
      label: 'Category',
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