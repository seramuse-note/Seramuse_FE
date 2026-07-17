import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export interface Note {
  id?: string; // Có thể là id (SQL) hoặc _id (MongoDB) tùy Backend của bạn
  _id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export const notesApi = createApi({
  reducerPath: 'notesApi', // Định nghĩa query để thực hiện phương thức GET lấy danh sách
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://seramuse-be.onrender.com/notes',
  }),
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => 'notes',
    }),
  }),
});
