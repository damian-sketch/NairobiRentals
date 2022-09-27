import "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../services/auth.service";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validate = (values) => {
  let errors = {};
  if (values.email === "") {
    errors.email = "Email is required";
  }
  return errors;
};

export const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        await AuthService.resetPassword(values.email).then((response) => {
          toast.success(response.message);
        });
      } catch (e) {
        toast.error(e.response.data.msg);
      }
    },
  });

  return (
    <div>
      <ToastContainer autoClose={2000} closeOnClick closeButton />
      <h1>Please enter the email linked to your account</h1>
      <Form onSubmit={formik.handleSubmit}>
        <div className="resetPass">
          <label htmlFor="email">Email</label>
          <div className="form-group">
            <Input
              type="text"
              className="form-control"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          {formik.errors.username ? (
            <div className="text-danger">{formik.errors.username}</div>
          ) : null}
          <button className="emailSubmit">Reset Password</button>
        </div>
      </Form>
    </div>
  );
};

export const Banner = ({ message, type }) => {
  return (
    <div
      className={type == "error" ? "alert alert-danger" : "alert alert-success"}
    >
      <p>{message}</p>
    </div>
  );
};
