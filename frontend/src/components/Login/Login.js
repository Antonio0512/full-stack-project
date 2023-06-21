import "./login.css";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";
import {Link} from "react-router-dom";

const loginFormKeys = {
  Email: "email",
  Password: "password",
};

export const Login = () => {
  const {onLoginSubmit} = useContext(AuthContext);

  const { onSubmit, onChangeHandler, values } = useForm(
    () => onLoginSubmit(values),
    {
      [loginFormKeys.Email]: "",
      [loginFormKeys.Password]: "",
    }
  );

  return (
    <section className="login-section">
      <h2>Login</h2>
      <form method="post" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="username"
            name="email"
            onChange={onChangeHandler}
            value={values[loginFormKeys.Email]}
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
            value={values[loginFormKeys.Password]}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <p>
          Don't have an account? <Link to="/register">Register </Link>
      </p>
    </section>
  );
};