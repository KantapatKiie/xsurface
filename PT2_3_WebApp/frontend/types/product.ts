export interface Product {
  _id: string;
  name: string;
  code: string;
  price: number;
  category?: string;
  description?: string;
  image: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  code: string;
  price: number | string;
  category?: string;
  description?: string;
  image?: File | null;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: PaginationData;
}
