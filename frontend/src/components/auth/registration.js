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

export const Registration = () => {
    const [register, setRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    
    function onChangeUsername(e) {
        setUsername(e.target.value)
    }
    function onChangeEmail(e) {
        setEmail(e.target.value)
    }
    function onChangePassword(e) {
        setPassword(e.target.value)
    }

     function submitForm(e) {
      e.preventDefault()
      AuthService.register(
          username,
          email,
          password
      ).then((response) =>{
        if(response.data.message == 'User registered successfully'){
          setRegister(true);
          setSuccess(true)
          setMessage(response.data.message);
          
        }else{
          setRegister(true);
          setSuccess(false)
          setMessage(response.data.message ? response.data.message : response.data)
}
        })
      }
    
    

    return (
        <div className="col-md-12">
          < Form onSubmit={submitForm}>
           {
             register && <Banner type={ success ? "success" : "error" } message={message} />
           }
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
                  <button className="btn btn-primary btn-block" type='submit'>Sign Up</button>
                </div>
              </div>
            
          </Form>

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
