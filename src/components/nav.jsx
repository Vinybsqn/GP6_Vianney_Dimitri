// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import '../styles/nav.css';


const Nav = () => {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsUserSignedIn(!!user);
        });

        return unsubscribe; // S'assurer de se désabonner lors du démontage du composant
    }, [auth]);


    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/home">Accueil</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/match">Matchs</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/chat">Chats</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/profil">Profil</NavLink>
                </li>
                
            </ul>
        </nav>
    );
};

export default Nav;
