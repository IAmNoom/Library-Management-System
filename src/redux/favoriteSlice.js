import { createSlice } from '@reduxjs/toolkit';

/**
 * favoriteSlice - Manages the favorite books counter.
 *
 * State:
 *   - favoriteCount: number of favorited books
 *
 * Actions:
 *   - incrementFavorite: increases count by 1
 *   - decrementFavorite: decreases count by 1 (min 0)
 *   - resetFavorite: resets count to 0
 */
const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteCount: 0,
  },
  reducers: {
    incrementFavorite: (state) => {
      state.favoriteCount += 1;
    },
    decrementFavorite: (state) => {
      if (state.favoriteCount > 0) {
        state.favoriteCount -= 1;
      }
    },
    resetFavorite: (state) => {
      state.favoriteCount = 0;
    },
  },
});

// Export actions for dispatching
export const { incrementFavorite, decrementFavorite, resetFavorite } = favoriteSlice.actions;

// Export reducer for store configuration
export default favoriteSlice.reducer;
