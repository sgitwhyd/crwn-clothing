import { CART_ACTION_TYPE } from './cart.type';

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPE.SET_CART_ITEMS:
			return {
				...state,
				cartItems: payload,
			};
		case CART_ACTION_TYPE.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			return state;
	}
};
