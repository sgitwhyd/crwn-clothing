import { createSelector } from "reselect";
import { UserStates } from "./user.reducer";
import { RootState } from "../store";

const selectUserReducer = (state: RootState): UserStates => state.user;

export const selectCurrentUser = createSelector(
	selectUserReducer,
	(user) => user.currentUser
);
