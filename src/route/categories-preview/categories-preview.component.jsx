import { useSelector } from 'react-redux';

import {
	selectCategoriesMap,
	selectIsCategoriesLoading,
} from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectIsCategoriesLoading);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map((category) => {
					const products = categoriesMap[category];
					return (
						<CategoryPreview
							key={category}
							title={category}
							products={products}
						/>
					);
				})
			)}
		</>
	);
};

export default CategoriesPreview;
