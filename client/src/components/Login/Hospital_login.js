import React, { Component } from "react";
import axios from "axios";
import Top2 from "../Navbar/Top2";
import "./styles.css";

import { Message } from 'semantic-ui-react';




class Hospital_login extends Component {

    state = {
        username: '',
        password: '',
        errMsg: ''
    }

    onSubmit = event => {
        event.preventDefault();

        this.setState({ errMsg: '' });

        const { username, password } = this.state;
        const user = { username, password };

        axios.post("http://localhost:5002/api/hospitals/login", user)
            .then((res) => {
                localStorage.setItem("isAuthenticated", "true");
                window.localStorage.setItem("token", res.data.token);



                window.location = "/Main_page";
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
                <section class="hospital_login" style={{ marginTop: "60px" }}>
                    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
                        <div class="container">
                            <div class="row gx-lg-5 align-items-center">
                                <div class="col-lg-6 mb-5 mb-lg-0">
                                    <h1 class="my-5 display-3 fw-bold ls-tight">

                                        <span class="text-primary">Signup For hospital Login</span>
                                    </h1>
                                    <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                                        "Organ donation is an act of extraordinary generosity, kindness and humanity. It is an opportunity for each of us to give the greatest gift of all - the gift of life. When we choose to become organ donors, we give the ultimate expression of love and compassion to our fellow human beings. We create a legacy of hope, of healing, and of new beginnings for those who are desperately waiting for a second chance at life." - Alexander T. Nguyen
                                    </p>
                                </div>

                                <div class="col-lg-6 mb-5 mb-lg-0">
                                    <div class="card">
                                        <div class="card-body py-5 px-md-5">
                                            <form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
                                                <div class="form-outline mb-4">
                                                    <input type="username" id="username" name="username" class="form-control" value={this.state.username} onChange={this.onChange} required />
                                                    <label class="form-label" for="username">Username</label>
                                                </div>

                                                <div class="form-outline mb-4">
                                                    <input type="password" id="password" name="password" class="form-control" value={this.state.password} onChange={this.onChange} required />
                                                    <label class="form-label" for="form3Example4">Password</label>
                                                </div>


                                                <button type="submit" class="btn btn-primary btn-block mb-4" onSubmit={this.onSubmit}>
                                                    Sign up
                                                </button>

                                            </form>
                                            {
                                                this.state.errMsg && this.state.errMsg.length > 0 ?
                                                    <Message error header="Oops!!" content={this.state.errMsg} /> : <div />
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </>
        );
    }

}
export default Hospital_login;

