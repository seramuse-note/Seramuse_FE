import type { Note } from '@/types/notes.types';
import { baseApi } from './baseApi';

const MOCK_NOTES: Note[] = [
  {
    id: 'note-1',
    title: 'Học Redux Toolkit Query 🚀',
    content: 'Tìm hiểu cách sử dụng baseApi, injectEndpoints và quản lý cache với RTK Query.',
    tags: [
      { id: 't1', name: 'React', color: '61DAFB' },
      { id: 't2', name: 'Redux', color: '764ABC' },
    ],
    created_at: '2026-07-28',
  },
  {
    id: 'note-2',
    title: 'Mua sắm cuối tuần 🛒',
    content: 'Mua táo 🍎, sữa 🥛 và chuẩn bị đồ ăn cho tuần mới.',
    tags: [{ id: 't3', name: 'Personal', color: 'FF5733' }],
    created_at: '2026-07-27',
  },
];

export const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getNotes: builder.query<Note[], void>({
    //   query: () => '/notes',
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.map(({ id }) => ({ type: 'NOTE' as const, id })),
    //           { type: 'NOTE', id: 'LIST_NOTE' },
    //         ]
    //       : [{ type: 'NOTE', id: 'LIST_NOTE' }],

    // }),
    getNotes: builder.query<Note[], void>({
      async queryFn() {
        // Giả lập độ trễ mạng 1 giây ⏳
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Trả về dữ liệu mock dưới dạng { data: ... }
        return { data: MOCK_NOTES };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'NOTE' as const, id })),
              { type: 'NOTE', id: 'LIST_NOTE' },
            ]
          : [{ type: 'NOTE', id: 'LIST_NOTE' }],
    }),
  }),
});

export const { useGetNotesQuery } = noteApi;
export default noteApi;
