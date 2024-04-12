import { CollectionConfig } from "payload/types";


export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    beforeChange: [
      ({req, data}) => {
        return { ...data, user: req.user.id }
      }
    ]
  },
  access: {
    read: () => true,
    delete: () => true,
    update: () => true,
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    mimeTypes: ['image/*'],
  },
  fields: [{
    name: 'variations',
    type: 'relationship',
    relationTo: 'variation',
    required: false,
    hasMany: false,
    admin: {
      condition: () => false
    }
  }]
}