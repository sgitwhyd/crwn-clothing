import { CartItem } from "./cart.type";
import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartTypes = {
	readonly isCartOpen: boolean;
	readonly cartItems: CartItem[];
};

const CART_INITIAL_STATE: CartTypes = {
	isCartOpen: false,
	cartItems: [],
};

export const cartReducer = (
	state = CART_INITIAL_STATE,
	action: AnyAction
): CartTypes => {
	const { payload } = action;

	if (setCartItems.match(action)) {
		return {
			...state,
			cartItems: payload,
		};
	}

	if (setIsCartOpen.match(action)) {
		return {
			...state,
			isCartOpen: payload,
		};
	}

	return state;
};
