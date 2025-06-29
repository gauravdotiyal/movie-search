import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import movieReducer from './movieSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    movies: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 