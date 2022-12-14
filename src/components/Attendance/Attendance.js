import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { BiChevronsRight } from "react-icons/bi";
import logo from '../../images/logo.png'

const Attendance = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    let access_token = localStorage.getItem('access_token')
    useEffect(() => {
        axios.get('https://test.nexisltd.com/test', {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(response => {
                setData(response.data)
            }).catch((err) => {
                setError(err.response.data.error);
                swal("Warning", err.response.data.error, "error");
            })
    }, [access_token])
    let date = '';
    return (
        <div className='container my-5'>
            <img src={logo} alt="" style={{ width: "200px" }} />
            <div className='p-2 h4 my-5  text-center' >
                <span className=' py-3 px-4 text-white' style={{ background: "#3B8BEA", borderRadius: "5px" }}>Attendance Information</span>
              
            </div>
            <p className='fw-bold text-center' style={{ color: "red" }}>(when you refresh the page, the data in this table will change each time)</p>
            {
                error ?
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "55vh" }}>
                        <div className='text-center'>
                            <h5 className='fw-bold' style={{ color: "red" }}>{error}</h5>
                            <Link className='btn btn-primary fw-bold' to="/login"> Login first<BiChevronsRight size="30" /></Link>
                            
                        </div>
                    </div>
                    : Object.values(data).length > 0 ?
                        <div>
                        
                        <table className='table'>
                            <thead className="text-center text-dark">
                                <tr>
                                    <th>Date</th>
                                    <th>Employee Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            {
                                Object.values(data).map(i =>
                                    <tbody key={i.id} className="text-center">
                                        <tr>
                                            <td>
                                                {
                                                    date = (Object.keys(i.attendance)[Math.floor(Math.random() * Object.keys(i.attendance).length)]).split('-').reverse().join('/')
                                                }
                                            </td>
                                            <td>{i.name}</td>
                                            <td>{i.attendance[date.split('/').reverse().join('-')].status}</td>
                                        </tr>
                                    </tbody>
                                )
                            }
                        </table>
                        </div>
                        : <div className='d-flex justify-content-center align-items-center' style={{ height: "100%" }}><h2 className='fw-bold text-danger'>Loading new data.......</h2></div>
            }
        </div>
    );
};

export default Attendance;