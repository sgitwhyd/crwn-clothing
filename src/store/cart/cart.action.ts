import { CART_ACTION_TYPE, CartItem } from "./cart.type";

import {
	ActionWithPayload,
	createAction,
	withMatcher,
} from "../../utils/reducers/reducer.utils";
import { CategoryItem } from "../categories/category.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) => {
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

const clearItemFromCart = (
	cartItems: CartItem[],
	productToRemove: CartItem
) => {
	const productIsExist = cartItems.find(
		(item) => item.id === productToRemove.id
	);

	if (productIsExist && productIsExist.quantity === 1) {
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

export type SetIsCartOpen = ActionWithPayload<
	CART_ACTION_TYPE.SET_IS_CART_OPEN,
	boolean
>;

export type SetCartItems = ActionWithPayload<
	CART_ACTION_TYPE.SET_CART_ITEMS,
	CartItem[]
>;

export const setIsCartOpen = withMatcher((boolean: boolean) => {
	return createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, boolean);
});

export const setCartItems = withMatcher((cartItems: CartItem[]) => {
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems);
});

const removeProductInCart = (
	cartItems: CartItem[],
	productToRemove: CartItem
) => {
	return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const addItemToCart = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newCartItems);
};

export const removeItemCart = (
	cartItems: CartItem[],
	productToRemove: CartItem
) => {
	const newCartItems = clearItemFromCart(cartItems, productToRemove);
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const clearItemCart = (
	cartItems: CartItem[],
	productToRemove: CartItem
) => {
	const newCartItems = removeProductInCart(cartItems, productToRemove);
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};
