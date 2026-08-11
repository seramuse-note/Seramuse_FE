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
  tagTypes: ['NOTE', 'TAG', 'MOOD'], // Khai báo các loại Tag dùng để quản lý Cache (sẽ học ở phần sau)
  endpoints: () => ({}), // Để trống ở đây nếu bạn muốn dùng tính năng injectEndpoints sau này
});
