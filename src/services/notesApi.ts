import type { CreateNoteDto, Note } from '@/types/notes.types';
import { baseApi } from './baseApi';
import type { ApiResponse, ApiResponseItemNote } from '@/types/api.types';
import type { NoteDetail } from '@/types/notedetail.types';

export const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<ApiResponse<Note>, { page: number; limit: number }>({
      query: ({ page, limit }) => `/notes?page=${page}&limit=${limit}`,
      transformResponse: (response: ApiResponse<Note>) => response,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'NOTE' as const, id })),
              { type: 'NOTE', id: 'LIST_NOTE' },
            ]
          : [{ type: 'NOTE', id: 'LIST_NOTE' }],
    }),
    createNote: builder.mutation<ApiResponse<Note>, CreateNoteDto>({
      query: (newNote) => ({
        url: '/notes',
        method: 'POST',
        body: { title: newNote.title?.trim() || 'Untitled', blocks: newNote?.blocks ?? [] },
      }),
    }),
    getNote: builder.query<ApiResponseItemNote<NoteDetail>, { id: string }>({
      query: ({ id }) => `/notes/${id}`,
      providesTags: ['NOTE_ITEM'],
    }),
  }),
});

export const { useGetNotesQuery, useCreateNoteMutation, useGetNoteQuery } = noteApi;
export default noteApi;
