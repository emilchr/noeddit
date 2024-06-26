import { createSlice } from '@reduxjs/toolkit';

// Slice
export const userUiSlice = createSlice({
	name: 'userUi',
	initialState: {
		showMenu: false,
		showSearch: false,
		activeSubreddit: '',
		windowWidth: '',
	},
	reducers: {
		toggleMenu: (state) => {
			!state.showMenu ? (state.showMenu = true) : (state.showMenu = false);
		},
		toggleSearch: (state) => {
			!state.showSearch
				? (state.showSearch = true)
				: (state.showSearch = false);
		},
		setSubreddit: (state, action) => {
			state.activeSubreddit = action.payload;
		},
		setWindowWidth: (state, action) => {
			state.windowWidth = action.payload;
		},
	},
});

// Action creators
export const { toggleMenu } = userUiSlice.actions;
export const { toggleSearch } = userUiSlice.actions;
export const { setSubreddit } = userUiSlice.actions;
export const { setWindowWidth } = userUiSlice.actions;

// Selectors
export const menuState = (state) => state.userUi.showMenu;
export const searchState = (state) => state.userUi.showSearch;
export const activeSubreddit = (state) => state.userUi.activeSubreddit;
export const winWidth = (state) => state.userUi.windowWidth;

export default userUiSlice.reducer;
