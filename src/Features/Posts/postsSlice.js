import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const PAGE_URL = 'https://www.reddit.com/r/';

export const fetchNextPosts = createAsyncThunk(
	'posts/fetchNextPosts',
	async (nextPostInfo) => {
		let subreddit = nextPostInfo.currentSubreddit;
		let lastId = nextPostInfo.lastId;
		try {
			const response = await fetch(
				`${PAGE_URL}${subreddit}.json?after=t3_${lastId}`,
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
		nextPosts: null,
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
			if (state.nextPosts) {
				localStorage.setItem('nextPosts', JSON.stringify(state.nextPosts));
			} else {
				console.log('No nextposts to set in localstorage');
			}
		},
		rehydratePosts: (state) => {
			const persistedState = JSON.parse(localStorage.getItem('posts'));
			state.posts = persistedState;
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
		addNextPosts: (state) => {
			//Updates localStorage to current nextPosts.

			localStorage.setItem(
				'posts',
				JSON.stringify(state.posts.concat(state.nextPosts))
			);

			state.posts = state.posts.concat(state.nextPosts);
		},
		getLastPostId: (state) => {
			let posts = JSON.parse(JSON.stringify(state));
			const lastItem = posts.posts[posts.posts.length - 1]; // selects the last post
			const lastItemId = lastItem.data.id; // selects the last ID from the last post
			console.log(`lastItemID: ${lastItemId}`);
			state.lastPostId = lastItemId; // sets the last post ID in the state lastPostId.
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

				state.nextPosts = action.payload.children;
				console.log('Fetch nextPosts is fulfilled.');
			})
			.addCase(fetchNextPosts.rejected, (state, action) => {
				state.isLoadingMore = false;
				state.firstLoad = false;
				state.hasError = true;
				console.error(
					'An error in fetchNextPosts has occurred. Error: ' +
						action.error.message
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
	rehydratePayloadEmpty,
	getLastPostId,
	addNextPosts,
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
export const lastPostId = (state) => state.posts.lastPostId;

// page states

export default postsSlice.reducer;
