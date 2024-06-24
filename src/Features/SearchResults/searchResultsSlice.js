import { createSlice } from '@reduxjs/toolkit';

// Slice
export const searchResultsSlice = createSlice({
	name: 'searchResults',
	initialState: {
		searchResults: [],
		searchQuery: '',
		isLoading: false,
		hasError: false,
	},
	reducers: {
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
		},
	},
});

// Action creators
export const { setSearchQuery } = searchResultsSlice.actions;
// Selectors
export const searchQuery = (state) => state.searchResults.searchQuery;

export default searchResultsSlice.reducer;
