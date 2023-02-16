import {
	addItemToCart,
	removeItemCart,
	clearItemCart,
} from '../../store/cart/cart.reducer';

import { useDispatch } from 'react-redux';

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
	const dispatch = useDispatch();
	const { name, quantity, imageUrl, price } = cartItem;

	const increaseHandler = () => dispatch(addItemToCart(cartItem));
	const decreaseHandler = () => dispatch(removeItemCart(cartItem));
	const removeProductHandler = () => dispatch(clearItemCart(cartItem));

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
