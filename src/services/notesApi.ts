import type { Note } from '@/types/notes.types';
import { baseApi } from './baseApi';
import type { ApiResponse } from '@/types/api.types';

export const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<ApiResponse<Note>, { page: number; limit: number }>({
      query: ({ page, limit }) => `notes?page=${page}&limit=${limit}`,
      transformResponse: (response: ApiResponse<Note>) => response,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'NOTE' as const, id })),
              { type: 'NOTE', id: 'LIST_NOTE' },
            ]
          : [{ type: 'NOTE', id: 'LIST_NOTE' }],
    }),
    createNote: builder.mutation<Note, Partial<Note>>({
      query: (newNote) => ({
        url: '/notes',
        method: 'POST',
        body: newNote,
      }),
    }),
  }),
});

export const { useGetNotesQuery, useCreateNoteMutation } = noteApi;
export default noteApi;
