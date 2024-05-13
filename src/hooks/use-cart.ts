import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartItem = {
  productId: string;
  variationId: string;
  size: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (productId: string, variationId: string, size: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (productId, variationId, size, quantity) => {
        set((state) => {
          return { items: [...state.items, { productId, variationId, size, quantity }]};
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
