import type { ApiResponse, ApiResponseItem, CreateTagRequest, GetTagsRequest, Tag } from '@/types';
import { baseApi } from './baseApi';

export const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTag: builder.mutation<ApiResponseItem<Tag>, CreateTagRequest>({
      query(newTag) {
        return {
          url: `/tags`,
          method: 'POST',
          body: { name: newTag.name.toUpperCase().trim(), color: newTag.color.trim() },
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
      providesTags: (result) => {
        return result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'TAG' as const, id: id })),
              { type: 'TAG', id: 'LIST_TAG' },
            ]
          : [{ type: 'TAG', id: 'LIST_TAG' }];
      },
    }),
    getTag: builder.query<ApiResponseItem<Tag>, { id: number }>({
      query: ({ id }) => `/tags/${id}`,
      providesTags: (_result, _error, { id }) => [{ type: 'TAG', id: id }],
    }),
  }),
});

export const { useGetTagQuery, useGetTagsQuery, useCreateTagMutation } = tagApi;
export default tagApi;
