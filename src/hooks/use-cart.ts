import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


export type CartItem = {
  productId: string;
  variations: {
    variationId: string;
    size: string;
    quantity: number;
  }[];
};


type CartState = {
  items: CartItem[];
  addItem: (productId: string, variationId: string, size: string, quantity: number) => void;
  updateQuantity: (productId: string, variationId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};




export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (productId, variationId, size, quantity) => {
        set((state) => {

          const items = [...state.items];

          if( items.find(item => item.productId === productId ) ) {

            const arr = items.map((item) => {
              
              if(item.productId !== productId) return item;

              const variation = item.variations.find(variation => variation.variationId === variationId );

              if(!variation) {

                item.variations.push({
                  variationId,
                  size,
                  quantity,
                });

              } else {

                const variations = item.variations.map((variation => {
                  
                  if(variation.variationId !== variationId) return variation;

                  return {
                    variationId,
                    size,
                    quantity,
                  };

                }));

                item.variations = variations;
              };

              return item;

            });

            console.log('arr: ', arr)

          } else {

            items.push({
              productId,
              variations: [
                {
                  variationId,
                  size,
                  quantity,
                }
              ]
            });
          };

          console.log('items: ', items)

          return { items };
        })
      },

      updateQuantity: (productId, variationId, quantity) => {
        set((state) => {

          const items = state.items.map( item => {

            if(item.productId !== productId) return item;

            const variations = item.variations.map((variation) => {
              if(variation.variationId !== variationId) return variation;

              return {
                ...variation,
                quantity
              }
            })
            
            item.variations = variations;

            return item;

          });

          return { items };
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter( item => item.productId !== id)
        }))
      },
    
      clearCart: () => set({ items: [] })
    }),{
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
