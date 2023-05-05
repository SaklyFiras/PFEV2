import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../constants/globalConstants";
const config = {
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
};

export const commentSlice = createSlice({
	name: "comment",
	initialState: {
		comments: [],
		comment: {},
		loading: false,
		error: null,
		success: null,
		deleted: null,
		updated : null,
	},
	reducers: {
		getCommentsRequest(state) {
			state.loading = true;
			state.error = null;
		},
		getCommentsSuccess(state, action) {
			state.loading = false;
			state.comments = action.payload;
		},
		getCommentsFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		CommentRequest(state) {
			state.loading = true;
			state.error = null;
		},
		getCommentSuccess(state, action) {
			state.loading = false;
			state.comment = action.payload;
		},
		getCommentFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		createCommentRequest(state) {
			state.loading = true;
			state.error = null;
			state.success = null;
		},
		createCommentSuccess(state, action) {
			state.loading = false;
			state.comments = [...state.comments, action.payload];
			state.success = true;
		},
		createCommentFail(state, action) {
			state.loading = false;
			state.error = action.payload;
			state.success = false;
		},
		updateCommentRequest(state) {
			state.loading = true;
			state.error = null;
			state.updated = null;
		},
		updateCommentSuccess(state, action) {
			state.loading = false;
			state.comment = action.payload;
			state.updated = true;
		},
		updateCommentFail(state, action) {
			state.loading = false;
			state.error = action.payload;
			state.updated = false;
		},
		deleteCommentRequest(state) {
			state.loading = true;
			state.error = null;
		},
		deleteCommentSuccess(state, action) {
			state.loading = false;
			state.deleted = action.payload;
		},
		deleteCommentFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		likeCommentRequest(state) {
			state.loading = true;
			state.error = null;
		},
		likeCommentSuccess(state, action) {
			state.loading = false;
			state.comment = action.payload;
		},
		likeCommentFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		dislikeCommentRequest(state) {
			state.loading = true;
			state.error = null;
		},
		dislikeCommentSuccess(state, action) {
			state.loading = false;
			state.comment = action.payload;
		},
		dislikeCommentFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	getCommentsRequest,
	getCommentsSuccess,
	getCommentsFail,
	getCommentRequest,
	getCommentSuccess,
	getCommentFail,
	createCommentRequest,
	createCommentSuccess,
	createCommentFail,
	updateCommentRequest,
	updateCommentSuccess,
	updateCommentFail,
	deleteCommentRequest,
	deleteCommentSuccess,
	deleteCommentFail,
	likeCommentRequest,
	likeCommentSuccess,
	likeCommentFail,
	dislikeCommentRequest,
	dislikeCommentSuccess,
	dislikeCommentFail,
} = commentSlice.actions;

export const getComments = (id) => async (dispatch) => {
	try {
		dispatch(getCommentsRequest());
		const { data } = await axios.get(`${BACKEND_URL}/comments/${id}`, config);
		dispatch(getCommentsSuccess(data));
	} catch (error) {
		dispatch(getCommentsFail(error.response.data.message));
	}
};

export const getComment = (id) => async (dispatch) => {
	try {
		dispatch(getCommentRequest());
		const { data } = await axios.get(
			`${BACKEND_URL}/api/comments/${id}`,
			config
		);
		dispatch(getCommentSuccess(data));
	} catch (error) {
		dispatch(getCommentFail(error.response.data.message));
	}
};

export const createComment =
	({ postId, content, commentType }) =>
	async (dispatch) => {
		try {
			dispatch(createCommentRequest());
			const res = await axios.post(
				`${BACKEND_URL}/comment/new/${postId}`,
				{ content, commentType },
				config
			);
			dispatch(createCommentSuccess(res.data.comment));
		} catch (error) {
			dispatch(createCommentFail(error.response.data.message));
		}
	};

export const updateComment = (id, content) => async (dispatch) => {
	try {
		dispatch(updateCommentRequest());
		const { data } = await axios.put(
			`${BACKEND_URL}/comment/${id}`,
			{ id, content },
			config
		);
		dispatch(updateCommentSuccess(data));
	} catch (error) {
		dispatch(updateCommentFail(error.response.data.message));
	}
};

export const deleteComment = (id) => async (dispatch) => {
	try {
		dispatch(deleteCommentRequest());
		const { data } = await axios.delete(`${BACKEND_URL}/comment/${id}`, config);
		dispatch(deleteCommentSuccess(data));
	} catch (error) {
		dispatch(deleteCommentFail(error.response.data.message));
	}
};

export const likeComment = (id) => async (dispatch) => {
	try {
		dispatch(likeCommentRequest());
		const { data } = await axios.put(
			`${BACKEND_URL}/comment/like/${id}`,
			{},
			config
		);
		dispatch(likeCommentSuccess(data));
	} catch (error) {
		dispatch(likeCommentFail(error.response.data.message));
	}
};

export const dislikeComment = (id) => async (dispatch) => {
	try {
		dispatch(dislikeCommentRequest());
		const { data } = await axios.put(
			`${BACKEND_URL}/comment/dislike/${id}`,
			{},
			config
		);
		dispatch(dislikeCommentSuccess(data));
	} catch (error) {
		dispatch(dislikeCommentFail(error.response.data.message));
	}
};

export default commentSlice.reducer;
