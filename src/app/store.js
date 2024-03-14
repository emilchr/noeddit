import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../Features/Posts/postsSlice';
import commentsReducer from '../Features/Comments/commentsSlice';
import searchResultsReducer from '../Features/SearchResults/searchResultsSlice';
import subRedditsReducer from '../Features/SubReddit/subRedditsSlice';

export const store = configureStore({
	reducer: {
		comments: commentsReducer,
		posts: postsReducer,
		searchResults: searchResultsReducer,
		subReddits: subRedditsReducer,
	},
});
