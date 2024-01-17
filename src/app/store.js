import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../Features/Home/homeSlice';
import postReducer from '../Features/Posts/Posts';
import searchResultsReducer from '../Features/SearchResults/SearchResults';
import subRedditsReducer from '../Features/SubReddit/SubReddits';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    posts: postReducer,
    searchResults: searchResultsReducer,
    subReddits: subRedditsReducer,
  },
});
