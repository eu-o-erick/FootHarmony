import { sizes } from '../../constants/sizes';
import { colors } from '../../constants/colors';
import { stripe } from '../../lib/stripe';
import { CollectionConfig } from 'payload/types';


export const Variations: CollectionConfig = {
  slug: 'variation',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    beforeChange: [
      async (args) => {

        const data = args.data;

        if (args.operation === 'create' && data.standard_price) {

          const createdProduct = await stripe.products.create({
            name: data.name,
            default_price_data: {
              currency: 'USD',
              unit_amount: Math.round(data.standard_price * 100),
            },
          });

          const updated = {
            ...data,
            stripeId: createdProduct.id,
            priceId: createdProduct.default_price as string,
          };

          return updated;

        } else if (args.operation === 'update') {

          let updated = {
            ...data,
            stripeId: '',
            priceId: '',
          };


          if(data.standard_price) {

            const updatedProduct = await stripe.products.update(data.stripeId!, {
              name: data.name,
              default_price: data.priceId!,
            })
  
            updated = {
              ...data,
              stripeId: updatedProduct.id,
              priceId: updatedProduct.default_price as string,
            }
          }

          return updated
        }
      },
    ],
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
      label: 'Name (used only for identification in offers)',
      type: 'text',
      required: true,
    },

    {
      label: 'Colors',
      type: 'collapsible',
      fields: [
        {
          name: 'primary_color',
          label: 'Primary Color',
          type: 'select',
          defaultValue: 'white',
          required: true,
          options: colors.map( color => color.label )
        },

        {
          name: 'secondary_color',
          label: 'Secondary Color (optional)',
          type: 'select',
          required: false,
          options: colors.map( color => color.label )
        },
      ],
    },

    {
      name: 'images',
      type: 'array',
      label: 'Images',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    {
      name: 'standard_price',
      label: "Standard Price(The price will only apply if there's a variation in price between options; otherwise, the default price for the shoes will be applied)",
      type: 'number',
      required: false,
    },

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


    {
      name: 'offer',
      label: 'Offer',
      type: 'relationship',
      required: false,
      relationTo: 'offer',
      hasMany: false,
    },

    
    {
      name: 'stock',
      label: 'Stock',
      type: 'array',
      fields: [
        {
          name: 'size',
          label: 'Size',
          type: 'select',
          options: sizes,
          required: true,
        },{
          name: 'amount',
          label: 'Amount',
          type: 'number',
          required: true,
        }
      ],
      required: true,
    },

    {
      name: 'sold',
      access: {
        create: () => false,
        read: () => true,
        update: () => false,
      },
      type: 'number',
      defaultValue: 0,
      required: true,
    },
  ]
} 