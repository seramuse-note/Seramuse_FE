import type {
  ApiResponse,
  ApiResponseItem,
  Note,
  GetNotesRequest,
  CreateNoteRequest,
  UpdateNoteRequest,
} from '@/types';
import { baseApi } from './baseApi';

export const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation<ApiResponseItem<Note>, CreateNoteRequest>({
      query(newNote) {
        return {
          url: '/notes',
          method: 'POST',
          body: { title: newNote.title?.trim() || 'Untitled', blocks: newNote?.blocks ?? [] },
        };
      },
      invalidatesTags: [{ type: 'NOTE', id: 'LIST_NOTE' }],
    }),
    getNotes: builder.query<ApiResponse<Note>, GetNotesRequest>({
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
    getNote: builder.query<ApiResponseItem<Note>, { id: string }>({
      query: ({ id }) => `/notes/${id}`,
      providesTags: (_result, _error, { id }) => [{ type: 'NOTE', id: id }],
    }),
    updateNote: builder.mutation<ApiResponseItem<Note>, { id: string; body: UpdateNoteRequest }>({
      query({ id, body }) {
        return {
          url: `/notes/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'NOTE', id: 'LIST_NOTE' },
        { type: 'NOTE', id: id },
      ],
    }),
    deleteNote: builder.mutation<ApiResponseItem<Note>, { id: string }>({
      query({ id }) {
        return {
          url: `/notes/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'NOTE', id: 'LIST_NOTE' },
        { type: 'NOTE', id: id },
      ],
    }),
    updateFavorite: builder.mutation<ApiResponseItem<Note>, { id: string }>({
      query({ id }) {
        return {
          url: `/notes/${id}/favorite`,
          method: 'PATCH',
        };
      },
      invalidatesTags: (_result, _error, { id }) => [
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
