import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { subRedditLinks } from './links/links';


export const fetchLinks = createAsyncThunk(
	'subReddits/fetchLinks',
	async () => {
		try {
			const response = await subRedditLinks();
			return response;
		} catch (error) {
			return console.log(error);
		}
	}
);

export const fetchSubReddit = createAsyncThunk(
	'subReddits/fetchSubReddit',
	async (subreddit) => {
		try {
			const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`, {
				header: 'Access-Control-Allow-Origin: *',
				mode: 'cors'
			});
			const json = await response.json();
			return json.data;
		} catch (error) {
			return console.log(error);
		}
	}
)

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
			})
			.addCase(fetchLinks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
				console.log('fetchLinks is fulfilled.');
				state.subReddits = action.payload;
			})
			.addCase(fetchLinks.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
				console.error(
					'An error in fetchLinks has occurred. Error:' + action.error.message
				);
			})
			.addCase(fetchSubReddit.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(fetchSubReddit.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
				console.log('fetchSubReddit is fulfilled.');
				state.posts = state.subReddits.concat(action.payload);
				console.log(action.payload)
				
			})
			.addCase(fetchSubReddit.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
				console.error(
					'An error in fetchSubReddit has occurred. Error:' + action.error.message
				);
			});
	},
});

// Action creators

// Selectors

export const loadLinks = (state) => state.subReddits.subReddits;

export default subRedditsSlice.reducer;
