import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});
	const value = {
		categoriesMap,
	};

	useEffect(() => {
		const getCategories = async () => {
			const categories = await getCategoriesAndDocuments();
			setCategoriesMap(categories);
		};

		getCategories();
	}, []);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
