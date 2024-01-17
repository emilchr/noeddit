import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../Features/Home/homeSlice';
import postsReducer from '../Features/Posts/postsSlice';
import searchResultsReducer from '../Features/SearchResults/searchResultsSlice';
import subRedditsReducer from '../Features/SubReddit/subRedditsSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    posts: postsReducer,
    searchResults: searchResultsReducer,
    subReddits: subRedditsReducer,
  },
});
