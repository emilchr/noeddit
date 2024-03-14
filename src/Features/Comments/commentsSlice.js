import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
	try {
		const response = await fetch(COMMENTS_URL);
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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchComments.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
				console.log('fetchComments is pending.');
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
				state.comments = action.payload;
				console.log('fetchComments are fetched.');
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
export const loadAllComments= (state) => state.comments.comments;


export default commentsSlice.reducer;
