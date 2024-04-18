import { CollectionConfig } from "payload/types";

export const Carousel: CollectionConfig = {
  slug: 'carousel',
  admin: {
    useAsTitle: 'name'
  },
  access: {
    create: ({req}) => req.user,
    read: () => true,
    update: ({req}) => req.user,
    delete: ({req}) => req.user,
  },
  fields: [

    // name
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true
    },

    // image_desktop
    {
      name: 'image_desktop',
      label: 'Image Desktop (7x3)',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    // image_mobile
    {
      name: 'image_mobile',
      label: 'Image Mobile (7x7)',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    // type
    {
      name: 'type',
      label: 'Type',
      type: 'radio',
      defaultValue: 'Link',
      options: ['Link', 'Modal'],
      required: true,
    },

    // type_link
    {
      name: 'type_link',
      label: 'Type',
      type: 'radio',
      defaultValue: 'Product',
      options: ['Product', 'Variation', 'Brand', 'Category', 'Offer'],
      required: true,
      admin: {
        condition: (data) => data.type === 'Link'
      }
    },

    // product
    {
      name: 'product',
      label: 'Link To',
      type: 'relationship',
      relationTo: 'product',
      hasMany: false,
      required: true,
      admin: {
        condition: (data) => (data.type_link === 'Product' && data.type === 'Link')
      }
    },

    // variation
    {
      name: 'variation',
      label: 'Link To',
      type: 'relationship',
      relationTo: 'variation',
      hasMany: false,
      required: true,
      admin: {
        condition: (data) => (data.type_link === 'Variation' && data.type === 'Link')
      }
    },

    // brand
    {
      name: 'brand',
      label: 'Link To',
      type: 'relationship',
      relationTo: 'brand',
      hasMany: false,
      required: true,
      admin: {
        condition: (data) => (data.type_link === 'Brand' && data.type === 'Link')
      }
    },

    // category
    {
      name: 'category',
      label: 'Link To',
      type: 'relationship',
      relationTo: 'category',
      hasMany: false,
      required: true,
      admin: {
        condition: (data) => (data.type_link === 'Category' && data.type === 'Link')
      }
    },

    // offer
    {
      name: 'offer',
      label: 'Link To',
      type: 'relationship',
      relationTo: 'offer',
      hasMany: false,
      required: true,
      admin: {
        condition: (data) => (data.type_link === 'Offer' && data.type === 'Link')
      }
    },

    // modal
    {
      name: 'modal',
      label: 'Modal',
      type: 'relationship',
      relationTo: 'modal',
      hasMany: false,
      required: true,
      admin: {
        condition: (data) => data.type === 'Modal'
      }
    },
  ]
}