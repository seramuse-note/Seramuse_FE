import type { Note } from '@/types/notes.types';
import { baseApi } from './baseApi';

export const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], void>({
      query: () => '/notes',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'NOTE' as const, id })),
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
