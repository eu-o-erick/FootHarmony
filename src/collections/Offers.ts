import { Offer } from "@/payload-types";
import payload from "payload";
import { AfterChangeHook, CollectionConfig } from "payload/dist/collections/config/types";

const updateProducts: AfterChangeHook = async (args) => {
  const doc = args.doc as Offer;

  if(args.operation === 'create'){

    const items = doc.items;

    if(items?.length) {

      const promises = items.map( async (item: any) => {

        return new Promise( async (resolve, reject) => {

          const ids = await payload.findByID({
            collection: item.item_type,
            id: item[item.item_type],
          })
          .then( data => (data.offers as any[] )?.map( offer => offer.id ) )
          .then( ids => [...ids, doc.id] )

          await payload.update({
            collection: item.item_type,
            id: item[item.item_type],
            data: {
              offers: ids,
            },
          });


          resolve({})
        })

      })

      await Promise.all(promises);

      console.log('acabo')

    }

  } else if(args.operation === 'update'){

    const previousDoc = args.previousDoc.items;
    const doc = args.doc.items;

    const itemsRemoved = previousDoc.filter( (item: any) => !doc.find( (currentItem: any) => currentItem.id === item.id) );
    
    const itemsAdded = doc.filter( (item: any) => !previousDoc.find( (previousItem: any) => previousItem.id === item.id) );

    console.log('itemsRemoved:', itemsRemoved);
    console.log('itemsAdded:', itemsAdded);


  }
}


export const Offers: CollectionConfig = {
  slug: 'offer',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: ({req}) => req.user,
    read: ({req}) => req.user,
    update: ({req}) => req.user.email === 'aaa@aaa.com',
    delete: ({req}) => req.user,
  },
  hooks: {
    afterChange: [updateProducts]
  },
  fields: [

    // name
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      // required: true
    },
    // page title
    {
      name: 'page_title',
      label: 'Page Title',
      type: 'text',
      // required: true
    },

    // msg
    {
      name: 'message',
      label: 'Message',
      type: 'relationship',
      relationTo: 'message',
      hasMany: false,
      required: false
    },
    // modal
    {
      name: 'modal',
      label: 'Modal',
      type: 'relationship',
      relationTo: 'message',
      hasMany: false,
      required: false
    },

    // type banner
    {
      name: 'type_banner',
      type: 'radio',
      label: 'Type',
      defaultValue: "none", 
      required: true,
      options: [
        {
          value: 'new_banner',
          label: 'Export a new banner',
        },{
          value: 'same_banner',
          label: 'Use the same banner as the modal',
        },{
          value: 'none',
          label: 'Do not use a banner',
        }
      ]
    },
    // banner
    {
      name: 'banner',
      label: 'Banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (data) => data.type_banner === 'new_banner'
      }
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
            condition: (data, siblingData) => siblingData.item_type === 'product'
          }
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
          }
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

    // collections
    {
      name: 'collections',
      label: 'Collections',
      type: 'array',
      required: false,
      fields: [

        {
          name: 'type',
          label: 'Type',
          type: 'radio',
          defaultValue: 'brand',
          required: true,
          options: [
            {
              value: 'brand',
              label: 'Brand'
            },
            {
              value: 'category',
              label: 'Category'
            },
          ]
        },
        {
          name: 'brand',
          label: 'Brand',
          type: 'relationship',
          relationTo: 'brand',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === 'brand'
          }
        },
        {
          name: 'category',
          label: 'Category',
          type: 'relationship',
          relationTo: 'category',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === 'category'
          }
        },

        {
          name: 'discount',
          label: 'Discount (same discount for all products in this collection)',
          type: 'select',
          defaultValue: 'none',
          options: [
            {
              value: 'none',
              label: 'None',
            },{
              value: 'percentage',
              label: 'Percentage',
            },{
              value: 'value_off',
              label: 'Value Off',
            },{
              value: 'delivery_free',
              label: 'Delivery Free',
            },
          ],
          required: true,
        },

        {
          name: 'percentage_value',
          label: 'Percentage',
          type: 'number',
          admin: {
            condition: (data, siblingData) => siblingData.discount === 'percentage',
          },
          required: true,
        },

        {
          name: 'value_off',
          label: 'Value',
          type: 'number',
          admin: {
            condition: (data, siblingData) => siblingData.discount === 'value_off',
          },
          required: true,
        },

        {
          name: 'limit',
          type: 'group',
          interfaceName: 'Limit',
          fields: [
            {
              name: 'type',
              type: 'radio',
              label: 'Type',
              defaultValue: 'none',
              required: true,
              options: [
                {
                  value: 'for_each',
                  label: 'For Each',
                },{
                  value: 'for_all',
                  label: 'For All',
                },{
                  value: 'none',
                  label: 'No Limit',
                }
              ]
            },
            {
              name: 'number',
              type: 'number',
              defaultValue: 10,
              label: 'Sales Limit',
              required: true,
              admin: {
                condition: (data, siblingData) => siblingData.type !== 'none'
              } 
            },
          ],
        }
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
      // required: true
    },

  ]
}