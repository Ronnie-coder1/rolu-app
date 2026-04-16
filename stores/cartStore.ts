import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  decreaseItem: (id: string) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);

      let updated;

      if (existing) {
        updated = state.items.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        updated = [...state.items, { ...item, quantity: 1 }];
      }

      localStorage.setItem("my_cart", JSON.stringify(updated));

      return { items: updated };
    }),

  decreaseItem: (id) =>
    set((state) => {
      const updated = state.items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("my_cart", JSON.stringify(updated));

      return { items: updated };
    }),

  clearCart: () => {
    localStorage.removeItem("my_cart");
    set({ items: [] });
  },

  setCart: (items) => set({ items }),
}));