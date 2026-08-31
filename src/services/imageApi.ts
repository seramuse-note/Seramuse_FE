import type { ApiResponseItem, GetUploadsRequest, Upload, UploadRequest } from '@/types';
import { baseApi } from './baseApi';

export const imageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<ApiResponseItem<Upload>, UploadRequest>({
      query: (body) => {
        return {
          url: '/uploads',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'UPLOADS', id: 'LIST_UPLOADS' }],
    }),
    uploadImages: builder.mutation<ApiResponseItem<Upload[]>, UploadRequest[]>({
      query: (body) => {
        return {
          url: `/uploads/batch `,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'UPLOADS', id: 'LIST_UPLOADS' }],
    }),
    getUpload: builder.query<ApiResponseItem<Upload[]>, { publicId: string }>({
      query: ({ publicId }) => `/uploads/${publicId}`,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'UPLOADS' as const, id: id })),
              { type: 'UPLOADS', id: 'LIST_UPLOADS' },
            ]
          : [{ type: 'UPLOADS', id: 'LIST_UPLOADS' }],
    }),
    getUploads: builder.query<ApiResponseItem<Upload[]>, GetUploadsRequest>({
      query: ({ page, limit }) => ({
        url: `/uploads`,
        params: {
          page: page,
          limit: limit,
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'UPLOADS' as const, id: id })),
              { type: 'UPLOADS', id: 'LIST_UPLOADS' },
            ]
          : [{ type: 'UPLOADS', id: 'LIST_UPLOADS' }],
    }),
  }),
});

export const { useUploadImageMutation } = imageApi;
export default imageApi;
