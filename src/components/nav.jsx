import { NavLink } from "react-router-dom";
import '../styles/nav.css';

const Nav = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/home">Accueil</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/game">Echec&Match</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/about">A propos de nous</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
