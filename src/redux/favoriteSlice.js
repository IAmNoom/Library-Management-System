import { createSlice } from '@reduxjs/toolkit';

/**
 * favoriteSlice - Manages favorited books and favorite counter.
 *
 * State:
 *   - favoriteCount: number of favorited books
 *   - favoriteIds: array of favorited book IDs
 *
 * Actions:
 *   - toggleFavorite: toggles a book ID in favorites list and syncs count
 *   - incrementFavorite: increases count by 1
 *   - decrementFavorite: decreases count by 1 (min 0)
 *   - resetFavorite: resets count to 0 and clears favoriteIds
 */
const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteCount: 0,
    favoriteIds: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const bookId = String(action.payload);
      const index = state.favoriteIds.indexOf(bookId);
      if (index >= 0) {
        state.favoriteIds.splice(index, 1);
        if (state.favoriteCount > 0) {
          state.favoriteCount -= 1;
        }
      } else {
        state.favoriteIds.push(bookId);
        state.favoriteCount += 1;
      }
    },
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
      state.favoriteIds = [];
    },
  },
});

// Export actions for dispatching
export const { toggleFavorite, incrementFavorite, decrementFavorite, resetFavorite } =
  favoriteSlice.actions;

// Export reducer for store configuration
export default favoriteSlice.reducer;

