import { createSlice } from "@reduxjs/toolkit";

// Slice
export const subRedditsSlice = createSlice({
    name: 'subReddit',
    initialState: {
        subReddits: [] 
    },
    reducers: {

    }
})

// Action creators

// Selectors

export default subRedditsSlice.reducer;