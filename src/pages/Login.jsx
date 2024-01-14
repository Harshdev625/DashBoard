import React from "react";
import { useForm } from "react-hook-form";
import { Link,useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  return (
    <div className="display">
      <div className="homepage">
        <p className="heading">Sign In</p>
        <form
          onSubmit={handleSubmit((data) => {
            dispatch(
              loginUserAsync({ email: data.email, password: data.password })
            );
            navigate("/UserProfile");
          })}
        >
          <div className="container">
            <label className="form-title" htmlFor="email">
              Email
            </label>
            <br />
            <input
              className="input-area"
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  // eslint-disable-next-line
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "email not valid ",
                },
              })}
            />
            <br />
            <label className="form-title" htmlFor="password">
              Password
            </label>
            <br />
            <input
              className="input-area"
              id="password"
              {...register("password", {
                required: "password is required",
              })}
              type="password"
            />
            <br />
            <button type="submit" className="signin-button">
              Login
            </button>
          </div>
        </form>
        <p className="nav-text">
          Don't have an Account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
