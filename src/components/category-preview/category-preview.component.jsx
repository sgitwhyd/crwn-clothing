import ProductCard from '../product-card/product-card.component';

import {
	CategoryPreviewContainer,
	Preview,
	CategoryTitle,
} from './category-preview.styles.jsx';

const CategoryPreview = ({ title, products }) => {
	return (
		<CategoryPreviewContainer>
			<h2>
				<CategoryTitle to={`${title}`}>{title}</CategoryTitle>
			</h2>
			<Preview>
				{products
					.filter((_, index) => index < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</Preview>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;
