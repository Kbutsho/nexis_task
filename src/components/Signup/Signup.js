import React, { useState } from 'react';
import logo from '../../images/logo.png';
import banner from '../../images/banner.png'
import swal from 'sweetalert';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const history = useHistory();
    const [signup, setSignUp] = useState({
        first_name: '',
        last_Name: '',
        phone_number: '',
        email: '',
        password: ''
    });
    const handelChange = (event) => {
        event.persist();
        setSignUp({ ...signup, [event.target.name]: event.target.value });
    };
    const signUpSubmit = (event) => {
        event.preventDefault();
        const data = {
            first_name: signup.first_name,
            last_Name: signup.last_Name,
            phone_number: signup.phone_number,
            email: signup.email,
            password: signup.password
        };
        axios.post(`https://test.nexisltd.com/signup`, data).then(response => {
            //   localStorage.setItem('access_token', response.data.access_token)
            //   localStorage.setItem('refresh_token', response.data.refresh_token);
            swal("Success", "signup successful!", "success");
            history.push('/login');

        })
            .catch((err) => {
                // setSignUp({ ...signup, error: err.response.data.error });
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
                    <h3 className='text-center fw-bold my-5'>Signup Form</h3>
                    <form onSubmit={signUpSubmit} className="mb-5">
                        <div className="mb-3">
                            <input type="text" name="first_name" onChange={handelChange} value={signup.first_name} placeholder="First name" />
                        </div>
                        <div className="mb-3">
                            <input type="text" name="last_Name" onChange={handelChange} value={signup.last_Name} placeholder="Last name" />
                        </div>
                        <div className="mb-3">
                            <input type="text" name="phone_number" onChange={handelChange} value={signup.phone_number} placeholder="Phone" />
                        </div>
                        <div className="mb-3">
                            <input type="email" name="email" onChange={handelChange} value={signup.email} placeholder="Email" />
                        </div>
                        <div className="mb-3">
                            <input type="text" name="password" onChange={handelChange} value={signup.password} placeholder="password" />
                            <small>your password must be 8 character</small>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="fw-bold btn btn-primary btn-sm" >Signup</button>
                        </div>
                    </form>
                    <small >Have an account? <Link to="/login" className='fw-bold'>LOGIN HERE!</Link></small>
                </div>
            </div>
        </div>
    );
};

export default Signup;