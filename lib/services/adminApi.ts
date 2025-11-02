import { api } from "./api";

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    listUsers: build.query<{ success: boolean; data: any[] }, void>({
      query: () => ({ url: "/users" }),
      providesTags: ["User"],
    }),
    deleteUser: build.mutation<{ success: boolean; error?: string }, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useListUsersQuery, useDeleteUserMutation } = adminApi;

