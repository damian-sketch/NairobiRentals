import "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../../services/auth.service";
import { useFormik } from "formik";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import fetchEnvVariable from "../../../helpers/fetchEnvVariable";

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
  return errors;
};

export const SellersLogin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [clientId, setClientId] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        await AuthService.login(values.username, values.password);
        navigate("/");
        window.location.reload(true);
      } catch (e) {
        if (e.message == "Request failed with status code 401") {
          setError("Wrong email or password!");
        }
      }
    },
  });
  useEffect(() => {
    // Call function to fetch he required environment variable
    let func = async () => {
      await fetchEnvVariable("GOOGLE_CLIENT_ID").then((response) => {
        setClientId(response.data);
      });
    };
    func().catch(console.error);
  }, []);
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="loginWrapper">
        <div className="loginText">
          <h1>Login to Your Account </h1>
          <p>
            List your house to millions of potential customers and get your
            apartments filled up quick
          </p>
        </div>
        <div className="loginForm">
          <div>
            <div className="col-md-4">
              <Form onSubmit={formik.handleSubmit}>
                <div>
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
                      Log In
                    </button>
                    <p className="text-danger">{error}</p>
                  </div>
                </div>
              </Form>

              <div className="register">
                <br />
                <p>Don't have an account?</p>
                <NavLink to="/sellers/register">
                  Register and list a house today!
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="thirdPartyLogin">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
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
