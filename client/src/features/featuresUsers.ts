// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUsers } from "../vite-env";
//https://notes-pbwe.onrender.com/
export const Users = createApi({
  reducerPath: "Users",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    createUser: builder.mutation<TUsers, TUsers>({
      query: (value) => ({
        url: "users/register",
        method: "POST",
        body: value,
      }),
    }),

    loginUser: builder.mutation<TUsers, TUsers>({
      query: (value) => ({
        url: "users/login",
        method: "POST",
        body: value,
      }),
    }),
  }),
});
export const { useCreateUserMutation, useLoginUserMutation } = Users;
