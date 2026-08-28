import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '@/services';
import tagReducer from './slices/filterSlice';
import noteReducer from './slices/noteSlice';
import UIReducer from './slices/uiSlice';
import uiNoteReducer from './slices/noteUiSlice';

export const store = configureStore({
  reducer: {
    ui: UIReducer,
    uiNote: uiNoteReducer,
    filter: tagReducer,
    notes: noteReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
