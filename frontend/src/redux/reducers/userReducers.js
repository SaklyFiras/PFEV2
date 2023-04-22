import { combineReducers, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../constants/globalConstants";

const config = {
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
};

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		isAuthentificated: null,
		error: null,
		loading: false,
		validToken: null,
	},
	reducers: {
		// case LOGIN_REQUEST:
		// case REGISTER_USER_REQUEST:
		// case LOAD_USER_REQUEST:
		authRequest(state) {
			state.isAuthentificated = null;
			state.loading = true;
			state.error = null;
			state.validToken = false;
		},
		// case LOGIN_SUCCESS:
		// 	case REGISTER_USER_SUCCESS:
		// 	case LOAD_USER_SUCCESS:

		authSuccess(state, action) {
			state.user = action.payload;
			state.isAuthentificated = true;
			state.loading = false;
			state.error = null;
			sessionStorage.setItem("isAuthentificated", true);
		},

		logoutSuccess(state) {
			state.user = null;
			state.isAuthentificated = null;
			state.loading = false;
			sessionStorage.removeItem("isAuthentificated");
		},

		loadUserFail(state, action) {
			state.user = null;
			state.isAuthentificated = null;
			state.loading = false;
			state.error = null;
			sessionStorage.removeItem("isAuthentificated");
		},
		logoutFail(state, action) {
			state.user = null;
			state.isAuthentificated = null;
			state.loading = false;
			state.error = action.payload;
		},
		authFail(state, action) {
			state.user = null;
			state.isAuthentificated = null;
			state.loading = false;
			state.error = action.payload;
		},
		validToken(state) {
			state.validToken = true;
		},
		inValidToken(state) {
			state.validToken = false;
		},
		clearErrors: (state) => {
			state.error = null;
		},
	},
});

export const loginUser = (user) => async (dispatch) => {
	try {
		dispatch(authRequest());
		const res = await axios.post(`${BACKEND_URL}/login`, user, config);
		dispatch(authSuccess(res.data.user));
	} catch (error) {
		dispatch(authFail(error.response));
	}
};

export const loadUser = () => async (dispatch) => {
	try {
		dispatch(authRequest());
		const res = await axios.get(`${BACKEND_URL}/me`, config);
		dispatch(authSuccess(res.data.user));
	} catch (error) {
		dispatch(loadUserFail(error.response));
	}
};

export const emailVerify = (user_id, token) => async (dispatch) => {
	try {
		dispatch(authRequest());
		await axios.get(`${BACKEND_URL}/${user_id}/verify/${token}`, config);
		dispatch(validToken());
	} catch (error) {
		dispatch(inValidToken());
	}
};
export const logoutUser = () => async (dispatch) => {
	try {
		dispatch(authRequest());
		await axios.get(`${BACKEND_URL}/logout`, config);
		dispatch(logoutSuccess());
	} catch (error) {
		dispatch(logoutFail(error.response.data.errMessage));
	}
};

export const {
	authFail,
	authRequest,
	authSuccess,
	logoutSuccess,
	logoutFail,
	loadUserFail,
	clearErrors,
	forgetPassword,
	validToken,
	inValidToken,
} = authSlice.actions;

///////////////////////////////////////////////

export const userSlice = createSlice({
	name: "user",
	initialState: {
		newuser: null,
		error: null,
		loading: false,
		success: null,
		message: null,
	},
	reducers: {
		userRequest(state) {
			state.loading = true;
			state.error = null;
			state.success = null;
		},
		updateUserInfoSuccess(state, action) {
			state.loading = false;
			state.newuser = action.payload;
			state.error = false;
			state.success = true;
		},
		updateUserInfoFail(state, action) {
			state.loading = false;
			state.error = action.payload;
			state.success = false;
		},
		getAllUsersSuccess(state, action) {
			state.loading = false;
			state.newuser = action.payload;
			state.error = false;
			state.success = true;
		},
		getAllUsersFail(state, action) {
			state.loading = false;
			state.error = action.payload;
			state.success = false;
		},
		updatePasswordSuccess(state, action) {
			state.loading = false;
			state.error = false;
			state.success = true;
		},
		updatePasswordFail(state, action) {
			state.loading = false;
			state.error = action.payload;
			state.success = false;
		},
		DeleteUserSuccess(state, action) {
			state.loading = false;
			state.error = false;
			state.message = "User Deleted Successfully";
		},
		DeleteUserFail(state, action) {
			state.loading = false;
			state.error = true;
			state.success = false;
		},
		clearUserErrors: (state) => {
			state.error = false;
		},
	},
});

export const {
	userRequest,
	updateUserInfoSuccess,
	updateUserInfoFail,
	updatePasswordSuccess,
	updatePasswordFail,
	DeleteUserSuccess,
	DeleteUserFail,
	clearUserErrors,
	getAllUsersFail,
	getAllUsersSuccess,
} = userSlice.actions;

export const updateUserInfo = (user) => async (dispatch) => {
	try {
		dispatch(userRequest());
		const res = await axios.put(`${BACKEND_URL}/me/update`, user, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});
		dispatch(updateUserInfoSuccess(res.data.user));
	} catch (error) {
		dispatch(updateUserInfoFail(error.response.data.errMessage));
	}
};

