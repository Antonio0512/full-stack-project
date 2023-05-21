import "./logout.css"
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";

import {useNavigate} from "react-router-dom";

export const Logout = () => {
    const {onLogoutSubmit} = useContext(AuthContext)
    const navigate = useNavigate()
    const onLoginSubmitHandler = () => {
        onLogoutSubmit();
    }
    const onCancelHandler = () => [
        navigate('/')
    ]
    return (
        <div className="logout-container">
            <div className="logout-content">
                <p>Are you sure you want to logout?</p>
                <button className="logout-button" onClick={onLoginSubmitHandler}>Yes</button>
                <button className="cancel-button" onClick={onCancelHandler}>No</button>
            </div>
        </div>
    )
}