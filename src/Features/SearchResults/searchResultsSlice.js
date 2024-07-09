import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const QUERY_URL = 'https://www.reddit.com/search.json?q=';

// Thunks
export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (searchQuery) => {
    try {
      const response = await fetch(`${QUERY_URL}${searchQuery}&limit=50`);
      const json = await response.json();

      return json.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Slice
export const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: {
    searchResults: [],
    searchQuery: '',
    isLoading: false,
    hasError: false,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //------------ FETCH SEARCHRESULT -----------
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;

        if (!action.payload) {
          console.log('Payload is empty.');
          state.payloadEmpty = false;
        } else {
          state.searchResults = action.payload.children;
          console.log('fetchSearchResults is fulfilled.');
        }
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error(
          'An error in fetchSearchResults has occurred. Error:' +
            action.error.message
        );
      });
  },
});

// Action creators
export const { setSearchQuery } = searchResultsSlice.actions;
// Selectors
export const searchQuery = (state) => state.searchResults.searchQuery;
export const searchResults = (state) => state.searchResults.searchResults;

export default searchResultsSlice.reducer;
