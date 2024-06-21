import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/products",
  }),
  endpoints: (builder) => ({
    getProductByName: builder.query({
      query: () => `?limit=194`,
    }),
  }),
});

export const { useGetProductByNameQuery } = productsApi;
