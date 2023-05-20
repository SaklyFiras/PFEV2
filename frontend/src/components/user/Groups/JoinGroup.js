import React from "react";
import { useDispatch } from "react-redux";
import {
	joinWithNameAndPassword,
	
} from "../../../redux/reducers/groupsReducers";
const JoinGroup = () => {
	
	
	const dispatch = useDispatch();

	const handleSubmitGroup = (e) => {
		e.preventDefault();
		const name = e.target[0].value;
		const password = e.target[1].value;
		dispatch(joinWithNameAndPassword(name, password));
	};
	
	return (
		<div className="vstack gap-1">
			<label htmlFor="group" className="form-label">
				Group name
			</label>
			<form onSubmit={handleSubmitGroup}>
				<input
					autoComplete="off"
					type="text"
					className="form-control"
					id="groupName"
					aria-describedby="group"
					required
				/>
				<label htmlFor="group" className="form-label">
					Group password
				</label>
				<input
					autoComplete="off"
					type="password"
					className="form-control"
					id="groupPassword"
					aria-describedby="group"
					required
				/>

				<div className="d-flex justify-content-end">
					<button type="submit" className="btn btn-primary">
						Join
					</button>
				</div>
			</form>
		</div>
	);
};

export default JoinGroup;
