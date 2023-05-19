import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <header>
            <h1>Music App</h1>
            <nav>
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/catalogue'}>Catalogue</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                    <li><Link to={'/contact'}>Contact</Link></li>
                    <li><Link to={'/register'}>Register</Link></li>
                    <li><Link to={'/login'}>Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}