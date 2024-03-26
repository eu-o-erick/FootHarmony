import { CollectionConfig } from "payload/types";


export const Orders: CollectionConfig = {
  slug: 'order',
  access: {
    create: () => false,
    read: () => true,
    delete: () => true,
    update: () => false,
  },
  fields: [

    {
      name: 'items',
      label: 'Items',
      type: 'relationship',
      relationTo: 'variation',
      required: true,
    },

    {
      name: 'purchase_info',
      label: 'Purchase Info',
      type: 'text',
      required: true,
    },

    {
      name: 'address',
      type: 'group',
      interfaceName: 'Address',
      fields: [

        {
          name: 'first_name',
          label: 'First Name',
          type: 'text',
          required: true,
        },
        
        {
          name: 'last_name',
          label: 'Lats Name',
          type: 'text',
          required: true,
        },
        
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
        },
                
        {
          name: 'phone',
          label: 'Phone',
          type: 'number',
          required: true,
        },
                
        {
          name: 'zip_code',
          label: 'Zip Code',
          type: 'number',
          required: true,
        },
                
        {
          name: 'state',
          label: 'State',
          type: 'text',
          required: true,
        },
                
        {
          name: 'town_city',
          label: 'Town / City',
          type: 'text',
          required: true,
        },
                
        {
          name: 'note',
          label: 'Note',
          type: 'textarea',
        },
      ],
    },


    {
      name: 'tracking_code',
      label: 'Tracking Code',
      type: 'text',
    },

    {
      name: 'is_paid',
      label: 'Is Paid',
      type: 'checkbox',
      required: true,
    },
    
    {
      name: 'finished',
      label: 'Finished',
      type: 'checkbox',
      required: true,
    },

  ]
}