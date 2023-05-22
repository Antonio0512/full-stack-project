import "./profile.css"
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

export const Profile = () => {
    const navigate = useNavigate()
    const userData = useContext(AuthContext)

    const openEditPage = () => {
        navigate("/profile-edit")
    }

    return (
        <div className="profile">
            <div className="profile-picture">
                <img src={userData.profilePicture} alt="Profile"/>
            </div>
            <div className="profile-info">
                <h2>{userData.username}</h2>
                <p>Name: {userData.firstName} {userData.lastName}</p>
                <p>Email: {userData.email}</p>
                <p>Age: {userData?.age}</p>
                <p>Bio: {userData?.bio}</p>
                {/* Add more profile information as needed */}
                <div className="profile-actions">
                    <button className="edit-button" onClick={openEditPage}>Edit</button>
                    <button className="delete-button">Delete</button>
                </div>
            </div>
        </div>
    );
};