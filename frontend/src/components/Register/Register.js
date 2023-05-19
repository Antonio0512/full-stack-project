import "./register.css"
import {useContext} from "react";
import {useForm} from "../../hooks/useForm";
import {AuthContext} from "../../contexts/AuthContext";

const registerFormKeys = {
    Username: "username",
    Email: "email",
    Password: "password",
    "Confirm_password": "confirm_password",
    FirstName: "first_name",
    LastName: "last_name",
};

export const Register = () => {
    const {onRegisterSubmit} = useContext(AuthContext)

    const {onSubmit, onChangeHandler, values} = useForm(
        () => onRegisterSubmit(values), {
            [registerFormKeys.Username]: "",
            [registerFormKeys.Email]: "",
            [registerFormKeys.Password]: "",
            [registerFormKeys["Confirm_password"]]: "",
            [registerFormKeys.FirstName]: "",
            [registerFormKeys.LastName]: ""
        })

    return (
        <section className="register-section">
            <h2>Register</h2>
            <form method="post" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={onChangeHandler}
                           value={values[registerFormKeys.Email]} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={onChangeHandler}
                           value={values[registerFormKeys.Password]} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm password:</label>
                    <input type="password" id="password2" name="confirm_password" onChange={onChangeHandler}
                           value={values[registerFormKeys["Confirm_password"]]} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={onChangeHandler}
                           value={values[registerFormKeys.Username]} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First name:</label>
                    <input type="text" id="firstName" name="first_name" onChange={onChangeHandler}
                           value={values[registerFormKeys.FirstName]} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last name:</label>
                    <input type="text" id="lastName" name="last_name" onChange={onChangeHandler}
                           value={values[registerFormKeys.LastName]} required/>
                </div>
                <div className="form-group">
                    <button type="submit">Register</button>
                </div>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </section>
    );
};