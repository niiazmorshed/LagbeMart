import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    listProducts: build.query<{ success: boolean; data: any[] }, { q?: string; category?: string; page?: number; limit?: number } | void>({
      query: (params) => ({ url: "/products", params: params as any }),
      providesTags: ["User"],
    }),
    listMyProducts: build.query<{ success: boolean; data: any[] }, { q?: string; category?: string; page?: number; limit?: number } | void>({
      query: (params) => ({ url: "/products/seller/my-products", params: params as any }),
      providesTags: ["User"],
    }),
    addProduct: build.mutation<{ success: boolean; data?: any; error?: string }, any>({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
    deleteProduct: build.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: "/products/" + id, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),
    updateProduct: build.mutation<{ success: boolean; data?: any; error?: string }, { id: string; body: any }>({
      query: ({ id, body }) => ({ url: "/products/" + id, method: "PUT", body }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useListProductsQuery, useListMyProductsQuery, useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation } = productApi;


