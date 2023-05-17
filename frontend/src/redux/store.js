import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducers";
import postReducer from "./reducers/postReducer";
import forgotPasswordReducer from "./reducers/forgotPasswordReducer";
import commentReducers from "./reducers/commentReducers";
import groupsReducers from "./reducers/groupsReducers";

export default configureStore({
	reducer: {
		user: userReducer,
		forgotPassword: forgotPasswordReducer,
		post: postReducer,
		comment: commentReducers,
		group: groupsReducers,
	},
});
