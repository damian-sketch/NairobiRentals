import './styles.css'
import { useEffect, useState } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import AuthService from '../../services/auth.service';


const required = value => {
    if(!value) {
        return (
            <div className='alert alert-danger' role='alert'>
                This field is required!
            </div>
        )
    }
}
const vemail = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  const vusername = value => {
    if (value.length < 4 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 4 and 20 characters.
        </div>
      );
    }
  };
  const vpassword = value => {
    if (value.length < 8 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 8 and 40 characters.
        </div>
      );
    }
  };

const Registration = () => {
    const [register, setRegister] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function onChangeUsername(e) {
        setUsername(e.target.value)
    }
    function onChangeEmail(e) {
        setEmail(e.target.value)
    }
    function onChangePassword(e) {
        setPassword(e.target.value)
    }
    function handleRegister(e) {
        e.preventDefault();
        setRegister({
            message: "",
            successful: false
        })
      }
      
        function submitForm() {
            AuthService.register(
                username,
                email,
                password
            ).then(
                response =>{
                    setRegister({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage = 
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                            setRegister({
                                successful: false,
                                message: resMessage
                            });
                }
            );
        }
    

    return (
        <div className="col-md-12">
          <Form
            onSubmit={handleRegister}
          >
           
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required,vemail]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block" onClick={submitForm}>Sign Up</button>
                </div>
              </div>
            
            {setRegister.message && (
              <div className="form-group">
                <div
                  className={
                    setRegister.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {setRegister.message}
                </div>
              </div>
            )}
          </Form>
      </div>
    )
}

export default Registration