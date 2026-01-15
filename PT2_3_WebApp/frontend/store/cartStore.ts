import { create } from 'zustand';

interface CartItem {
  productId: string;
  name: string;
  code: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  
  addToCart: (item) => {
    const items = get().items;
    const existingItem = items.find(i => i.productId === item.productId);
    
    if (existingItem) {
      set({
        items: items.map(i =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
    
    get().calculateTotals();
  },
  
  removeFromCart: (productId) => {
    set({ items: get().items.filter(i => i.productId !== productId) });
    get().calculateTotals();
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    set({
      items: get().items.map(i =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    });
    
    get().calculateTotals();
  },
  
  clearCart: () => {
    set({ items: [], totalItems: 0, totalPrice: 0 });
  },
  
  calculateTotals: () => {
    const items = get().items;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    set({ totalItems, totalPrice });
  },
}));
