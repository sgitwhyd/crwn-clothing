import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage,
} from "./cart-dropdown.styles";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropDown = () => {
	const cartItems = useSelector(selectCartItems);
	const navigate = useNavigate();

	const handleGoToCart = useCallback(() => {
		navigate("/checkout");
	}, [navigate]);

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
