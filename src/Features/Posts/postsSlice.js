import { createSlice } from "@reduxjs/toolkit";

// Slice
export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [] 
    },
    reducers: {

    }
})

// Action creators

// Selectors

export default postsSlice.reducer;