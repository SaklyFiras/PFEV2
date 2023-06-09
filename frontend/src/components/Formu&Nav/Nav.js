import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Nav.css";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducers/userReducers";
import { Link } from "react-router-dom";

function Nav() {
	const { user } = useSelector((state) => state.user.auth);
	const dispatch = useDispatch();
	const navRef = useRef();

	const handleLogout = async (e) => {
		e.preventDefault();
		dispatch(logoutUser());
		
	};

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header className="d-flex justify-content-around">
			<Link to="/accueil">
				<img alt="logo" src={logo} className="logoNav" />
			</Link>
			<nav ref={navRef}>
				
				{user && user.role === "user" ? (
					<>
						<Link to={`/${user._id}`}>My Profile</Link>
						<Link to="/me">Edit Profile</Link>
					</>
				) : (
					<Link to="/admin/dashboard">Dashboard</Link>
				)}
				<Link to="/accueil">Accueil</Link>
				<Link to="/groups">Groups</Link>
				
				<button className="nav-btn nav-close-btn" onClick={showNavbar}>
					<FaTimes />
				</button>
				<button className="logoutBtn" onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}
export default Nav;
