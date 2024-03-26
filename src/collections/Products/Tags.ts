import { CollectionConfig } from "payload/types";

export const Tags: CollectionConfig = {
  slug: 'tag',
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
      label: 'Tag Name',
      type: 'text',
      required: true
    }

  ]
}