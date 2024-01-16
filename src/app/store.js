import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../Features/Home/homeSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});
