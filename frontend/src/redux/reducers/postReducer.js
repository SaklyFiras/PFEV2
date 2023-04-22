import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../constants/globalConstants";
const config = {
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
};

export const postSlice = createSlice({
	name: "post",
	initialState: {
		posts: [],
		post: {},
		loading: false,
		error: null,
		success: null,
		deleted: null,
	},
	reducers: {
		getPostsRequest(state) {
			state.loading = true;
			state.error = null;
		},
		getPostsSuccess(state, action) {
			state.loading = false;
			state.posts = action.payload;
		},
		getPostsFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		getPostRequest(state) {
			state.loading = true;
			state.error = null;
		},
		getPostSuccess(state, action) {
			state.loading = false;
			state.post = action.payload;
		},
		getPostFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},

		createPostRequest(state) {
			state.loading = true;
			state.error = null;
		},
		createPostSuccess(state, action) {
			state.loading = false;
			state.success = true;
			state.posts = [...state.posts, action.payload];
		},
		createPostFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		updatePostRequest(state) {
			state.loading = true;
			state.error = null;
		},
		updatePostSuccess(state, action) {
			state.loading = false;
			state.posts = state.posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		},
		updatePostFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		deletePostRequest(state) {
			state.loading = true;
			state.error = null;
		},
		deletePostSuccess(state, action) {
			state.loading = false;
			state.posts = state.posts.filter((post) => post._id !== action.payload);
			state.deleted = true;
		},
		deletePostFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		likePostRequest(state) {
			state.loading = true;
			state.error = null;
		},
		likePostSuccess(state, action) {
			state.loading = false;
			state.posts = state.posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		},
		likePostFail(state, action) {
			state.loading = false;
			state.error = action.payload;
		},

		clearPostErrors(state) {
			state.error = null;
		},
	},
});

export const {
	getPostsRequest,
	getPostsSuccess,
	getPostsFail,
	getPostRequest,
	getPostSuccess,
	getPostFail,
	createPostRequest,
	createPostSuccess,
	createPostFail,
	updatePostRequest,
	updatePostSuccess,
	updatePostFail,
	deletePostRequest,
	deletePostSuccess,
	deletePostFail,
	clearPostErrors,
	likePostRequest,
	likePostSuccess,
	likePostFail,
} = postSlice.actions;

export const getPosts =
	(currentPage, keyword = "", filter = "date") =>
	async (dispatch) => {
		try {
			dispatch(getPostsRequest());
			const { data } = await axios.get(
				`${BACKEND_URL}/posts?keyword=${keyword}&page=${currentPage}&filter=${filter}`,
				config
			);
			dispatch(getPostsSuccess(data));
		} catch (error) {
			dispatch(getPostsFail(error.response.data.message));
		}
	};



export const getUserPosts = (id, currentPage) => async (dispatch) => {
	try {
		dispatch(getPostRequest());
		const { data } = await axios.get(
			`${BACKEND_URL}/${id}/posts?page=${currentPage}`,
			config
		);
		dispatch(getPostSuccess(data));
	} catch (error) {
		dispatch(getPostFail(error.response.data.message));
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		dispatch(createPostRequest());
		const { data } = await axios.post(`${BACKEND_URL}/post/new`, post, {
			headers: {
				"Content-Type": "content-type: multipart/form-data",
			},
			withCredentials: true,
		});
		dispatch(createPostSuccess(data));
	} catch (error) {
		dispatch(createPostFail(error.response));
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		dispatch(updatePostRequest());
		const { data } = await axios.put(`${BACKEND_URL}/posts/${id}`, post);
		dispatch(updatePostSuccess(data));
	} catch (error) {
		dispatch(updatePostFail(error.response.data.message));
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		dispatch(deletePostRequest());
		await axios.delete(`${BACKEND_URL}/post/${id}`, config);
		dispatch(deletePostSuccess(id));
	} catch (error) {
		dispatch(deletePostFail(error.response.data.message));
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		dispatch(likePostRequest());
		const { data } = await axios.put(
			`${BACKEND_URL}/post/like/${id}`,
			{},
			config
		);
		dispatch(likePostSuccess(data));
	} catch (error) {
		dispatch(likePostFail(error.response));
	}
};

//ADMIN
export const deletePostAdmin = (id) => async (dispatch) => {
	try {
		dispatch(deletePostRequest());
		const res = await axios.delete(`${BACKEND_URL}/admin/post/${id}`, config);
		dispatch(deletePostSuccess(res));
	} catch (error) {
		dispatch(deletePostFail(error.response.data.message));
	}
};

export default postSlice.reducer;

// Path: FRONTEND\src\redux\actions\postActions.js
