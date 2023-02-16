import { createSlice } from '@reduxjs/toolkit';

const CATEGORIES_INITIAL_STATE = {
	categories: [],
	isLoading: false,
	error: null,
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: CATEGORIES_INITIAL_STATE,
	reducers: {
		fetchCategoriesStart(state, action) {
			state.isLoading = true;
		},
		fetchCategoriesSuccess(state, action) {
			state.isLoading = false;
			state.categories = action.payload;
		},
		fetchCategoriesFailed(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchCategoriesFailed,
	fetchCategoriesStart,
	fetchCategoriesSuccess,
} = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
