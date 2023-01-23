import { createSelector } from 'reselect';
import { CART_ACTION_TYPE } from './cart.type';

import { createAction } from '../../utils/reducers/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
	// Check if product is already in cart

	const productIsExist = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	// If it is, increase quantity by 1

	if (productIsExist) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// if not, add it to the cart with quantity 1

	return [
		...cartItems,
		{
			...productToAdd,
			quantity: 1,
		},
	];
};

const clearItemFromCart = (cartItems, productToRemove) => {
	const productIsExist = cartItems.find(
		(item) => item.id === productToRemove.id
	);

	if (productIsExist.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
	}

	if (productIsExist) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToRemove.id
				? {
						...cartItem,
						quantity: cartItem.quantity - 1,
				  }
				: cartItem
		);
	}
};

const removeProductInCart = (cartItems, productToRemove) => {
	return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const removeItemCart = (cartItems, productToRemove) => {
	const newCartItems = clearItemFromCart(cartItems, productToRemove);
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const clearItemCart = (cartItems, productToRemove) => {
	const newCartItems = removeProductInCart(cartItems, productToRemove);
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (boolean) => {
	return createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, boolean);
};
