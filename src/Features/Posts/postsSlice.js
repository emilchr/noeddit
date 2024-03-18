import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/albums/1/photos';


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	try {
		const response = await fetch(POST_URL);
		const json = await response.json();

		return json
	} catch (error) {
		return error.message;
	}
});

export const fetchPhotos = createAsyncThunk('posts/fetchPhotos', async () => {
	try {
		const response = await fetch(PHOTOS_URL);
		const json = await response.json();

		return json;
	} catch (error) {
		return error.message;
	}
});


// Slice
export const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		photos: [],
		isLoading: false,
		hasError: false,
	},
	reducers: {
		rehydratePosts: (state) => {
			
			const persistedState = JSON.parse(localStorage.getItem('posts'));
			state.posts = persistedState;
			
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
			.addCase(fetchPhotos.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
				
			})
			.addCase(fetchPhotos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
				state.photos = action.payload;
				console.log('fetchPhotos is fetched.');
			})
			.addCase(fetchPhotos.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
				console.error(
					'An error in fetchPhotos has occurred. ' + action.error.message
				);
			});
	},
});

// Action creators

export const { rehydratePosts } = postsSlice.actions

// Selectors
export const loadAllPosts = (state) => state.posts.posts;

export const loadAllPhotos = (state) => state.posts.photos;

export const postLoading = (state) => state.posts.isLoading;
export const postError = (state) => state.posts.hasError;

export default postsSlice.reducer;
