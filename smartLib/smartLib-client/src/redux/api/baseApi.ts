import type { IBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-eta-rose.vercel.app/api/books",
    // baseUrl: "http://localhost:5000/api/books",
  }),
  tagTypes: ["Book", "Borrow"],
  endpoints: (build) => ({
    getAllBooks: build.query<
      {
        success: boolean;
        data: IBook[];
        meta: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      },
      { page?: number; limit?: number } | void
    >({
      query: ({ page = 1, limit = 10 } = {}) => `/?page=${page}&limit=${limit}`,
      providesTags: ["Book"],
    }),

    // GET single book
    getSingleBook: build.query<{ success: boolean; data: IBook }, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),

    // CREATE book
    createBook: build.mutation<
      { success: boolean; data: IBook },
      Partial<IBook>
    >({
      query: (bookData) => ({
        url: "/",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),

    // DELETE book
    deleteBook: build.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),

    // UPDATE book
    updateBook: build.mutation<
      { success: boolean; data: IBook },
      { id: string; updatedDoc: Partial<IBook> }
    >({
      query: ({ id, updatedDoc }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedDoc,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = baseApi;
