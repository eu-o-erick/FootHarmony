import { CollectionConfig } from "payload/types";


export const Coupons: CollectionConfig = {
  slug: 'coupon',
  admin: {
    useAsTitle: 'name',
  },
  fields: [

    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      label: 'Message',
      type: 'relationship',
      relationTo: 'message',
      hasMany: false
    },
    {
      name: 'modal',
      label: 'Modal',
      type: 'relationship',
      relationTo: 'modal',
      hasMany: false
    },


    {
      name: 'requirements',
      label: 'Requirements',
      type: 'group',
      fields: [

        {
          name: 'brands',
          label: 'Brands',
          type: 'relationship',
          relationTo: 'brand',
          hasMany: true
        },

        {
          name: 'categories',
          label: 'Categories',
          type: 'relationship',
          relationTo: 'category',
          hasMany: true
        },

        {
          name: 'value_min',
          label: 'Price Min',
          type: 'number',
        },
        
        {
          name: 'value_max',
          label: 'Price Max',
          type: 'number',
        },

      ]
    },


    {
      name: 'products',
      label: 'Manually select products',
      type: 'group',
      fields: [
        {
          name: 'products',
          label: 'Applicable to Products',
          type: 'relationship',
          relationTo: 'product',
          hasMany: true
        },

        {
          name: 'variations',
          label: 'Applicable to Variations',
          type: 'relationship',
          relationTo: 'variation',
          hasMany: true
        },
      ]
    },


    {
      name: 'code',
      label: 'Coupon Code',
      type: 'text',
      required: true,
    },

    {
      name: 'discount',
      label: 'Discount Type',
      type: 'select',
      defaultValue: 'percentage',
      required: true,
      options: [
        {
          value: 'percentage',
          label: 'Percentage'
        },{
          value: 'value',
          label: 'Value Off'
        },{
          value: 'delivery_free',
          label: 'Delivery Free'
        }
      ]
    },
    
    {
      name: 'percentage_value',
      label: 'Percentage',
      type: 'number',
      admin: {
        condition: (data) => data.discount === 'percentage',
      },
      required: true,
    },

    {
      name: 'value_off',
      label: 'Value',
      type: 'number',
      admin: {
        condition: (data) => data.discount === 'value',
      },
      required: true,
    },

    {
      name: 'application_with_offer',
      label: 'Application With Offer',
      type: 'checkbox',
    },
    
    {
      name: 'enable',
      label: 'Enable',
      type: 'checkbox',
      defaultValue: true,
      required: true,
    },

    {
      name: 'expiration',
      label: 'Expiration',
      type: 'date',
      required: true
    },

  ]
}