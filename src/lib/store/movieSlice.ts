import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieRating {
  movieId: string;
  rating: number;
}

interface MovieState {
  ratings: Record<string, number>;
  recentSearches: string[];
}

const initialState: MovieState = {
  ratings: {},
  recentSearches: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovieRating: (state, action: PayloadAction<MovieRating>) => {
      const { movieId, rating } = action.payload;
      state.ratings[movieId] = rating;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const search = action.payload;
      state.recentSearches = [
        search,
        ...state.recentSearches.filter(s => s !== search).slice(0, 4)
      ];
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
  },
});

export const { setMovieRating, addRecentSearch, clearRecentSearches } = movieSlice.actions;
export default movieSlice.reducer; 