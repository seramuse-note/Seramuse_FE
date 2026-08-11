import { type ApiResponseItem } from '@/types/api.types';
import { baseApi } from './baseApi';
import type { Tag } from '@/types/notes.types';
import type { CreateTagDto } from '@/types/dto.type';

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
