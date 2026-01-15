import axios from "axios";
import { Product, ProductFormData, ProductsResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:6001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productApi = {
  getAll: async (params?: {
    search?: string;
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<ProductsResponse> => {
    const response = await api.get("/products", { params });
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data: ProductFormData): Promise<Product> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("code", data.code);
    formData.append("price", data.price.toString());
    if (data.category) formData.append("category", data.category);
    if (data.description) formData.append("description", data.description);
    if (data.image) formData.append("image", data.image);

    const response = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id: string, data: ProductFormData): Promise<Product> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("code", data.code);
    formData.append("price", data.price.toString());
    if (data.category) formData.append("category", data.category);
    if (data.description) formData.append("description", data.description);
    if (data.image) formData.append("image", data.image);

    const response = await api.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get("/products/categories");
    return response.data;
  },
};

export default api;
