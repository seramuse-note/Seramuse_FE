import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { notesApi } from '../services/notesApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    // Thêm reducer quản lý trạng thái API của notes vào store // auth: authReducer,
    [notesApi.reducerPath]: notesApi.reducer,
  },
  // Bắt buộc thêm middleware để tận dụng tính năng caching, tự động refetch của RTK Query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware),
});
// Kích hoạt tính năng refetch dữ liệu khi người dùng chuyển tab rồi quay lại (không bắt buộc nhưng nên có)
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
