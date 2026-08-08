import type { Note } from '@/types/notes.types';
import { baseApi } from './baseApi';
import type { ApiResponse, ApiResponseItemNote } from '@/types/api.types';
import type { NoteDetail } from '@/types/notedetail.types';
import type { CreateNoteDto } from '@/types/dto.type';

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
    getNote: builder.query<ApiResponseItemNote<NoteDetail>, { id: string }>({
      query: ({ id }) => `/notes/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'NOTE', id: id }],
    }),
    createNote: builder.mutation<ApiResponseItemNote<Note>, CreateNoteDto>({
      query(newNote) {
        return {
          url: '/notes',
          method: 'POST',
          body: { title: newNote.title?.trim() || 'Untitled', blocks: newNote?.blocks ?? [] },
        };
      },
      invalidatesTags: [{ type: 'NOTE', id: 'LIST_NOTE' }],
    }),
    deleteNote: builder.mutation<ApiResponseItemNote<Note>, { id: string }>({
      query({ id }) {
        return {
          url: `/notes/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'NOTE', id: 'LIST_NOTE' },
        { type: 'NOTE', id: id },
      ],
    }),
    updateNote: builder.mutation<ApiResponseItemNote<Note>, { id: string }>({
      query({ id }) {
        return {
          url: `/notes${id}`,
          method: 'PATH',
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'NOTE', id: 'LIST_NOTE' },
        { type: 'NOTE', id },
      ],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} = noteApi;
export default noteApi;
