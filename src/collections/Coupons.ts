import { CollectionConfig } from "payload/types";
import { handlerBeforeChanges } from "./hooks/coupons/before_change";


export const Coupons: CollectionConfig = {
  slug: 'coupon',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    beforeChange: [handlerBeforeChanges],
  },
  fields: [

    // name
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    // message
    {
      name: 'message',
      label: 'Message',
      type: 'relationship',
      relationTo: 'message',
      hasMany: false
    },
    // modal
    {
      name: 'modal',
      label: 'Modal',
      type: 'relationship',
      relationTo: 'modal',
      hasMany: false
    },

    // requirements
    {
      name: 'requirements',
      label: 'Requirements',
      type: 'array',
      fields: [

        // brands
        {
          name: 'brands',
          label: 'Brands',
          type: 'relationship',
          relationTo: 'brand',
          hasMany: true
        },

        // categories
        {
          name: 'categories',
          label: 'Categories',
          type: 'relationship',
          relationTo: 'category',
          hasMany: true
        },

        // value_min
        {
          name: 'value_min',
          label: 'Price Min',
          type: 'number',
        },
  
      ]
    },

    // select_products_variations
    {
      name: 'select_products_variations',
      label: 'Manually select products',
      type: 'group',
      fields: [
        // products
        {
          name: 'products',
          label: 'Products (applicable to all variations)',
          type: 'relationship',
          relationTo: 'product',
          hasMany: true
        },
        // variations
        {
          name: 'variations',
          label: 'Variations',
          type: 'relationship',
          relationTo: 'variation',
          hasMany: true
        },
      ]
    },

    // code
    {
      name: 'code',
      label: 'Coupon Code',
      type: 'text',
      required: true,
    },

    // discount
    {
      name: 'discount',
      label: 'Discount Type',
      type: 'select',
      defaultValue: 'percentage',
      required: true,
      options: [
        {
          value: 'percentage',
          label: 'Percentage discount'
        },{
          value: 'value',
          label: 'Fixed value discount'
        },{
          value: 'delivery_free',
          label: 'Delivery Free'
        }
      ]
    },
    
    // percentage_value
    {
      name: 'percentage_value',
      label: 'Percentage',
      type: 'number',
      admin: {
        condition: (data) => data.discount === 'percentage',
      },
      required: true,
    },

    // fixed_value
    {
      name: 'fixed_value',
      label: 'Fixed value',
      type: 'number',
      admin: {
        condition: (data) => data.discount === 'value',
      },
      required: true,
    },

    // application_with_offer
    {
      name: 'application_with_offer',
      label: 'Application With Offer',
      type: 'checkbox',
      required: true,
    },

    // // limit usage
    // {
    //   name: '', 
    //   label: ''
    // }
    
    // enable
    {
      name: 'enable',
      label: 'Enable',
      type: 'checkbox',
      defaultValue: true,
      required: true,
    },

    // expiration
    {
      name: 'expiration',
      label: 'Expiration',
      type: 'date',
      required: true
    },

  ]
}