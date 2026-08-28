import { LAYOUT_MODE, type LayoutMode } from '@/types/layout.types';
import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
  activeNoteId: string | null;
  layoutMode: LayoutMode;
}

const initialState: UIState = {
  activeNoteId: null,
  layoutMode: LAYOUT_MODE.FULL_SIDEBAR,
};

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    setActiveNoteId: (state, action) => {
      state.activeNoteId = action.payload;
    },
    setClose: (state, action) => {
      state.activeNoteId = action.payload;
    },
    setLayoutMode: (state, action) => {
      state.layoutMode = action.payload;
    },
  },
});

export const { setActiveNoteId, setClose, setLayoutMode } = uiSlice.actions;
export default uiSlice.reducer;
