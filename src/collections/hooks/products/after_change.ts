import { Product } from "@/payload-types";
import payload from "payload";
import { AfterChangeHook } from "payload/dist/collections/config/types";



export const relationToVariations: AfterChangeHook = async (args) => {
  if(args.req.payloadAPI !== 'REST') return console.log('payloadAPI: ', args.req.payloadAPI);

  const variations = (args.doc as Product).variations as string[];
  
  const previousVariations = (args.previousDoc as Product | undefined)?.variations as string[] ?? [];

  const arr: any[] = [];

  variations.forEach( item => {
    !previousVariations.find( (previousItem) => previousItem === item) && arr.push({ item, status: args.doc.id });

  });

  previousVariations.forEach( item => {
    !variations.find( (currentItem) => currentItem === item) && arr.push({ item, status: null });

  });


  const promises = arr.map( ({item, status}) => {

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
};


export const increaseBrands: AfterChangeHook = async (args) => {
  if(args.req.payloadAPI !== 'REST') return console.log('payloadAPI: ', args.req.payloadAPI);

  const currentBrand = args.doc.details.brand;
  const previousBrand = args.previousDoc.details?.brand as string;

  if(previousBrand !== currentBrand) {

    const quantity = await payload.findByID({
      collection: 'brand',
      id: currentBrand,
    })
    .then((brand) => brand.quantity + 1)
    .catch( err => {
      console.error('ERROR get the brand quantity for increase: ', err)
      return null;
    });

    quantity !== null && (await payload.update({
      collection: 'brand',
      id: currentBrand,
      data: {
        quantity
      }
    }).catch( (err) => console.error('ERROR increase 1 in brand: ', err) ));

    if(previousBrand) {

      const quantity = await payload.findByID({
        collection: 'brand',
        id: previousBrand,
      })
      .then((brand) => brand.quantity - 1)
      .catch( err => {
        console.error('ERROR get the brand quantity for decrease: ', err);
        return null;
      });
  
      quantity !== null && (await payload.update({
        collection: 'brand',
        id: previousBrand,
        data: {
          quantity
        }
      }).catch( (err) => console.error('ERROR decrease 1 in brand: ', err) ));

    };
  };

};


export const increaseCategories: AfterChangeHook = async (args) => {
  if(args.req.payloadAPI !== 'REST') return console.log('payloadAPI: ', args.req.payloadAPI);

  const currentCategories = args.doc.details.categories as string[];
  
  const previousCategories = args.previousDoc.details?.categories as string[] | undefined;

  if(currentCategories === previousCategories) return;

  const arr: any[] = [];

  currentCategories.forEach( item => {
    !previousCategories?.find( (previousItem) => previousItem === item) && arr.push({ item, status: args.doc.id });

  });

  previousCategories?.forEach( item => {
    !currentCategories.find( (currentItem) => currentItem === item) && arr.push({ item, status: null });

  });

  const promises = arr.map( ({item, status}) => {
    
    return new Promise( async (resolve) => {

      const quantity = await payload.findByID({
        collection: 'category',
        id: item,
      })
      .then((brand) => (status ? brand.quantity + 1 : brand.quantity - 1) )
      .catch( err => {
        console.error('ERROR get category quantity: ', err);
        return null;
      });

      quantity !== null && (await payload.update({
        collection: 'category',
        id: item,
        data: {
          quantity
        }
      }).catch( (err) => console.error('ERROR increase or decrease 1 in category: ', err) ));

      resolve({});
    });
  });


  await Promise.all(promises);
};

