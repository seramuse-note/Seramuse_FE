import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  selectedMoodId: null,
  selectedTagId: null,
};
export const filterSlice = createSlice({
  name: 'filter',
  initialState: { initialState },
  reducers: {
    setSelectedTagId: (state, action) => {
      state.initialState.selectedTagId = action.payload;
    },
    setSelectedMoodId: (state, action) => {
      state.initialState.selectedMoodId = action.payload;
    },
    resetFilters: () => ({ initialState }),
  },
});

export const { setSelectedTagId, setSelectedMoodId, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
