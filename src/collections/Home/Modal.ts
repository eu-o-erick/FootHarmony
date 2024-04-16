import { slateEditor } from "@payloadcms/richtext-slate";
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
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },

    {
      name: 'banner',
      label: 'Banner Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'content',
      label: 'Content (title and description)',
      type: 'richText',
      required: true,
      editor: slateEditor({
        admin: {
          elements: ["h1", "h2", "h3", "h4", "textAlign", "ol", "ul", "link" ],
        }
      })
    },



    {
      name: 'linkType',
      label: 'Link To',
      type: 'radio',
      options: ['Product', 'Variation', 'Brand', 'Category', 'Offer', 'None'],
      defaultValue: 'None',
      required: true
    },

    {
      name: 'product',
      label: 'Product',
      type: 'relationship',
      relationTo: 'product',
      hasMany: false,
      required: true,
      admin: {
        condition: (data) => data.linkType === 'Product'
      }
    },
    {
      name: 'variation',
      label: 'Variation',
      type: 'relationship',
      relationTo: 'variation',
      hasMany: false,
      required: true,
      admin: {
        condition: (data) => data.linkType === 'Variation'
      }
    },
    {
      name: 'brand',
      label: 'Brand',
      type: 'relationship',
      relationTo: 'brand',
      hasMany: false,
      required: true,
      admin: {
        condition: (data) => data.linkType === 'Brand'
      }
    },
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'category',
      hasMany: false,
      required: true,
      admin: {
        condition: (data) => data.linkType === 'Category'
      }
    },
    {
      name: 'offer',
      label: 'Offer',
      type: 'relationship',
      relationTo: 'offer',
      hasMany: false,
      required: true,
      admin: {
        condition: (data) => data.linkType === 'Offer'
      }
    },

    {
      name: 'buttonLabel',
      label: 'Label of Button',
      type: 'text',
    },

    {
      name: 'active',
      label: 'Active',
      type: "checkbox",
      required: true,
      defaultValue: true
    },

    {
      name: 'expiryDate',
      label: 'Expiry Date',
      type: 'date',
    }
  ]
}