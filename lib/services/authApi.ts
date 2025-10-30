import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<{ success: boolean; data?: unknown; error?: string }, { name: string; email: string; password: string }>(
      {
        query: (body) => ({ url: "/users", method: "POST", body }),
        invalidatesTags: ["User"],
      }
    ),
    login: build.mutation<{ success: boolean; data?: any; error?: string }, { email: string; password: string }>(
      {
        query: (body) => ({ url: "/auth/login", method: "POST", body }),
        invalidatesTags: ["User"],
      }
    ),
    logout: build.mutation<{ success: boolean }, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["User"],
    }),
    me: build.query<{ success: boolean; data?: any }, void>({
      query: () => ({ url: "/auth/me" }),
      providesTags: ["User"],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginMutation, useLogoutMutation, useMeQuery } = authApi;



