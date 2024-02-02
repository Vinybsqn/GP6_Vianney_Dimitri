import { NavLink } from "react-router-dom";

const checkIsActive = (params) => {
    console.log(params)
    return {
        color: params.isActive ? 'orange' : 'black',
        backgroundColor: params.isActive ? 'grey' : 'white'
    }
}

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink style={checkIsActive} to="/home">Accueil</NavLink>
                </li>
                <li>
                    <NavLink style={checkIsActive} to="/game">Echec&Match</NavLink>
                </li>
                <li>
                    <NavLink style={checkIsActive} to="/about">A propos de nous</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav