import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
};

const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    openPanel(state) {
      state.isOpen = true;
    },
    closePanel(state) {
      state.isOpen = false;
    },
    togglePanel(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openPanel, closePanel, togglePanel } = panelSlice.actions;

export default panelSlice.reducer;
