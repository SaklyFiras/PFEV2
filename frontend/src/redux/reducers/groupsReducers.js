import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../constants/globalConstants";

const config = {
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
};

export const groupSlice = createSlice({
	name: "group",
	initialState: {
		groups: [],
		group: {},
		loading: false,
		error: null,
		success: null,
		deleted: null,
	},
	reducers: {
		getGroupsRequest(state) {
			state.loading = true;
			state.error = null;
		},
		getGroupsSuccess(state, action) {
			state.loading = false;
			state.groups = action.payload;
		},
		getGroupsFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		getGroupRequest(state) {
			state.loading = true;
			state.error = null;
		},
		getGroupSuccess(state, action) {
			state.loading = false;
			state.group = action.payload;
		},
		getGroupFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		createGroupRequest(state) {
			state.loading = true;
			state.error = null;
		},
		createGroupSuccess(state, action) {
			state.loading = false;
			state.success = action.payload;
		},
		createGroupFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		updateGroupRequest(state) {
			state.loading = true;
			state.error = null;
		},
		updateGroupSuccess(state, action) {
			state.loading = false;
			state.success = action.payload;
		},
		updateGroupFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		deleteGroupRequest(state) {
			state.loading = true;
			state.error = null;
		},
		deleteGroupSuccess(state, action) {
			state.loading = false;
			state.deleted = action.payload;
		},
		deleteGroupFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		clearErrors(state) {
			state.error = null;
		},
		clearSuccess(state) {
			state.success = null;
		},
		clearDeleted(state) {
			state.deleted = null;
		},
	},
});

export const {
	getGroupsRequest,
	getGroupsSuccess,
	getGroupsFail,
	getJoinedGroupsFail,
	getJoinedGroupsRequest,
	getJoinedGroupsSuccess,
	getOwnedGroupsFail,
	getOwnedGroupsRequest,
	getOwnedGroupsSuccess,
	getGroupRequest,
	getGroupSuccess,
	getGroupFail,
	createGroupRequest,
	createGroupSuccess,
	createGroupFail,
	updateGroupRequest,
	updateGroupSuccess,
	updateGroupFail,
	deleteGroupRequest,
	deleteGroupSuccess,
	deleteGroupFail,
	clearErrors,
	clearSuccess,
	clearDeleted,
} = groupSlice.actions;

export const getGroups = () => async (dispatch) => {
	try {
		dispatch(getGroupsRequest());
		const { data } = await axios.get(`${BACKEND_URL}/groups`, config);
		dispatch(getGroupsSuccess(data));
	} catch (error) {
		dispatch(getGroupsFail(error.response.data.message));
	}
};

export const getGroup = (id) => async (dispatch) => {
	try {
		dispatch(getGroupRequest());
		const { data } = await axios.get(`${BACKEND_URL}/group/${id}`, config);
		dispatch(getGroupSuccess(data));
	} catch (error) {
		dispatch(getGroupFail(error.response.data.message));
	}
};

export const createGroup = (group) => async (dispatch) => {
	try {
		dispatch(createGroupRequest());
		const { data } = await axios.post(
			`${BACKEND_URL}/group/new`,
			group,
			config
		);
		dispatch(createGroupSuccess(data));
	} catch (error) {
		dispatch(createGroupFail(error.response.data.message));
	}
};

export const updateGroup = (id, group) => async (dispatch) => {
	try {
		dispatch(updateGroupRequest());
		const { data } = await axios.put(
			`${BACKEND_URL}/api/groups/${id}`,
			group,
			config
		);
		dispatch(updateGroupSuccess(data));
	} catch (error) {
		dispatch(updateGroupFail(error.response.data.message));
	}
};

export const deleteGroup = (id) => async (dispatch) => {
	try {
		dispatch(deleteGroupRequest());
		const { data } = await axios.delete(
			`${BACKEND_URL}/api/groups/${id}`,
			config
		);
		dispatch(deleteGroupSuccess(data));
	} catch (error) {
		dispatch(deleteGroupFail(error.response.data.message));
	}
};

export const acceptRequest = (id, userId) => async (dispatch) => {
	try {
		dispatch(getGroupRequest());
		const { data } = await axios.put(
			`${BACKEND_URL}/group/requests/accept/${id}`,
			{ userId: userId },
			config
		);
		dispatch(getGroupSuccess(data));
	} catch (error) {
		dispatch(getGroupFail(error.response.data.message));
	}
};

export const declineRequest = (id, userId) => async (dispatch) => {
	try {
		dispatch(getGroupRequest());
		const { data } = await axios.put(
			`${BACKEND_URL}/group/requests/decline/${id}`,
			{ userId: userId },
			config
		);
		dispatch(getGroupSuccess(data));
	} catch (error) {
		dispatch(getGroupFail(error.response.data.message));
	}
};

export const blockRequest = (id, userId) => async (dispatch) => {
	try {
		dispatch(getGroupRequest());
		const { data } = await axios.put(
			`${BACKEND_URL}/group/blockUser/${id}`,
			{ userId: userId },
			config
		);
		dispatch(getGroupSuccess(data));
	} catch (error) {
		dispatch(getGroupFail(error.response.data.message));
	}
};

export const unblockRequest = (id, userId) => async (dispatch) => {
	try {
		dispatch(getGroupRequest());
		const { data } = await axios.put(
			`${BACKEND_URL}/group/unblockUser/${id}`,
			{ userId: userId },
			config
		);
		dispatch(getGroupSuccess(data));
	} catch (error) {
		dispatch(getGroupFail(error.response.data.message));
	}
};

export const sendRequest = (id, userId) => async (dispatch) => {
	try {
		dispatch(getGroupRequest());
		const { data } = await axios.put(
			`${BACKEND_URL}/group/join/${id}`,
			{ userId: userId },
			config
		);
		dispatch(getGroupSuccess(data));
	} catch (error) {
		dispatch(getGroupFail(error.response.data.message));
	}
};

export const addPostToGroup = (id, post) => async (dispatch) => {
	try {
		dispatch(getGroupRequest());
		const { data } = await axios.post(
			`${BACKEND_URL}/group/post/${id}`,
			post,
			config
		);
		dispatch(getGroupSuccess(data));
	} catch (error) {
		dispatch(getGroupFail(error.response.data.message));
	}
};

export const joinWithNameAndPassword = (name, password) => async (dispatch) => {
	try {
		dispatch(getGroupRequest());
		const { data } = await axios.post(
			`${BACKEND_URL}/group/join/direct`,
			{ name: name, password: password },
			config
		);
		dispatch(getGroupSuccess(data));
	} catch (error) {
		dispatch(getGroupFail(error.response.data.message));
	}
};

export const leaveGroup = (id) => async (dispatch) => {
	try {
		dispatch(getGroupRequest());
		const { data } = await axios.put(
			`${BACKEND_URL}/group/leave/${id}`,
			{},
			config
		);
		dispatch(getGroupSuccess(data));
	} catch (error) {
		dispatch(getGroupFail(error.response.data.message));
	}
};

export default groupSlice.reducer;
