import type {
  ApiResponse,
  ApiResponseItem,
  CreateNoteDto,
  GetNotesQueryParams,
  Note,
  NoteDetail,
  UpdateNoteDto,
} from '@/types';
import { baseApi } from './baseApi';

export const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<ApiResponse<Note>, GetNotesQueryParams>({
      query: (params) => {
        return {
          url: `/notes`,
          params: {
            page: params?.page ?? 1,
            limit: params?.limit ?? 10,
            search: params?.search,
            mood_id: params?.mood_id,
            tag_id: params?.tag_id,
            operator: params?.operator,
            is_favorite: params?.is_favorite,
          },
        };
      },
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
