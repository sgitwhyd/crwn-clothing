import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import { CategoryContainer, Title } from './category.styles.jsx';

const Category = () => {
	const [products, setProducts] = useState([]);
	const { category } = useParams();
	const { categoriesMap } = useContext(CategoriesContext);

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
