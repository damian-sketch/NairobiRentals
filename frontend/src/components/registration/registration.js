import "./styles.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useFormik } from "formik";
import AuthService from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resonse } from "../../services/auth.service";
import "react-toastify/dist/ReactToastify.css";

export const Registration = () => {
  const [register, setRegister] = useState(false);
  const [error, setError] = useState("");
  let message = "";
  const navigate = useNavigate();

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
    if (values.fullnames === "") {
      errors.fullnames = "Full Names are required";
    }
    if (values.email === "") {
      errors.email = "Email is required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      fullnames: "",
      email: "",
      username: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const id = toast.loading("Registering...");
        console.log(resonse);
        await AuthService.register(
          values.fullnames,
          values.username,
          values.email,
          values.password
        ).then((response) => {
          if (response.data.message == "User registered successfully") {
            setRegister(true);
            message = response.data.message;
          } else {
            setRegister(false);
            message = response.data.message
              ? response.data.message
              : response.data;
          }
        });

        if (register) {
          toast.update(id, { render: message, type: "success" });
        } else {
          toast.update(id, { render: message, type: "error" });
        }
      } catch (e) {
        if (e.message == "Request failed with status code 401") {
          setError("Wrong email or password!");
        }
      }
    },
  });

  return (
    <div className="registerForm">
      <ToastContainer autoClose={3000} closeOnClick closeButton />
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <div className="form-group">
                <label htmlFor="fullnames">Full Names</label>
                <Input
                  type="text"
                  className="form-control"
                  name="fullnames"
                  value={formik.values.fullnames}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.fullnames ? (
                <div className="text-danger">{formik.errors.fullnames}</div>
              ) : null}
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
                  type="password"
                  className="form-control"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
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
