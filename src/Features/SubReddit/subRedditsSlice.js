import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { subRedditLinks } from './mock-api/api';

export const fetchLinks = createAsyncThunk(
	'subReddits/fetchLinks',
	async () => {
		try {
			const response = subRedditLinks();
			return response;
		} catch (error) {
			return console.log(error);
		}
	}
);

// Slice
export const subRedditsSlice = createSlice({
	name: 'subReddits',
	initialState: {
		subReddits: [
			{
				title: 'Test',
				id: 1,
				url: null,
			},
		],
		isLoading: false,
		hasError: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLinks.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
				console.log('fetchLinks is pending.');
			})
			.addCase(fetchLinks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
				console.log('fetchPosts is fulfilled.');
				state.subReddits = action.payload;
			})
			.addCase(fetchLinks.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
				console.error(
					'An error in fetchPosts has occurred. Error:' + action.error.message
				);
			});
	},
});

// Action creators

// Selectors

export const loadLinks = (state) => state.subReddits.subReddits;

export default subRedditsSlice.reducer;
