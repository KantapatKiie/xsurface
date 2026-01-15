import { create } from "zustand";
import { Product } from "@/types/product";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  totalPages: number;

  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  resetState: () => void;
}

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  searchTerm: "",
  currentPage: 1,
  totalPages: 1,
};

export const useProductStore = create<ProductState>((set) => ({
  ...initialState,

  setProducts: (products) => set({ products }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
  resetState: () => set(initialState),
}));
