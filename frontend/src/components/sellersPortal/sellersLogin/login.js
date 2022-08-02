import "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../../services/auth.service";
import { useFormik } from "formik";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import fetchEnvVariable from "../../../helpers/fetchEnvVariable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import timeout from "../../../helpers/delay";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [passwordType, setPasswordType] = useState("password");
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
        navigate("/portal/post-house");
        window.location.reload(true);
      } catch (e) {
        toast.error(e.response.data.msg);
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

  // This function is used to handle the google login
  const handleLogin = async (googleData) => {
    try {
      await AuthService.sellersLoginWithGoogle(googleData).then((response) => {
        toast.success(response.msg);
      });
      await timeout(2000);
      navigate("/portal/post-house");
    } catch (e) {
      toast.error(e.response.data.msg);
      await timeout(2000);
      navigate("/sellers/register");
    }
  };

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ToastContainer autoClose={3000} closeOnClick closeButton />
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
                  <label htmlFor="username">Username</label>
                  <div className="form-group">
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

                  <label htmlFor="password">Password</label>
                  <div className="form-group">
                    <Input
                      type="password"
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
            clientId={clientId}
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={"single_host_origin"}
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
