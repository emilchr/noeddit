import { createSlice } from "@reduxjs/toolkit";

// Slice
export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        home: ['1', '2'], 
        isLoading: false,
        hasError: false
    },
    reducers: {

    }
})

// Action creators

// Selectors

export default homeSlice.reducer;