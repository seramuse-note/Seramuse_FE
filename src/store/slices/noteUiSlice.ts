import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
  activeNoteId: string | null;
  isNavCollapsed: boolean;
}

const initialState: UIState = {
  activeNoteId: null,
  isNavCollapsed: false,
};

export const noteUiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    selectNote: (state, action) => {
      state.activeNoteId = action.payload;
    },
    closeNote: (state) => {
      state.activeNoteId = null;
    },
    toggleNav: (state) => {
      state.isNavCollapsed = !state.isNavCollapsed;
    },
  },
});

export const { selectNote, closeNote, toggleNav } = noteUiSlice.actions;
export default noteUiSlice.reducer;
