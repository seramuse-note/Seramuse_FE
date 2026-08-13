import type { Note, NoteDetail } from '@/types/notes.types';
import { baseApi } from './baseApi';
import type { ApiResponse, ApiResponseItem } from '@/types/api.types';
import type { CreateNoteDto, UpdateNoteDto } from '@/types/dto.type';

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
    getNote: builder.query<ApiResponseItem<NoteDetail>, { id: string }>({
      query: ({ id }) => `/notes/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'NOTE', id: id }],
    }),
    createNote: builder.mutation<ApiResponseItem<Note>, CreateNoteDto>({
      query(newNote) {
        return {
          url: '/notes',
          method: 'POST',
          body: { title: newNote.title?.trim() || 'Untitled', blocks: newNote?.blocks ?? [] },
        };
      },
      invalidatesTags: [{ type: 'NOTE', id: 'LIST_NOTE' }],
    }),
    deleteNote: builder.mutation<ApiResponseItem<Note>, { id: string }>({
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
    updateNote: builder.mutation<ApiResponseItem<Note>, { idNote: string; body: UpdateNoteDto }>({
      query({ idNote, body }) {
        return {
          url: `/notes/${idNote}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: (result, error, { idNote }) => [
        { type: 'NOTE', id: 'LIST_NOTE' },
        { type: 'NOTE', id: idNote },
      ],
    }),
    updateFavorite: builder.mutation<ApiResponseItem<Note>, { id: string }>({
      query({ id }) {
        return {
          url: `/notes/${id}/favorite`,
          method: 'PATCH',
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'NOTE', id: 'LIST_NOTE' },
        { type: 'NOTE', id: id },
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
  useUpdateFavoriteMutation,
} = noteApi;
export default noteApi;
