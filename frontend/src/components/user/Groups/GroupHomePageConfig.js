import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	deleteGroup,
	clearDeleted,
} from "../../../redux/reducers/groupsReducers";

const GroupHomePageConfig = ({ group }) => {
	const dispatch = useDispatch();
	const { deleted } = useSelector((state) => state.group);

	const handleDeleteGroup = (e) => {
		e.preventDefault();
		dispatch(deleteGroup(group._id));
	};
	useEffect(() => {
		if (deleted) {
			window.location.href = "/groups";
		}
		return () => {
			dispatch(clearDeleted());
		};
	}, [deleted]);

	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="col-md-6 flex-grow-1 ms-2">
			<div className="card h-100">
				<div className="card-body d-flex justify-content-around">
					<div className="d-flex flex-column gap-1">
						<h4>Group Configuration</h4>
						<h5 className="text-muted">
							Group name :<i> {group.name} </i>
						</h5>
						<input
							type={showPassword ? "text" : "password"}
							value={group.password}
							className="form-control"
							id="SecretKey"
							readOnly
						/>
						<div className="">
							<label htmlFor="SecretKey">Group password</label>
							<input
								type="checkbox"
								onChange={() => setShowPassword(!showPassword)}
								className="form-check-input mx-2"
							/>
						</div>
						<p className="text-muted">
							You can share this password along with the name of the group
							<br /> with your friends to let them join your group
						</p>
						<hr />
						<button onClick={handleDeleteGroup} className="btn btn-danger">
							Delete Group
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupHomePageConfig;
