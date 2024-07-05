import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const COMMENTS_URL = 'https://www.reddit.com/r/';

export const fetchComments = createAsyncThunk(
	'comments/fetchComments',
	async (postInfo) => {
		try {
			const response = await fetch(
				COMMENTS_URL +
					postInfo.subreddit +
					'/comments/' +
					postInfo.singlePostId +
					'.json'
			);
			const json = await response.json();

			return json;
		} catch (error) {
			return error.message;
		}
	}
);

// Slice
export const commentsSlice = createSlice({
	name: 'comments',
	initialState: {
		comments: [],
		isLoading: false,
		hasError: false,
	},
	reducers: {
		setLocalComments: (state) => {
			localStorage.setItem('comments', JSON.stringify(state.comments)); // Sends the fetched state to localStorage for persistedState.
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchComments.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
				state.comments = action.payload[1].data.children;
				console.log('fetchComments is fulfilled.');
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
				console.error(
					'An error in fetchComments has occurred. ' + action.error.message
				);
			});
	},
});

// Action creators
export const { setLocalComments } = commentsSlice.actions;
// Selectors
export const loadAllComments = (state) => state.comments.comments;
export const commentLoading = (state) => state.comments.isLoading;
export const commentError = (state) => state.comments.hasError;

export default commentsSlice.reducer;
