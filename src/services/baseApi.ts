import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://seramuse-be.onrender.com',
    prepareHeaders: (headers) => {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['NOTE', 'TAG', 'MOOD'],
  endpoints: () => ({}),
});
