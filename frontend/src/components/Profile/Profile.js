import "./profile.css"
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";

export const Profile = () => {
    const userData = useContext(AuthContext)
    console.log(userData)
  return (
    <div className="profile">
      <div className="profile-picture">
        <img src={""} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>{userData.username}</h2>
        <p>Name: {userData.firstName} {userData.lastName}</p>
        <p>Email: {userData.email}</p>
        <p>Age: {userData.age}</p>
        <p>Bio: {""}</p>
        {/* Add more profile information as needed */}
      </div>
    </div>
  );
};