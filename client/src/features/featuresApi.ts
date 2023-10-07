// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TNotes } from "../vite-env";

export const Notes = createApi({
  reducerPath: "Notes",
  baseQuery: fetchBaseQuery({ baseUrl: "https://notes-pbwe.onrender.com/" }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    createNote: builder.mutation<void, TNotes>({
      query: (value) => ({
        url: "notes",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["Notes"],
    }),

    getNotes: builder.query<TNotes[], void>({
      query: () => `notes`,
      providesTags: ["Notes"],
    }),

    deleteNotes: builder.mutation<void, string>({
      query: (id) => ({
        url: `notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useDeleteNotesMutation,
} = Notes;
