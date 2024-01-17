import { createSlice } from "@reduxjs/toolkit";

// Slice
export const subRedditsSlice = createSlice({
    name: 'subReddit',
    initialState: {
        subReddits: [], 
        isLoading: false,
        hasError: false 
    },
    reducers: {

    }
})

// Action creators

// Selectors

export default subRedditsSlice.reducer;