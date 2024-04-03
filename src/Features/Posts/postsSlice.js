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
		nextPosts: [],
		currentPage: null,
		nextPage: 3,
		firstLoad: false,
		isLoadingMore: false,
		hasError: false,
	},
	reducers: {
		rehydratePosts: (state) => {
			const persistedState = JSON.parse(localStorage.getItem('posts'));
			state.posts = persistedState;
		},
		rehydrateCurrentPage: (state) => {
			const persistedCurrentPage = JSON.parse(localStorage.getItem('currentPage'));
			state.currentPage = persistedCurrentPage;
		},
		rehydrateNextPage: (state) => {
			const persistedNextPage = JSON.parse(localStorage.getItem('nextPage'));
			state.currentPage = persistedNextPage;
		},
		addNextPage: (state) => {

			state.nextPage = state.nextPage + 1;

			localStorage.setItem('posts', JSON.stringify(state.posts.concat(state.nextPosts)));

			state.posts = state.posts.concat(state.nextPosts) 
			 
		},
		addCurrentPage: (state) => { 
			// !----------------TODO---------------------
			// !currentPage is reset when reloaded in /posts. Need to store it in localStorage.
			// !-----------------------------------------
			const persistedCurrentPage = JSON.parse(localStorage.getItem('currentPage'));
			

			if (state.currentPage === null){
				state.currentPage = state.currentPage + 2;
			} else {
				
				state.currentPage = state.currentPage + 1;
				
			 }
			
			
		},
	},
	extraReducers: (builder) => {
		builder
			//------------ FETCH PAGE -----------
			.addCase(fetchPage.pending, (state) => {
				if (state.posts.length === 0) {// If this is the first loading of posts.
					state.firstLoad = true; // set state.firstLoad to true.
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
				if (isEmpty === 0) { // if payload is empty log result
					console.log('Payload is empty.');
				} else {
					if (state.posts.length === 0) { // If there is no posts in array, state.posts is hydrated.
						state.posts = action.payload;
						localStorage.setItem('posts', JSON.stringify(state.posts));
						console.log('fetchPage is fulfilled. First load.');
					} else {
						//--------------------------------------
						// adds nextPosts to posts. This has to be refactored 
						// to show the nextPosts in PostList.
						//--------------------------------------
						state.nextPosts = action.payload;
						
						console.log('fetchPage is fulfilled. Next load complete.'); 
					}
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
export const { rehydrateCurrentPage } = postsSlice.actions;
export const { rehydrateNextPage } = postsSlice.actions;
export const { addNextPage } = postsSlice.actions;
export const { addCurrentPage } = postsSlice.actions;

// Selectors
// post states
export const loadAllPosts = (state) => state.posts.posts;
export const loadNextPosts = (state) => state.posts.nextPosts;
// loading and error states
export const postLoading = (state) => state.posts.firstLoad;
export const loadingMorePosts = (state) => state.posts.isLoadingMore;
export const postError = (state) => state.posts.hasError;

// page states
export const postNextPage = (state) => state.posts.nextPage;
export const postCurrentPage = (state) => state.posts.currentPage;

export default postsSlice.reducer;
