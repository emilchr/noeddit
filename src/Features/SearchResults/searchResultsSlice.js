import { createSlice } from "@reduxjs/toolkit";

// Slice
export const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState: {
        searchResults: [] 
    },
    reducers: {

    }
})

// Action creators

// Selectors

export default searchResultsSlice.reducer;