import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { emailVerify } from "../../redux/reducers/userReducers";

const VerifyEmail = () => {
	const param = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const error = useSelector((state) => state.user.auth.error);

	useEffect(() => {
		dispatch(emailVerify(param.id, param.token));
		setTimeout(() => {
			navigate("/");
		}, 3000);
	}, [navigate,dispatch,param]);

	return <div>{error ? <h1>Invalid Url</h1> : <h1>Verified</h1>}</div>;
};

export default VerifyEmail;
