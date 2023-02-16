import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.reducer';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
	ProductCardContainer,
	Footer,
	Name,
	Price,
} from './product-card.styles.jsx';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const { name, price, imageUrl } = product;

	const addProductToCart = () => dispatch(addItemToCart(product));

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={name} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductToCart}>
				Add to cart
			</Button>
		</ProductCardContainer>
	);
};

export default ProductCard;
