import { createSlice } from '@reduxjs/toolkit';

// Slice
export const userUiSlice = createSlice({
	name: 'userUi',
	initialState: {
		showMenu: false,
		showSearch: false,
		activeSubreddit: 'Popular',
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
		rehydrateActiveSubreddit: (state) => {
			const persistedSubreddit = JSON.parse(
				localStorage.getItem('activeSubreddit')
			);
			state.activeSubreddit = persistedSubreddit;
		},
	},
});

// Action creators
export const {
	toggleMenu,
	toggleSearch,
	setSubreddit,
	rehydrateActiveSubreddit,
	setWindowWidth,
} = userUiSlice.actions;

// Selectors
export const menuState = (state) => state.userUi.showMenu;
export const searchState = (state) => state.userUi.showSearch;
export const activeSubreddit = (state) => state.userUi.activeSubreddit;
export const winWidth = (state) => state.userUi.windowWidth;

export default userUiSlice.reducer;
