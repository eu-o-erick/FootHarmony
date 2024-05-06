import { sizes } from "../constants/sizes";
import { CollectionConfig, Field } from "payload/types";


const fields: Field[] = sizes.map((size) => ({
  name: 'size' + size.replace('.', '_'),
  label: size + ' - Foot Length (in)',
  type: 'text',
  unique: false
}));



export const Sizes: CollectionConfig = {
  slug: 'size',
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
      label: 'Size Name',
      type: 'text',
      required: true
    },

    {
      label: 'Sizes',
      type: 'collapsible',
      fields: fields
    },
  ]
};
