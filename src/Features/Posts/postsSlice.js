import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const PAGE_URL = 'https://jsonplaceholder.typicode.com/posts?_page=';

export const fetchPage = createAsyncThunk(
	'posts/fetchPage',
	async (nextPage) => {
		try {
			const response = await fetch(PAGE_URL + nextPage);
			const json = await response.json();

			return json;
		} catch (error) {
			return error.message;
		}
	}
);

// Slice
export const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		currentPage: 1,
		nextPage: 2,
		firstLoad: false,
		isLoadingMore: false,
		hasError: false,
	},
	reducers: {
		rehydratePosts: (state) => {
			const persistedState = JSON.parse(localStorage.getItem('posts'));
			state.posts = persistedState;
		},
		addPage: (state) => {
			state.nextPage = state.nextPage + 1;
		},
		addCurrentPage: (state) => {
			state.currentPage = state.currentPage + 1;
		},
	},
	extraReducers: (builder) => {
		builder 
			//------------ FETCH PAGE -----------
			.addCase(fetchPage.pending, (state) => {
				if (state.posts.length === 0) { // If this is the first load
					state.firstLoad = true; 	// set state.firstLoad to true.
				} else {
					state.isLoadingMore = true;
				}
				state.hasError = false;
			})
			.addCase(fetchPage.fulfilled, (state, action) => {
				state.isLoadingMore = false;
				state.firstLoad = false;
				state.hasError = false;

				const isEmpty = action.payload.length;

				if (isEmpty === 0) {
					console.log('No more posts for you.');
				} else {
					state.posts = state.posts.concat(action.payload);
					localStorage.setItem('posts', JSON.stringify(state.posts));
				}
			})
			.addCase(fetchPage.rejected, (state, action) => {
				state.isLoadingMore = false;
				state.firstLoad = false;
				state.hasError = true;
				console.error(
					'An error in fetchPosts has occurred. ' + action.error.message
				);
			});
	},
});

// Action creators
export const { rehydratePosts } = postsSlice.actions;
export const { addPage } = postsSlice.actions;
export const { addCurrentPage } = postsSlice.actions;

// Selectors
export const loadAllPosts = (state) => state.posts.posts;
export const postLoading = (state) => state.posts.firstLoad;
export const loadingMorePosts = (state) => state.posts.isLoadingMore;
export const postError = (state) => state.posts.hasError;
export const postNextPage = (state) => state.posts.nextPage;
export const postCurrentPage = (state) => state.posts.currentPage;

export default postsSlice.reducer;
