import "./register.css"
import React, { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";
import {Link} from "react-router-dom";

const registerFormKeys = {
  Username: "username",
  Email: "email",
  Password: "password",
  "Confirm_password": "confirm_password",
  FirstName: "first_name",
  LastName: "last_name",
  Age: "age",
  Bio: "bio",
  Profile_picture: "profile_picture"
};

export const Register = () => {
  const { onRegisterSubmit } = useContext(AuthContext);

  const { onSubmit, onChangeHandler, values } = useForm(
    () => onRegisterSubmit(values),
    {
      [registerFormKeys.Username]: "",
      [registerFormKeys.Email]: "",
      [registerFormKeys.Password]: "",
      [registerFormKeys["Confirm_password"]]: "",
      [registerFormKeys.FirstName]: "",
      [registerFormKeys.LastName]: "",
      [registerFormKeys.Age]: "",
      [registerFormKeys.Bio]: "",
      [registerFormKeys.Profile_picture]: ""
    }
  );

  return (
    <section className="register-section">
      <h2>Register</h2>
      <form className="register-form" method="post" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChangeHandler}
            value={values[registerFormKeys.Email]}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChangeHandler}
            value={values[registerFormKeys.Password]}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm password:</label>
          <input
            type="password"
            id="password2"
            name="confirm_password"
            onChange={onChangeHandler}
            value={values[registerFormKeys.Confirm_password]}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={onChangeHandler}
            value={values[registerFormKeys.Username]}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            name="first_name"
            onChange={onChangeHandler}
            value={values[registerFormKeys.FirstName]}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            name="last_name"
            onChange={onChangeHandler}
            value={values[registerFormKeys.LastName]}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={onChangeHandler}
            value={values[registerFormKeys.Age]}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture URL:</label>
          <input
            type="text"
            id="profilePicture"
            name="profile_picture"
            onChange={onChangeHandler}
            value={values[registerFormKeys.Profile_picture]}
            required
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            onChange={onChangeHandler}
            value={values[registerFormKeys.Bio]}
            required
          />
        </div>
        <div className="form-group register-button">
          <button type="submit">Register</button>
        </div>
      </form>
      <p>Already have an account? <Link to={"/login"}>Login</Link></p>
    </section>
  );
};
