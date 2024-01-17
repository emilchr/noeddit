import { createSlice } from "@reduxjs/toolkit";

// Slice
export const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState: {
        searchResults: [], 
        isLoading: false,
        hasError: false 
    },
    reducers: {

    }
})

// Action creators

// Selectors

export default searchResultsSlice.reducer;