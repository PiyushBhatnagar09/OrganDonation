import React, { Component } from "react";
import axios from "axios";
import Top2 from "../Navbar/Top2";
import "./styles.css";
import { Message } from 'semantic-ui-react';

import Noty from "noty";
import "noty/lib/noty.css"; // Default CSS
import "noty/lib/themes/sunset.css";

class Hospital_login extends Component {

    state = {
        username: 'AIIMS_Delhi',
        password: '1234',
    }

    onSubmit = event => {
        event.preventDefault();

        this.setState({ errMsg: '' });

        const { username, password } = this.state;
        const user = { username, password };

        axios.post(`${process.env.REACT_APP_API_URL}/api/hospitals/login`, user)
            .then((res) => {
                new Noty({
                    theme: "sunset",
                    text: "Hospital Login Successful",
                    type: "success", // 'alert', 'success', 'error', 'warning', 'info'
                    layout: "topRight", // Position on the screen
                    timeout: 2000,
                }).show();

                localStorage.setItem("isAuthenticated", "true");
                window.localStorage.setItem("token", res.data.token);

                window.location = "/Main_page";
            })
            .catch((err) => {
                new Noty({
                    theme: "sunset",
                    text: err.message,
                    type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                    layout: "topRight", // Position on the screen
                    timeout: 2000,
                    }).show();
            });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <>
                <Top2 />
                <section class="hospital_login">
                    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
                        <div class="container">
                            <div class="row gx-lg-5 align-items-center">
                                <div class="col-lg-6 mb-5 mb-lg-0">
                                    <h1 class="my-5 display-3 fw-bold ls-tight">

                                        <span class="text-primary">Hospital Login</span>
                                    </h1>
                                    <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                                        "Organ donation is a profound act of compassion, generosity, and humanity. By choosing to become an organ donor, we offer the invaluable gift of life to others. This selfless decision is an expression of care and empathy, leaving behind a legacy of hope and healing. It provides a second chance for those in need, igniting new beginnings and the possibility of a brighter future for countless individuals."
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
                                                    Login
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
