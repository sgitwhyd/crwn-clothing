import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => {
	return state.categories;
};

export const selectCategories = createSelector(
	[selectCategoryReducer],
	(categorySlice) => {
		return categorySlice.categories;
	}
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories) => {
		return categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {});
	}
);

export const selectIsCategoriesLoading = createSelector(
	selectCategoryReducer,
	(categoriesSlice) => categoriesSlice.isLoading
);
