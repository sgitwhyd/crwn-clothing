import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';

import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage,
} from './cart-dropdown.styles.jsx';

const CartDropDown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const handleGoToCart = () => navigate('/checkout');

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={handleGoToCart}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropDown;
