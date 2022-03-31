import './styles.css'
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from '../../services/auth.service';
import { useFormik } from 'formik';

const validate= values => {
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
}

export const Login = () => {
    const navigate = useNavigate()
    
    const formik = useFormik({
      initialValues: {
        username: '',
        password: ''
      },
      validate,
      onSubmit: async (values) => {
       await AuthService.login(
          values.username,
          values.password
        )
        navigate('/')
      }  
    });


    return (
      <div className='row d-flex justify-content-center'>
        <div className="col-md-4">
          < Form onSubmit={formik.handleSubmit}>
           
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
                {formik.errors.username ? <div>{formik.errors.username}</div> : null}
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
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                <div className="form-group">
                  <button className="btn btn-primary btn-block" type='submit'>Log In</button>
                </div>
              </div>
            
          </Form>

          <div>
            <br/>
            <p>Don't have an account?</p>
            <NavLink to="/">Register</NavLink>
          </div>

      </div>
      </div>
    )
}

export const Banner = ({message, type}) => {
  return(
    <div className={type == "error" ? "alert alert-danger" : "alert alert-success"}>
    <p>{message}</p>
    </div>
  )
  }
