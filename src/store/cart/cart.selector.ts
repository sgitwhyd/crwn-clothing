import { createSelector } from "reselect";
import { CartTypes } from "./cart.reducer";
import { RootState } from "../store";

const selectCartReducer = (state: RootState): CartTypes => state.cart;

export const selectCartItems = createSelector(
	selectCartReducer,
	(cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
	selectCartReducer,
	(cart) => cart.isCartOpen
);

export const selectCartCount = createSelector(selectCartItems, (cartItems) =>
	cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectTotalCart = createSelector(selectCartItems, (cartItems) =>
	cartItems.reduce(
		(total, cartItem) => total + cartItem.price * cartItem.quantity,
		0
	)
);
