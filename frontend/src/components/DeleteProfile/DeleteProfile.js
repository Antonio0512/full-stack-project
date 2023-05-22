import "./delete-profile.css"
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";

export const DeleteProfile = () => {
    const {onProfileDelete, userId } = useContext(AuthContext)
    const navigate = useNavigate()
    const onCancelHandler = () => {
        navigate("/profile")
    }

    const onDeleteHandler = async () => {
        onProfileDelete(userId)
    }


    return (
        <div className="delete-component">
            <h2>Delete Account</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="button-group">
                <button id="delete-btn" onClick={onDeleteHandler}>Delete</button>
                <button id="cancel-btn" onClick={onCancelHandler}>Cancel</button>
            </div>
        </div>

    )
}