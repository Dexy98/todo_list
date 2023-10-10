import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//https://notes-pbwe.onrender.com/
export const Users = createApi({
  reducerPath: "Users",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (body: { userName: string; password: string }) => ({
        url: "users/register",
        method: "POST",
        body,
      }),
    }),

    loginUser: builder.mutation({
      query: (body: { userName: string; password: string }) => ({
        url: "users/login",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useCreateUserMutation, useLoginUserMutation } = Users;
