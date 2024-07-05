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
			return console.log('Fetching posts failed: ' + error.message);
		}
	}
);

// Slice
export const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		nextPosts: [],
		nextPage: 3,
		firstLoad: false,
		isLoadingMore: false,
		hasError: false,
		payloadEmpty: false,
		lastPostId: null,
	},
	reducers: {
		setLocalPosts: (state) => {
			localStorage.setItem('posts', JSON.stringify(state.posts));
		},
		setLocalNextPosts: (state) => {
			localStorage.setItem('nextPosts', JSON.stringify(state.nextPosts));
		},
		rehydratePosts: (state) => {
			const persistedState = JSON.parse(localStorage.getItem('posts'));
			state.posts = persistedState;
		},
		rehydrateNextPosts: (state) => {
			const persistedState = JSON.parse(localStorage.getItem('nextPosts'));
			state.nextPosts = persistedState;
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
		getLastPostId: (state) => {
			console.log();
		},
	},
	extraReducers: (builder) => {
		builder
			//------------ FETCH POSTS -----------
			.addCase(fetchPosts.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;

				if (!action.payload) {
					console.log('Payload is empty.');
					state.payloadEmpty = false;
				} else {
					state.posts = action.payload.children;
					console.log('fetchPosts is fulfilled.');
				}
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
				console.error(
					'An error in fetchPosts has occurred. Error:' + action.error.message
				);
			})
			// --------------- FETCH NEXT POSTS -----------
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

				if (!action.payload) {
					console.log('Payload is empty.');
					state.payloadEmpty = false;
				} else {
					state.nextPosts = action.payload.children;
				}
			})
			.addCase(fetchNextPosts.rejected, (state, action) => {
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
export const {
	setLocalPosts,
	setLocalNextPosts,
	rehydratePosts,
	rehydrateNextPosts,
	rehydrateNextPage,
	rehydratePayloadEmpty,
	addNextPage,
	getLastPostId,
} = postsSlice.actions;

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

export default postsSlice.reducer;
