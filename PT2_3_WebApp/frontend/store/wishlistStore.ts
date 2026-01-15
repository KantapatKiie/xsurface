import { create } from 'zustand';

interface WishlistState {
  wishlist: string[];
  
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  
  addToWishlist: (productId) => {
    const wishlist = get().wishlist;
    if (!wishlist.includes(productId)) {
      set({ wishlist: [...wishlist, productId] });
    }
  },
  
  removeFromWishlist: (productId) => {
    set({ wishlist: get().wishlist.filter(id => id !== productId) });
  },
  
  toggleWishlist: (productId) => {
    const wishlist = get().wishlist;
    if (wishlist.includes(productId)) {
      get().removeFromWishlist(productId);
    } else {
      get().addToWishlist(productId);
    }
  },
  
  isInWishlist: (productId) => {
    return get().wishlist.includes(productId);
  },
  
  clearWishlist: () => {
    set({ wishlist: [] });
  },
}));
