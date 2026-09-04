import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type NavTabId = 'note-list' | 'chart';

export interface UIState {
  activeNoteId: string | null;
  isNavCollapsed: boolean;
  activeNavContent: NavTabId;
}

const initialState: UIState = {
  activeNoteId: null,
  isNavCollapsed: false,
  activeNavContent: 'note-list',
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
      state.isNavCollapsed = false;
    },
    toggleNav: (state) => {
      state.isNavCollapsed = !state.isNavCollapsed;
    },
    setActiveNavContent: (state, action: PayloadAction<NavTabId>) => {
      state.activeNavContent = action.payload;
    },
  },
});

export const { selectNote, closeNote, toggleNav, setActiveNavContent } = noteUiSlice.actions;
export default noteUiSlice.reducer;
