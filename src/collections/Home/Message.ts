import { CollectionConfig } from "payload/types";

export const Messages: CollectionConfig = {
  slug: 'message',
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
      name: 'card',
      label: 'Card Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
    },

    {
      name: 'linkTo',
      label: 'Open Modal',
      type: 'relationship',
      relationTo: 'modal',
      hasMany: false,
    },
  ]
}