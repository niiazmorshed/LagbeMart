import { api } from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    listOrders: build.query<{ success: boolean; data: any[] }, void>({
      query: () => ({ url: "/orders" }),
      providesTags: ["User"],
    }),
    getOrder: build.query<{ success: boolean; data?: any }, string>({
      query: (id) => ({ url: `/orders/${id}` }),
      providesTags: ["User"],
    }),
    createOrder: build.mutation<{ success: boolean; data?: any; error?: string }, { productId: string; quantity?: number; paymentMethod?: string }>({
      query: (body) => ({ url: "/orders", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
    updateOrderStatus: build.mutation<{ success: boolean; data?: any }, { id: string; newStatus: string; note?: string }>({
      query: ({ id, ...body }) => ({ url: `/orders/${id}`, method: "PUT", body }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useListOrdersQuery, useGetOrderQuery, useCreateOrderMutation, useUpdateOrderStatusMutation } = orderApi;

