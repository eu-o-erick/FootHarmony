import { CollectionConfig } from "payload/dist/collections/config/types";
import { updateRelationTo } from "./hooks/offers/after_change";
import { updateProducts } from "./hooks/offers/before_change";
import { deleteOffer } from "./hooks/offers/after_delete";
import { filterOptionsOffer as filterOptions } from "../lib/utils";

export const Offers: CollectionConfig = {
  slug: 'offer',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: ({req}) => req.user,
    read: () => true,
    update: ({req}) => req.user,
    delete: ({req}) => req.user,
  },
  hooks: {
    beforeChange: [updateProducts],
    afterChange: [updateRelationTo],
    afterDelete: [deleteOffer]
  },
  fields: [

    // name
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true
    },
    // page title
    {
      name: 'page_title',
      label: 'Page Title',
      type: 'text',
      required: true
    },

    // // msg
    // {
    //   name: 'message',
    //   label: 'Message',
    //   type: 'relationship',
    //   relationTo: 'message',
    //   hasMany: false,
    //   required: false
    // },
    // // modal
    // {
    //   name: 'modal',
    //   label: 'Modal',
    //   type: 'relationship',
    //   relationTo: 'message',
    //   hasMany: false,
    //   required: false
    // },
    // // type banner
    // {
    //   name: 'type_banner',
    //   type: 'radio',
    //   label: 'Type',
    //   defaultValue: "none", 
    //   required: true,
    //   options: [
    //     {
    //       value: 'new_banner',
    //       label: 'Export a new banner',
    //     },{
    //       value: 'same_banner',
    //       label: 'Use the same banner as the modal',
    //     },{
    //       value: 'none',
    //       label: 'Do not use a banner',
    //     }
    //   ]
    // },

    // banner products
    {
      name: 'banner',
      label: 'Banner Products Page',
      type: 'upload',
      relationTo: 'media',
    },
    // detai banner page product
    {
      name: 'detail_banner',
      label: 'Detail Banner Product Page(1920x150)',
      type: 'upload',
      relationTo: 'media',
    },
    
    // items
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      required: false,
      fields: [

        // type product or variation
        {
          name: 'item_type',
          label: 'Type',
          type: 'radio',
          defaultValue: 'product',
          options: [
            {
              label: 'Product (same discount for all variations)',
              value: 'product',
            },
            {
              label: 'Variation',
              value: 'variation',
            },
          ],
          required: true,
        },

        // select produt
        {
          name: 'product',
          label: 'Products',
          type: 'relationship',
          relationTo: 'product',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.item_type === 'product',
          },
          filterOptions,
          validate: () => true
        },

        // select variation
        {
          name: 'variation',
          label: 'Variations',
          type: 'relationship',
          relationTo: 'variation',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.item_type === 'variation'
          },
          filterOptions,
          validate: () => true
        },

        // type discount
        {
          name: 'discount_type',
          label: 'Discount',
          type: 'select',
          defaultValue: 'none',
          options: [
            {  
              value: 'new_price',
              label: 'New Price',
            },{
              value: 'delivery_free',
              label: 'Delivery Free',
            },{
              value: 'none',
              label: 'None',
            }            
          ],
          required: true,
        },

        // select new price
        {
          name: 'new_price',
          label: 'New Price',
          type: 'number',
          admin: {
            condition: (data, siblingData) => siblingData.discount_type === 'new_price',
          },
          required: true,
        },

        // limit sells
        {
          name: 'limit',
          label: 'Sales Limit',
          type: 'number',
        },

        // many sold
        {
          name: 'sold',
          label: 'Sold',
          type: 'number',
          defaultValue: 0,
          required: true,
          access: {
            create: () => false,
            read: () => true,
            update: () => false,
          },
        },

        // stripe id
        {
          name: 'stripeId',
          access: {
            create: () => false,
            read: () => false,
            update: () => false,
          },
          type: 'text',
          admin: {
            hidden: true,
          },
        },
        // price id
        {
          name: 'priceId',
          access: {
            create: () => false,
            read: () => false,
            update: () => false,
          },
          type: 'text',
          admin: {
            hidden: true,
          },
        },

      ],
    },

    // sold
    {
      name: 'sold',
      label: 'Sold',
      type: 'number',
      defaultValue: 0,
      required: true,
      access: {
        read: () => true,
        update: () => false,
        create: () => false,
      }
    },

    // with coupon
    {
      name: 'with_coupon',
      label: 'Applicable With Coupon',
      type: 'checkbox',
      required: true,
    },

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