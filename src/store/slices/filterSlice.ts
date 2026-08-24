import type { FilterState, Mood, Tag } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const initialState: FilterState = {
  tags: [],
  moods: [],
};
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    setMoods: (state, action: PayloadAction<Mood[]>) => {
      state.moods = action.payload;
    },
  },
});

export const { setMoods, setTags } = filterSlice.actions;

export default filterSlice.reducer;
