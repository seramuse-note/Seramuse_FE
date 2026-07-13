import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    // Đăng ký các reducer của các feature tại đây
    // auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
