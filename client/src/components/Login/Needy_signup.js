import { useState } from "react";
import "./styles.css";
import Front from "../front/Front";
import Top2 from "../Navbar/Top2";

function Needy_signup() {
    const [signIn, toggle] = useState(true);
    return (
        <>
            <Top2 />
            <div className="login">
                <div className="form_wrapper">
                    <div className="form_container">
                        <div className="title_container">
                            <h2>Organ Donation Signup</h2>
                        </div>
                        <div className="row clearfix">
                            <div className="">
                                <form action="">
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                        <input type="email" name="email" placeholder="Email" required />
                                    </div>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="password" name="password" placeholder="Password" required />
                                    </div>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="password" name="password" placeholder="Re-type Password" required />
                                    </div>
                                    <div className="row clearfix">
                                        <div className="col_half">
                                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                                <input type="text" name="name" placeholder="First Name" />
                                            </div>
                                        </div>
                                        <div className="col_half">
                                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                                <input type="text" name="name" placeholder="Last Name" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input_field radio_option">
                                        <input type="radio" name="radiogroup1" id="rd1" />
                                        <label for="rd1">Male</label>
                                        <input type="radio" name="radiogroup1" id="rd2" />
                                        <label for="rd2">Female</label>
                                        <input type="radio" name="radiogroup1" id="rd3" />
                                        <label for="rd3">Others</label>
                                    </div>
                                    <div className="input_field select_option">
                                        <select>
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
                                    <div className="input_field">
                                        <input type="number" name="weight" placeholder="weight(in kg)" required />
                                    </div>
                                    <div className="input_field">
                                        <input type="number" name="height" placeholder="height(in cm)" required />
                                    </div>

                                    <div className="select_arrow"></div>
                                    <div className="input_field checkbox_option">
                                        <input type="checkbox" id="cb1" />
                                        <label for="cb1">I agree with terms and conditions</label>
                                    </div>
                                    <Front />
                                    <input className="button" type="submit" value="Register" />
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
export default Needy_signup;


