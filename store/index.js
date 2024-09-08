import { configureStore } from '@reduxjs/toolkit';
import panelReducer from './togglePanel';

const store = configureStore({
  reducer: {
    panel: panelReducer,
  },
});

export default store;
