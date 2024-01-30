import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { subRedditLinks } from './mock-api/api';


const data = subRedditLinks;

export const fetchLinks = createAsyncThunk('subReddits/fetchLinks',
async () => {
  try {
    const response = await data;
    return response;

  } catch (error) {
    return console.log(error);
  }
});

// Slice
export const subRedditsSlice = createSlice({
  name: 'subReddit',
  initialState: {
    subReddits: [
      {
        title: null,
        id: null,
        url: null,
    }
    ],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchLinks.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
      console.log('fetchLinks is pending.');
    })
    .addCase(fetchLinks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.subReddits = action.payload;
    })
    .addCase(fetchLinks.rejected, (state, action) => {
      state.isLoading = false;
        state.hasError = true;
        console.log(
          'An error in fetchPosts has occurred. ' + action.error);
    })
  }
});

// Action creators

// Selectors

export const loadLinks = (state) => state.subReddits;


export default subRedditsSlice.reducer;