export const updatePassword = (passwords) => async (dispatch) => {
	try {
		dispatch(userRequest());
		const res = await axios.put(
			`${BACKEND_URL}/password/update`,
			passwords,
			config
		);
		dispatch(updatePasswordSuccess(res.data.user));
	} catch (error) {
		dispatch(updatePasswordFail(error.response.data.errMessage));
	}
};

export const deleteUser = (date) => async (dispatch) => {
	try {
		dispatch(userRequest());
		const res = await axios.put(`${BACKEND_URL}/me/delete`, date, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});
		dispatch(DeleteUserSuccess(res.data));
	} catch (error) {
		dispatch(DeleteUserFail(error.response.data.errMessage));
	}
};

export const getUserInfo = (id) => async (dispatch) => {
	try {
		dispatch(userRequest());
		const res = await axios.get(`${BACKEND_URL}/user/${id}`, config);
		dispatch(updateUserInfoSuccess(res.data.user));
	} catch (error) {
		dispatch(updateUserInfoFail(error.response.data.errMessage));
	}
};

///////////////////////////////////////////////

export const registerSlice = createSlice({
	name: "register",
	initialState: {
		message: null,
		error: null,
		loading: false,
	},
	reducers: {
		registerRequest(state) {
			state.loading = true;
			state.error = null;
			state.message = null;
		},
		registerSuccess(state, action) {
			state.message = action.payload;
			state.loading = false;
		},
		registerFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		clearRegisterErrors: (state) => {
			state.error = false;
		},
	},
});

export const {
	registerRequest,
	registerSuccess,
	registerFail,
	clearRegisterErrors,
} = registerSlice.actions;

export const registerUser = (user) => async (dispatch) => {
	try {
		dispatch(registerRequest());
		const res = await axios.post(`${BACKEND_URL}/register`, user, config);
		dispatch(registerSuccess(res.data.message));
	} catch (error) {
		dispatch(registerFail(error.response.data.errMessage));
	}
};

export const visitSlice = createSlice({
	name: "visit",
	initialState: {
		loading: false,
		error: null,
		success: null,
		visitedUser: null,
	},
	reducers: {
		visitRequest(state) {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		visitSuccess(state, action) {
			state.loading = false;
			state.visitedUser = action.payload;
			state.error = false;
			state.success = true;
		},
		visitFail(state, action) {
			state.loading = false;
			state.error = action.payload;
			state.success = false;
		},
		clearVisitErrors: (state) => {
			state.error = false;
		},
	},
});

export const { visitRequest, visitSuccess, visitFail, clearVisitErrors } =
	visitSlice.actions;

export const visitUser = (id) => async (dispatch) => {
	try {
		dispatch(visitRequest());
		const res = await axios.get(`${BACKEND_URL}/user/${id}`, config);
		dispatch(visitSuccess(res.data.user));
	} catch (error) {
		dispatch(visitFail(error.response.data.errMessage));
	}
};

//ADMIN

export const adminSlice = createSlice({
	name: "admin",
	initialState: {
		loading: false,
		error: null,
		success: null,
		users: null,
	},
	reducers: {
		adminRequest(state) {
			state.loading = true;
			state.error = null;
		},
		adminGetUsersSuccess(state, action) {
			state.loading = false;
			state.users = action.payload;
			state.error = false;
		},
		adminGetUsersFail(state, action) {
			state.loading = false;
			state.error = action.payload;
			state.success = false;
		},
		adminDeleteUserSuccess(state, action) {
			state.loading = false;
			state.users = state.users.filter((user) => user._id !== action.payload);
			state.error = false;
			state.success = true;
		},
		adminDeleteUserFail(state, action) {
			state.loading = false;
			state.error = action.payload;
			state.success = false;
		},
		clearAdminErrors: (state) => {
			state.error = false;
		},
	},
});

export const {
	adminRequest,
	adminGetUsersSuccess,
	adminGetUsersFail,
	adminDeleteUserSuccess,
	adminDeleteUserFail,
} = adminSlice.actions;

//ADMIN

export const adminDeleteUser = (id) => async (dispatch) => {
	try {
		dispatch(adminRequest());
		const res = await axios.delete(`${BACKEND_URL}/admin/user/${id}`, config);
		dispatch(adminDeleteUserSuccess(res.data));
	} catch (error) {
		dispatch(adminDeleteUserFail());
	}
};

export const adminGetAllUsers = () => async (dispatch) => {
	try {
		dispatch(adminRequest());
		const res = await axios.get(`${BACKEND_URL}/admin/users`, config);
		dispatch(adminGetUsersSuccess(res.data.users));
	} catch (error) {
		dispatch(adminGetUsersFail());
	}
};

const userReducer = combineReducers({
	user: userSlice.reducer,
	auth: authSlice.reducer,
	register: registerSlice.reducer,
	visit: visitSlice.reducer,
	admin: adminSlice.reducer,
});

export default userReducer;
