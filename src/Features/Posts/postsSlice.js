import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const PAGE_URL = 'https://www.reddit.com/r/';

export const fetchNextPosts = createAsyncThunk(
	'posts/fetchNextPosts',
	async (subreddit, lastId) => {
		try {
			const response = await fetch(
				`${PAGE_URL}${subreddit}.json?after=${lastId}`,
				{
					header: 'Access-Control-Allow-Origin: *',
					mode: 'cors',
				}
			);
			const json = await response.json();

			return json.data;
		} catch (error) {
			return console.log(error.message);
		}
	}
);

export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async (subreddit) => {
		try {
			const response = await fetch(`${PAGE_URL}${subreddit}.json`, {
				header: 'Access-Control-Allow-Origin: *',
				mode: 'cors',
			});
			const json = await response.json();

			return json.data;
		} catch (error) {
			return console.log(error.message);
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
		payloadEmpty: false,
	},
	reducers: {
		rehydratePosts: (state) => {
			const persistedState = JSON.parse(localStorage.getItem('posts'));
			state.posts = persistedState;
		},
		rehydrateNextPosts: (state) => {
			const persistedState = JSON.parse(localStorage.getItem('nextPosts'));
			state.nextPosts = persistedState;
		},
		rehydrateCurrentPage: (state) => {
			const persistedCurrentPage = JSON.parse(
				localStorage.getItem('currentPage')
			);
			state.currentPage = persistedCurrentPage;
		},
		rehydrateNextPage: (state) => {
			const persistedNextPage = JSON.parse(localStorage.getItem('nextPage'));
			state.nextPage = persistedNextPage;
		},
		rehydratePayloadEmpty: (state) => {
			const persistedNextPage = JSON.parse(
				localStorage.getItem('payloadEmpty')
			);
			state.payloadEmpty = persistedNextPage;
		},
		addNextPage: (state) => {
			state.nextPage += 1;
			//Updates localStorage to current nextPage.
			localStorage.setItem(
				'posts',
				JSON.stringify(state.posts.concat(state.nextPosts))
			);

			state.posts = state.posts.concat(state.nextPosts);
		},
		addCurrentPage: (state) => {
			state.currentPage += 1;
		},
	},
	extraReducers: (builder) => {
		builder
			//------------ FETCH PAGE -----------
			.addCase(fetchNextPosts.pending, (state) => {
				if (state.posts.length === 0) {
					// If this is the first loading of posts.
					state.firstLoad = true; // set state.firstLoad to true.
				} else if (!state.firstLoad) {
					state.isLoadingMore = true;
				}
				state.hasError = false;
			})
			.addCase(fetchNextPosts.fulfilled, (state, action) => {
				state.isLoadingMore = false;
				state.firstLoad = false;
				state.hasError = false;

				const isEmpty = action.payload.length;
				if (isEmpty === 0) {
					// if payload is empty log result
					console.log('Payload is empty.');
					state.payloadEmpty = true;
					localStorage.setItem(
						'payloadEmpty',
						JSON.stringify(state.payloadEmpty)
					);
				} else {
					if (state.posts.length === 0) {
						// If there is no posts in array, state.posts is hydrated.
						state.posts = action.payload;
						localStorage.setItem('posts', JSON.stringify(state.posts));
						console.log('fetchNextPosts is fulfilled. First load.');
					} else {
						state.nextPosts = action.payload;
						localStorage.setItem('nextPosts', JSON.stringify(state.nextPosts));
						console.log('fetchNextPosts is fulfilled. Next page loaded.');
					}
				}
			})
			.addCase(fetchNextPosts.rejected, (state, action) => {
				state.isLoadingMore = false;
				state.firstLoad = false;
				state.hasError = true;
				console.error(
					'An error in fetchPosts has occurred. ' + action.error.message
				);
			})
			.addCase(fetchPosts.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
				console.log('fetchPosts is fulfilled.');
				if (!action.payload) {
					console.log('Payload is empty.');
				} else {
					state.posts = action.payload.children;
				}
				// state.posts.map((post) => {
				// 	post.data.keyId = uuid;
				// })
				// console.log(action.payload.children);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
				console.error(
					'An error in fetchPosts has occurred. Error:' + action.error.message
				);
			});
	},
});

// Action creators
export const { rehydratePosts } = postsSlice.actions;
export const { rehydrateNextPosts } = postsSlice.actions;
export const { rehydrateCurrentPage } = postsSlice.actions;
export const { rehydrateNextPage } = postsSlice.actions;
export const { rehydratePayloadEmpty } = postsSlice.actions;
export const { addNextPage } = postsSlice.actions;
export const { addCurrentPage } = postsSlice.actions;

// Selectors
// post states
export const loadAllPosts = (state) => state.posts.posts;
export const loadNextPosts = (state) => state.posts.nextPosts;
// loading and error states
export const postFirstLoad = (state) => state.posts.firstLoad;
export const postLoading = (state) => state.posts.isLoading;
export const loadingMorePosts = (state) => state.posts.isLoadingMore;
export const postError = (state) => state.posts.hasError;
export const payloadEmpty = (state) => state.posts.payloadEmpty;

// page states
export const postNextPage = (state) => state.posts.nextPage;
export const postCurrentPage = (state) => state.posts.currentPage;

export default postsSlice.reducer;
