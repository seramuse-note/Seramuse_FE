import type { ApiResponse, GetMoodsRequest, Mood } from '@/types';
import { baseApi } from './baseApi';
import { setMoods } from '@/store/slices/filterSlice';

export const moodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMoods: builder.query<ApiResponse<Mood>, GetMoodsRequest>({
      query: ({ page, limit }) => `/moods?page=${page}&limit=${limit}`,
      transformResponse: (response: ApiResponse<Mood>) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { data: moods } = data;

          dispatch(setMoods(moods));
        } catch {}
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'MOOD' as const, id })),
              { type: 'MOOD', id: 'LIST_MOOD' },
            ]
          : [{ type: 'MOOD', id: 'LIST_MOOD' }],
    }),
  }),
});

export const { useGetMoodsQuery } = moodApi;
export default moodApi;
