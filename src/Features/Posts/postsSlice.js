import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPostById = createAsyncThunk(
    'posts/fetchPostById',
    async () => {
        try {
            const response = await fetch(POST_URL);
            const json = await response.json();
            
            return json;

        } catch(error) {
            return error.message;
        }
    }
)

// Slice
export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [], 
        isLoading: false,
        hasError: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPostById.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            console.log('Posts is pending.')
        })
        .addCase(fetchPostById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.posts = action.payload;
            console.log('Posts are fetched.');
        })
        .addCase(fetchPostById.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
            console.log('An error has occurred.')
        })
    }
})

// Action creators

// Selectors
export const fetchPosts = state => state.posts.posts;
export const isLoading = state => state.posts.isLoading;
export const hasError = state => state.posts.hasError;

export default postsSlice.reducer;