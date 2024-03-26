import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments?';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
	try {
		const response = await fetch(COMMENTS_URL + 'postId=' + postId);
		const json = await response.json();

		return json;
	} catch (error) {
		return error.message;
	}
});



// Slice
export const commentsSlice = createSlice({
	name: 'comments',
	initialState: {
		comments: [],
		isLoading: false,
		hasError: false,
	},
	reducers: {
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
				state.comments = action.payload;
				console.log('fetchComments is fulfilled.');
				localStorage.setItem('comments', JSON.stringify(state.comments)) // Sends the fetched state to localStorage for persistedState.
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
				console.error(
					'An error in fetchComments has occurred. ' + action.error.message
				);
			})
	},
});

// Action creators


// Selectors
export const loadAllComments = (state) => state.comments.comments;
export const commentLoading = (state) => state.comments.isLoading;
export const commentError = (state) => state.comments.hasError;

export default commentsSlice.reducer;
