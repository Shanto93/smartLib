import type { IBorrow } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Borrow", "Book"],
  endpoints: (build) => ({
    // CREATE borrow
    createBorrow: build.mutation<
      { success: boolean; message: string; data: IBorrow },
      Partial<IBorrow>
    >({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: (result, error, arg) => [
        "Borrow",
        { type: "Book", id: arg.book }, 
      ],
    }),

    // GET borrow summary
    getBorrowSummary: build.query<
      {
        success: boolean;
        data: {
          book: { title: string; isbn: string };
          totalQuantity: number;
        }[];
      },
      void
    >({
      query: () => "/borrow",
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useCreateBorrowMutation, useGetBorrowSummaryQuery } = borrowApi;
