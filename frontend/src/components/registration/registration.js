import "./styles.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useFormik } from "formik";
import AuthService from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import timeout from "../../helpers/delay";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Registration = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");

  const validate = (values) => {
    let errors = {};
    if (values.username === "") {
      errors.username = "Username is required";
    } else if (values.username.length < 4) {
      errors.username = "Username must be at least 4 characters";
    }
    if (values.password === "") {
      errors.password = "Password is required";
    } else if (values.password.length < 3) {
      errors.password = "Password must be 3 characters at minimum";
    }

    if (values.email === "") {
      errors.email = "Email is required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        await AuthService.register(
          values.username,
          values.email,
          values.password
        ).then((response) => {
          toast.success(response.message);
        });
        await timeout(2000);
        await AuthService.login(values.username, values.password).then(() => {
          navigate("/");
        });
      } catch (e) {
        toast.error(e.response.data.message);
      }
    },
  });
  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  return (
    <div className="registerForm">
      <ToastContainer autoClose={3000} closeOnClick closeButton />
      <div className="row d-flex justify-content-center">
        <div>
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <h1> Sign Up</h1>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.username ? (
                <div className="text-danger">{formik.errors.username}</div>
              ) : null}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type={passwordType}
                  className="form-control"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <button
                  onClick={togglePassword}
                  type="button"
                  className="passReveal"
                >
                  {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Sign Up
                </button>
                <p className="text-danger">{error}</p>
              </div>
            </div>
          </Form>

          <div>
            <br />
            <p>Already signed up?</p>
            <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
