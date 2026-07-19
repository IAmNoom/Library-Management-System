import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favoriteSlice';

/**
 * Redux store configuration.
 * Combines all slice reducers into a single store.
 */
export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
  },
});
