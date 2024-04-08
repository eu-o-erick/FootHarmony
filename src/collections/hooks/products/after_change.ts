import { Brand, Category, Product } from "@/payload-types";
import payload from "payload";
import { AfterChangeHook } from "payload/dist/collections/config/types";



export const relationToVariations: AfterChangeHook = async (args) => {
  console.log('====== after change product ======');
  console.log('set/remove product of variations');

  const variations = (() => {
    const variations = (args.doc as Product).variations as Product[] | string[] | null ?? [];

    const arr = variations.map((variation) => (variation && typeof variation !== 'string') ? variation.id : variation );
  
    return arr;
  })();
  
  const previousVariations = (args.previousDoc as Product | undefined)?.variations as string[] ?? [];

  console.log('current variations: ', variations);
  console.log('previous variations: ', previousVariations);

  const arr: any[] = [];

  variations.forEach( item => {
    !previousVariations.find( (previousItem) => previousItem === item) && arr.push({ item, status: args.doc.id });

  });

  previousVariations.forEach( item => {
    !variations.find( (currentItem) => currentItem === item) && arr.push({ item, status: null });

  });

  console.log('variations with status: ', arr);

  const promises = arr.map( ({item, status}) => {
    console.log('promise: update variation ', item);

    return new Promise(async (resolve, reject) => {

      await payload.update({
        collection: 'variation',
        id: item,
        data: {
          product: status
        }
      }).catch( (err) => console.error('ERROR set/remove product of variation: ', err));

      resolve({});
    })
  })

  await Promise.all(promises);
  console.log('ended relation product to variations');
  console.log('');
};


export const increaseBrands: AfterChangeHook = async (args) => {
  console.log('====== after change product ======');
  console.log('increase brand function');

  const currentBrand = (() => {
    const brand = args.doc.details.brand as string | Brand;

    return typeof brand === 'string' ? brand : brand.id;
  })();
  const previousBrand = args.previousDoc.details?.brand as string;

  console.log('current brand: ', currentBrand);
  console.log('previous brand: ', previousBrand);


  if(previousBrand !== currentBrand) {
    console.log('different brands');

    const quantity = await payload.findByID({
      collection: 'brand',
      id: currentBrand,
    })
    .then((brand) => brand.quantity + 1)
    .catch( err => {
      console.error('ERROR get the brand quantity for increase: ', err)
      return null;
    });



    quantity !== null && await payload.update({
      collection: 'brand',
      id: currentBrand,
      data: {
        quantity
      }
    }).catch( (err) => console.error('ERROR increase 1 in brand: ', err) );


    if(previousBrand) {
      console.log('have previous brand, so decrease in brand');

      const quantity = await payload.findByID({
        collection: 'brand',
        id: previousBrand,
      })
      .then((brand) => brand.quantity - 1)
      .catch( err => {
        console.error('ERROR get the brand quantity for decrease: ', err);
        return null;
      });
  
      quantity !== null && await payload.update({
        collection: 'brand',
        id: previousBrand,
        data: {
          quantity
        }
      }).catch( (err) => console.error('ERROR decrease 1 in brand: ', err) );

    };
  };

  console.log('');
};


export const increaseCategories: AfterChangeHook = async (args) => {
  console.log('====== after change product ======');
  console.log('increase category function');

  const currentCategories = (() => {
    const categories = args.doc.details.categories as string[] | Category[];

    return categories.map((category) => typeof category === 'string' ? category : category.id);
  })();
  
  const previousCategories = args.previousDoc.details?.categories as string[] | undefined;

  console.log('previous categories: ', previousCategories);
  console.log('current categories: ', currentCategories);

  if(currentCategories === previousCategories) return;

  const arr: any[] = [];

  currentCategories.forEach( item => {
    !previousCategories?.find( (previousItem) => previousItem === item) && arr.push({ item, status: args.doc.id });

  });

  previousCategories?.forEach( item => {
    !currentCategories.find( (currentItem) => currentItem === item) && arr.push({ item, status: null });

  });

  console.log('arr with status of categories: ', arr);


  const promises = arr.map( ({item, status}) => {
    console.log('promise: item with status: ', item, status)

    return new Promise( async (resolve) => {

      const quantity = await payload.findByID({
        collection: 'category',
        id: item,
      }).then((brand) => (status ? brand.quantity + 1 : brand.quantity - 1) )
      .catch( err => {
        console.error('ERROR get category quantity: ', err);
        return null;
      });

      quantity !== null && await payload.update({
        collection: 'category',
        id: item,
        data: {
          quantity
        }
      }).catch( (err) => console.error('ERROR increase or decrease 1 in category: ', err) );

      resolve({});
    });
  });


  await Promise.all(promises);

  console.log('ended increase categories function');
  console.log('');
};