import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const PAGE_URL = 'https://jsonplaceholder.typicode.com/posts?_page=';

export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts', 
	async () => {
		try {
			const response = await fetch(POST_URL);
			const json = await response.json();

			return json
		} catch (error) {
			return error.message;
		}
});

export const fetchPage = createAsyncThunk(
	'posts/fetchPage', 
	async (nextPage) => {
		try{
		const response = await fetch(PAGE_URL + nextPage);
		const json = await response.json();

		return json;
		} catch(error){
			return error.message;
		}
	});

// Slice
export const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		currentPage: 1,
		nextPage: 2,
		isLoading: false,
		hasError: false,
	},
	reducers: {
		rehydratePosts: (state) => {
			
			const persistedState = JSON.parse(localStorage.getItem('posts'));
			state.posts = persistedState;
			
		},
		addPage: (state) => {
	
			state.nextPage = state.nextPage + 1;

		}
		,
		addCurrentPage: (state) => {

			state.currentPage = state.currentPage + 1;

		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
			
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;

				state.posts = action.payload;
				console.log('fetchPosts is fulfilled.');
				localStorage.setItem('posts', JSON.stringify(state.posts))	// Sends the fetched state to localStorage for persistedState.			
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
				console.error(
					'An error in fetchPosts has occurred. ' + action.error.message
				);
			})
			.addCase(fetchPage.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
			
			})
			.addCase(fetchPage.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
				
				const isEmpty = action.payload.length;

				if (isEmpty === 0){
					console.log('No more posts for you.')
				} else {
					state.posts = state.posts.concat(action.payload);
					localStorage.setItem('posts', JSON.stringify(state.posts))
				}
			})
			.addCase(fetchPage.rejected, (state, action) => {
				state.isLoading = false;
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
export const postLoading = (state) => state.posts.isLoading;
export const postError = (state) => state.posts.hasError;
export const postNextPage = (state) => state.posts.nextPage;
export const postCurrentPage = (state) => state.posts.currentPage;

export default postsSlice.reducer;
