import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {
	CheckoutItemContainer,
	ImageContainer,
	Quantity,
	Arrow,
	RemoveButton,
	BaseSpan,
	Value,
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ cartItem }) => {
	const { name, quantity, imageUrl, price } = cartItem;

	const { addItemToCart, removeItemCart, clearItemCart } =
		useContext(CartContext);

	const increaseHandler = () => addItemToCart(cartItem);
	const decreaseHandler = () => removeItemCart(cartItem);
	const removeProductHandler = () => clearItemCart(cartItem);

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<BaseSpan>{name}</BaseSpan>
			<Quantity>
				<Arrow onClick={decreaseHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={increaseHandler}>&#10095;</Arrow>
			</Quantity>
			<BaseSpan>{price}</BaseSpan>
			<RemoveButton onClick={removeProductHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
