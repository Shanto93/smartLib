import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/books" }),
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: () => "/",
    }),
  }),
});

export const { useGetAllBooksQuery } = baseApi;
