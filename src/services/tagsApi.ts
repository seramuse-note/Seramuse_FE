import type { ApiResponse, ApiResponseItem, GetTagsRequest, Tag, TagRequest } from '@/types';
import { baseApi } from './baseApi';
import { setTags } from '@/store/slices/filterSlice';

export const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTag: builder.mutation<ApiResponseItem<Tag>, TagRequest>({
      query(newTag) {
        return {
          url: `/tags`,
          method: 'POST',
          body: { name: newTag.name.toLowerCase().trim(), color: newTag.color.trim() },
        };
      },
      invalidatesTags: [{ type: 'TAG', id: 'LIST_TAG' }],
    }),
    getTags: builder.query<ApiResponse<Tag>, GetTagsRequest>({
      query: (params) => {
        return {
          url: `/tags`,
          params: {
            page: params?.page ?? 1,
            limit: params?.limit ?? 10,
          },
        };
      },
      transformResponse: (response: ApiResponse<Tag>) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: tags } = data;

          dispatch(setTags(tags));
        } catch {}
      },
      providesTags: (result) => {
        return result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'TAG' as const, id: id })),
              { type: 'TAG', id: 'LIST_TAG' },
            ]
          : [{ type: 'TAG', id: 'LIST_TAG' }];
      },
    }),
    getTag: builder.query<ApiResponseItem<Tag>, { id: string }>({
      query: ({ id }) => `/tags/${id}`,
      providesTags: (_, _error, { id }) => [{ type: 'TAG', id: id }],
    }),
    deleteTag: builder.mutation<ApiResponse<Tag>, { id: string }>({
      query({ id }) {
        return {
          url: `/tags/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_, _error, { id }) => [
        { type: 'TAG', id: id },
        { type: 'TAG', id: 'LIST_TAG' },
        'TAG',
      ],
    }),
  }),
});

export const { useGetTagQuery, useGetTagsQuery, useCreateTagMutation, useDeleteTagMutation } =
  tagApi;
export default tagApi;
