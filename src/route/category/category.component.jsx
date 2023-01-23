import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, Title } from './category.styles.jsx';

const Category = () => {
	const [products, setProducts] = useState([]);
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<Title>{category.toLocaleUpperCase()}</Title>
			<CategoryContainer>
				{products &&
					products?.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</CategoryContainer>
		</>
	);
};

export default Category;
