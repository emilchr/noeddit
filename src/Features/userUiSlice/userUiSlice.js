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
		}
	},
});

// Action creators
export const { toggleMenu } = userUiSlice.actions;

// Selectors
export const menuState = (state) => state.userUi.showMenu;


export default userUiSlice.reducer;
