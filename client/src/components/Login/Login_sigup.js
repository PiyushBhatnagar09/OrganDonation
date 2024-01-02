import "./styles.css";
import Front from "../front/Front";
import Top2 from "../Navbar/Top2";
import React, { Component } from 'react';
import axios from 'axios';
import { Message } from "semantic-ui-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

class DonorSignUp extends Component {
    state = {
        fname: '',
        lname: '',
        gender: 'Male',
        city: 'Gwalior',
        phone: '',
        email: '',
        bloodgroup: 'A+',
        organ: 'Eyes',
        errMsg: '',
        succMsg: '',
        pass: '',
    }

    onSubmit = event => {
        event.preventDefault();

        this.setState({ errMsg: '' });

        const { fname, lname, gender, city, phone, email, bloodgroup, organ, pass } = this.state;
        const donor = { fname, lname, gender, city, phone, email, bloodgroup, organ, pass };
        console.log(donor);
        axios.post("http://localhost:5002/api/donors/", donor)
            .then((res) => {

                this.setState({ succMsg: "Donor Added Successfully" });
                window.location = "/Hospital_list";
            })
            .catch(err => this.setState({ errMsg: err.message }));

    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <>
                <Top2 />
                <left>
                    <div className="login">
                        <div className="form_wrapper" style={{ textAlign: 'right' }}>
                            <div className="form_container" >
                                <div className="title_container">
                                    <h2>Organ Donation Signup</h2>
                                </div>
                                <div className="row clearfix">
                                    <div className="">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="input_field select_option"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                                <input type="email" name="email" placeholder="Email" value={this.state.email} required onChange={this.onChange} />
                                            </div>
                                            <div className="input_field select_option"> <span><i aria-hidden="true" className="fa fa-key"></i></span>
                                                <input type="password" name="pass" placeholder="Password" value={this.state.pass} required onChange={this.onChange} />
                                            </div>
                                            <div className="input_field select_option ">
                                                <span>
                                                    <FontAwesomeIcon icon={faPhone} />
                                                </span>
                                                <input type="tel" className="icon" style={{ width: '360px', height: '33px' }} value={this.state.phone} onChange={this.onChange} name="phone" placeholder="Phone number" />
                                            </div>

                                            <div className="row clearfix">
                                                <div className="col_half">
                                                    <div className="input_field select_option">
                                                        <input type="text" name="fname" placeholder="First Name" value={this.state.fname} onChange={this.onChange} required />
                                                    </div>
                                                </div>
                                                <div className="col_half">
                                                    <div className="input_field select_option">
                                                        <input type="text" name="lname" placeholder="Last Name" value={this.state.lname} onChange={this.onChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input_field select_option">
                                                <select name="gender" placeholder="Gender" value={this.state.gender} onChange={this.onChange} required>
                                                    <option value="" disabled hidden><center>Select Gender</center></option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Others">Other</option>

                                                </select>
                                            </div>
                                            <div className="input_field select_option">
                                                <select name="bloodgroup" placeholder="Blood Group" value={this.state.bloodgroup} onChange={this.onChange} required>
                                                    <option>Select a Blood Type</option>
                                                    <option value="A-">A-</option>
                                                    <option value="A+">A+</option>
                                                    <option value="B-">B-</option>
                                                    <option value="B+">B+</option>
                                                    <option value="AB-">AB-</option>
                                                    <option value="AB+">AB+</option>
                                                    <option value="O-">O-</option>
                                                    <option value="O+">O+</option>
                                                </select>
                                            </div>
                                            <div className="input_field select_option">
                                                <select name="city" placeholder="Choose City" value={this.state.city} onChange={this.onChange} required>
                                                    <option>Select a City for Hospital location</option>
                                                    <option value="New Delhi">Delhi</option>
                                                    <option value="Mumbai">Mumbai</option>
                                                    <option value="Pune">Pune</option>
                                                    <option value="Bangalore">Bangalore</option>
                                                    <option value="Jaipur">Jaipur</option>
                                                    <option value="Chandigarh">Chandigarh</option>
                                                </select>
                                            </div>
                                            <div className="input_field select_option">
                                                <select name="organ" placeholder="Choose Organ" value={this.state.organ} onChange={this.onChange} required>
                                                    <option>Select a organ to donate</option>
                                                    <option value="Eyes">Eyes</option>
                                                    <option value="Heart">Heart</option>
                                                    <option value="Lungs">Lungs</option>
                                                    <option value="Liver">Liver</option>
                                                    <option value="Pancreas">Pancreas</option>
                                                    <option value="Kidney">Kidney</option>
                                                </select>
                                            </div>




                                            <input className="button" type="submit" value="Register" />

                                            {
                                                this.state.errMsg && this.state.errMsg.length > 0 ?
                                                    <Message error header="Oops!!" content={this.state.errMsg} /> : <div />
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </left>
            </>
        );
    }

}

export default DonorSignUp;

