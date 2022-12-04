import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import './Login.css'
import logo from '../../images/logo.png';
import banner from '../../images/banner.png'

const Login = () => {
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
    error: []
  });
  const handelChange = (event) => {
    event.persist();
    setLogin({ ...login, [event.target.name]: event.target.value });
  };
  const loginSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: login.email,
      password: login.password
    };
    axios.post(`https://test.nexisltd.com/login`, data).then(response => {
      console.log();
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token);
      history.push('/attendance');
      setLogin({
        error: ''
      })
      swal("Success", "Login Successful!", "success");
    })
      .catch((err) => {
        setLogin({ ...login, error: err.response.data.error });
        swal("Warning", err.response.data.error, "error");
      })
  }
  return (
    <div className='d-flex'>
      <div className="image-area row">
        <div className="mt-5 logo col-12">
          <img src={logo} alt="logo" className='ms-5' />
        </div>
        <div className="banner-area col-12 d-flex justify-content-center" style={{ height: "60%" }}>
          <img src={banner} alt="banner" />
        </div>
      </div>
      <div className="form-area">
        <div>
          <div className="mt-5 logo col-12">
            <img src={logo} alt="logo" />
          </div>
          <h3 className='text-center fw-bold my-5'>Login Form</h3>
          <form onSubmit={loginSubmit} className="mb-5">
            <div className="mb-3">
              <input type="email" name="email" onChange={handelChange} value={login.email} placeholder="Write Email Address" />
            </div>
            <div className="mb-3">
              <input type="password" name="password" onChange={handelChange} value={login.password} placeholder="Write password" />
              <small>your password must be 8 character</small>
            </div>
            <div className="mb-3">
              <button type="submit" className="fw-bold btn btn-primary btn-sm" >Login</button>
            </div>
          </form>
          <small >Don't have an account? <Link to="/signup" className='fw-bold'>SIGNUP HERE!</Link></small>
        </div>
      </div>
    </div>
  );
};

export default Login;