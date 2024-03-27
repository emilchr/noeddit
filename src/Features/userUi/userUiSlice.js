import { createSlice } from '@reduxjs/toolkit';


// Slice
export const userUiSlice = createSlice({
	name: 'userUi',
	initialState: {
		showMenu: false,
		showSearch: false,
	},
	reducers: {
		toggleMenu: (state) => {
			!state.showMenu ?  state.showMenu = true : state.showMenu =  false;
		},
		toggleSearch: (state) => {
			!state.showSearch ?  state.showSearch = true : state.showSearch =  false;
		},
	},
});

// Action creators
export const { toggleMenu } = userUiSlice.actions;
export const { toggleSearch } = userUiSlice.actions;

// Selectors
export const menuState = (state) => state.userUi.showMenu;
export const searchState = (state) => state.userUi.showSearch;


export default userUiSlice.reducer;
