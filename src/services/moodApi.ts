import type { ApiResponse } from '@/types/api.types';
import { baseApi } from './baseApi';
import type { Mood } from '@/types/notes.types';

export const moodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMoods: builder.query<ApiResponse<Mood>, { page: number; limit: number }>({
      query: ({ page, limit }) => `/moods?page=${page}&limit=${limit}`,
      transformResponse: (response: ApiResponse<Mood>) => response,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'TAG' as const, id })),
              { type: 'MOOD', id: 'LIST_MOOD' },
            ]
          : [{ type: 'MOOD', id: 'LIST_MOOD' }],
    }),
  }),
});

export const { useGetMoodsQuery } = moodApi;
export default moodApi;
