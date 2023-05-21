import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../contexts/AuthContext";

export const Header = () => {
    const {isAuthenticated} = useContext(AuthContext)
    const [loggedIn, setLoggedIn] = useState(isAuthenticated)
    useEffect(() => {
        setLoggedIn(isAuthenticated);
    }, [isAuthenticated])

    return (
        <header>
            <h1>Music App</h1>
            <nav>
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/catalogue'}>Catalogue</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                    <li><Link to={'/contact'}>Contact</Link></li>
                    {loggedIn &&
                        <li><Link to={'/logout'}>Logout</Link></li>
                    }
                    {!loggedIn &&
                        <>
                            <li><Link to={'/register'}>Register</Link></li>
                            <li><Link to={'/login'}>Login</Link></li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}