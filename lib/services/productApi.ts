import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    listProducts: build.query<{ success: boolean; data: any[] }, { q?: string; category?: string; page?: number; limit?: number } | void>({
      query: (params) => ({ url: "/products", params: params as any }),
      providesTags: ["User"],
    }),
    addProduct: build.mutation<{ success: boolean; data?: any; error?: string }, any>({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useListProductsQuery, useAddProductMutation } = productApi;


