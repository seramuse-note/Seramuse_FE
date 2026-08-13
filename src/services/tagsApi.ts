import type { ApiResponseItem, CreateTagDto, Tag } from '@/types';
import { baseApi } from './baseApi';

export const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTag: builder.query<ApiResponseItem<Tag>, { id: number }>({
      query: ({ id }) => `/tags/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'TAG', id: id }],
    }),
    createTag: builder.mutation<ApiResponseItem<Tag>, CreateTagDto>({
      query(newTag) {
        return {
          url: `/tags`,
          method: 'POST',
          body: { name: newTag.name.toUpperCase().trim(), color: newTag.color.trim() },
        };
      },
    }),
  }),
});

export const { useGetTagQuery, useCreateTagMutation } = tagApi;
export default tagApi;
