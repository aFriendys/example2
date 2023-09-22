import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { PAGE_SIZE } from "#utils";

const placeholderApi = createApi({
  reducerPath: "placeholderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => `posts?limit=${PAGE_SIZE}&skip=${page * PAGE_SIZE}`,
    }),
    getPost: builder.query({
      query: (id) => ({ url: `posts/${id}` }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useLazyGetPostsQuery } =
  placeholderApi;
export default placeholderApi;
