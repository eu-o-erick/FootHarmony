import { sizes } from '../constants/sizes';
import { colors } from '../constants/colors';
import { CollectionConfig } from 'payload/types';
import { handlerBeforeChange } from './hooks/variations/before_change';
import { removeOfOffer, removeOfProduct } from './hooks/variations/after_delete';


// quando removida remover a foto tmbm
export const Variations: CollectionConfig = {
  slug: 'variation',
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
    beforeChange: [handlerBeforeChange],
    afterDelete: [removeOfOffer, removeOfProduct],
  },
  fields: [

    // name
    {
      name: 'name',
      label: 'Name (used only for identification in offers)',
      type: 'text',
      required: true,
    },

    // colors
    {
      label: 'Colors',
      type: 'collapsible',
      fields: [
        // primary
        {
          name: 'primary_color',
          label: 'Primary Color',
          type: 'select',
          defaultValue: 'White',
          required: true,
          options: colors.map( color => color.label )
        },
        // secondary
        {
          name: 'secondary_color',
          label: 'Secondary Color (optional)',
          type: 'select',
          required: false,
          options: colors.map( color => color.label )
        },
      ],
    },

    // images
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

    // price
    {
      name: 'standard_price',
      label: "Standard Price(The price will only apply if there's a variation in price between options; otherwise, the default price for the shoes will be applied)",
      type: 'number',
      required: false,
    },

    // product
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'product',
      required: false,
      hasMany: false,
      admin: {
        hidden: true
      }
    },

    // stripeId
    {
      name: 'stripeId',
      type: 'text',
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },
    // priceId
    {
      name: 'priceId',
      type: 'text',
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },

    // offer
    {
      name: 'offer',
      type: 'group',
      fields: [

        // relationTo offer
        {
          name: 'relationTo',
          type: 'relationship',
          relationTo: 'offer',
          required: false,
          hasMany: false,
          admin: {
            hidden: true
          }
        },

        // price
        {
          name: 'offer_price',
          type: 'number',
          required: false,
        },

        // delivery free
        {
          name: 'delivery_free',
          type: 'checkbox',
          required: false,
        },
      ],
      admin: {
        hidden: true
      }
    },

    // stock
    {
      name: 'stock',
      label: 'Stock',
      type: 'array',
      fields: [
        // size
        {
          name: 'size',
          label: 'Size',
          type: 'select',
          options: sizes,
          required: true,
        },
        // amount
        {
          name: 'amount',
          label: 'Amount',
          type: 'number',
          required: true,
        }
      ],
      required: true,
    },

    // sold
    {
      name: 'sold',
      access: {
        create: () => false,
        update: () => false,
      },
      type: 'number',
      defaultValue: 0,
      required: true,
    }

  ]
};