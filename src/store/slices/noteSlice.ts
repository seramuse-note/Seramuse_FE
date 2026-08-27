import type { Note } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Note = {
  id: '',
  title: '',
  mood_id: '',
  blocks: [],
  created_at: '',
  updated_at: '',
  tags: [],
  is_favorite: false,
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setNotes } = noteSlice.actions;
export default noteSlice.reducer;
