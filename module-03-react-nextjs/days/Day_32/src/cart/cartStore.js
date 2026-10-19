import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import { useStore } from 'zustand';

export const cartStore = createStore(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      clear: () => set({ items: [] }),
    }),
    { name: 'addis-eats-cart' }
  )
);


export const useCartStore = (selector) => useStore(cartStore, selector);