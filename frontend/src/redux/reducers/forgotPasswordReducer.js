import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../constants/globalConstants";

export const forgotPasswordReducer = createSlice({
	name: "forgotPassword",
	initialState: {
		message: null,
		success: null,
		error: null,
		loading: false,
	},
	reducers: {
		forgotPasswordRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		forgotPasswordSuccess: (state, action) => {
			state.loading = false;
			state.success = true;
			state.error = null;
			state.message = action.payload;
		},
		newPasswordSuccess: (state, action) => {
			state.loading = false;
			state.success = true;
			state.error = null;
			state.message = action.payload;
		},
		forgotPasswordFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearPasswordErrors: (state) => {
			state.error = null;
			state.success = null;
		},
	},
});

export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch(forgotPasswordRequest());
		const res = await axios.post(`${BACKEND_URL}/password/forgot`, email);
		dispatch(forgotPasswordSuccess(res.data.message));
	} catch (error) {
		dispatch(forgotPasswordFail(error.response.data.message));
	}
};
export const resetPassword = (token, passwords) => async (dispatch) => {
	try {
		dispatch(forgotPasswordRequest());
		const res = await axios.put(
			`${BACKEND_URL}/password/reset/${token}`,
			passwords
		);
		dispatch(newPasswordSuccess(res.data.user));
	} catch (error) {
		dispatch(forgotPasswordFail(error.response.data.message));
	}
};

export const {
	forgotPasswordRequest,
	forgotPasswordSuccess,
	newPasswordSuccess,
	forgotPasswordFail,
	clearPasswordErrors,
} = forgotPasswordReducer.actions;

export default forgotPasswordReducer.reducer;
