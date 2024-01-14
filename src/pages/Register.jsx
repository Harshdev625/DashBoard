import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createUserAsync } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit,formState: { errors }, } = useForm();
  const navigate = useNavigate();

  return (
    <div className="display">
      <div className="homepage">
        <p className="heading">Register</p>
        <form
          onSubmit={handleSubmit((data) => {
            dispatch(
              createUserAsync({
                name: data.name,
                email: data.email,
                password: data.password,
                dateOfBirth: data.date,
              })
            );
            navigate("/UserProfile");
          })}
        >
          <div className="container">
            <label className="form-title" htmlFor="name">
              Name
            </label>
            <br />
            <input className="input-area" {...register("name")} id="name" />
            <br />
            <label className="form-title" htmlFor="email">
              Email
            </label>
            <br />
            <input
              className="input-area"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  // eslint-disable-next-line
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "email not valid ",
                },
              })}
              type="email"
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
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: `- at least 8 characters
                                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                                - Can contain special characters`,
                },
              })}
              type="password"
            />
            {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
            <br />
            <label className="form-title" htmlFor="date">
              Date Of Birth
            </label>
            <br />
            <input
              className="input-area"
              style={{ textTransform: "uppercase" }}
              type="date"
              id="dateOfBirth"
              {...register("date")}
            />

            <br />
            <button type="submit" value="Sign in" className="signin-button">
              Register
            </button>
          </div>
        </form>
        <p className="nav-text">
          Already Registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
