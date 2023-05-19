import "./login.css";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";

const loginFormKeys = {
  Username: "username",
  Password: "password",
};

export const Login = () => {
  const { onLoginSubmit } = useContext(AuthContext);

  const { onSubmit, onChangeHandler, values } = useForm(
    () => onLoginSubmit(values),
    {
      [loginFormKeys.Username]: "",
      [loginFormKeys.Password]: "",
    }
  );

  return (
    <section className="login-section">
      <h2>Login</h2>
      <form method="post" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={onChangeHandler}
            value={values[loginFormKeys.Username]}
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
        Don't have an account? <a href="/login">login</a>
      </p>
    </section>
  );
};