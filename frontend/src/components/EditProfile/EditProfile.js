import "./edit-profile.css"
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useForm} from "../../hooks/useForm";


const editFormKeys = {
    Username: "username",
    FirstName: "firstName",
    LastName: "lastName",
    Email: "email",
    Age: "age",
    Bio: "bio",
};

export const EditProfile = () => {
    const userData = useContext(AuthContext);

    const initialValues = {
        [editFormKeys.Username]: userData.username,
        [editFormKeys.FirstName]: userData.firstName,
        [editFormKeys.LastName]: userData.lastName,
        [editFormKeys.Email]: userData.email,
        [editFormKeys.Age]: userData?.age || '',
        [editFormKeys.Bio]: userData?.bio || '',
    }

    const {onSubmit, onChangeHandler, values} = useForm(
        () => userData.onProfileEdit(values, userData.userId), initialValues
    );

    return (
        <div className="edit-profile">
            <h2>Edit Profile</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={values[editFormKeys.Username]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={values[editFormKeys.FirstName]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={values[editFormKeys.LastName]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={values[editFormKeys.Email]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={values[editFormKeys.Age]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label>Bio:</label>
                    <textarea
                        name="bio"
                        value={values[editFormKeys.Bio]}
                        onChange={onChangeHandler}>
                    </textarea>
                </div>
                {/* Add more fields as needed */}
                <button type="submit">Save</button>
            </form>
        </div>
    );
};
