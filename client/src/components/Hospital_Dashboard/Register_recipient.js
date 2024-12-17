import React, { Component } from 'react';
import { Form, Button, Grid, Segment, Header, Divider, Message } from 'semantic-ui-react';
import Hospital_nav from './Hospital_nav';
import { jwtDecode } from 'jwt-decode';
import { ethers } from 'ethers';
import web3 from "web3";
import Noty from "noty";
import "noty/lib/noty.css"; // Default CSS
import "noty/lib/themes/sunset.css";

const sha3 = require('js-sha3');

class RegisterRecipient extends Component {
    state = {
        fname: '',
        lname: '',
        gender: 'Male',
        city: 'Gwalior',
        phone: '',
        email: '',
        bloodgroup: 'A+',
        organ: 'Eyes',
        buffer: null,
        aadhaarNumber: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const { fname, lname, gender, city, phone, email, bloodgroup, organ, buffer, aadhaarNumber } = this.state;

        try {
            if (window.ethereum) {
                if (window.ethereum.isMetaMask) {
                    // MetaMask is installed
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

                    if (accounts.length > 0) {
                        try {
                            const hash = sha3.keccak256(this.state.aadhaarNumber);
                            const addressBytes = hash.slice(-40);
                            const address = '0x' + addressBytes.toString('hex');
                            const checksumAddress = web3.utils.toChecksumAddress(address);

                            const amount = { value: ethers.parseEther("0") };

                            const { contract } = this.props;

                            const token = localStorage.getItem('token');
                            const decodedToken = jwtDecode(token);
                            const hospitalid = decodedToken.key;


                            //interacting with contract
                            const transaction = await contract.addRecipient(checksumAddress, hospitalid, organ, bloodgroup, amount);
                            await transaction.wait();

                            //updating data in MongoDB
                            const data = JSON.stringify({ 
                                fname, 
                                lname,
                                gender,
                                city,
                                phone,
                                email, 
                                bloodgroup,
                                organ,
                                recipient_addr: checksumAddress // Adding the calculated donor address
                            });
                            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipients`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: data,
                            });

                            new Noty({
                                theme: 'sunset',
                                text: "Recipient Registered Successfully",
                                type: "success", // 'alert', 'success', 'error', 'warning', 'info'
                                layout: "topRight", // Position on the screen
                                timeout: 2000,
                            }).show();
                            this.setState({ loading: false });
                        }
                        catch (err) {
                            new Noty({
                                theme: 'sunset',
                                text: "Recipient already present",
                                type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                                layout: "topRight", // Position on the screen
                                timeout: 2000,
                            }).show();
                            this.setState({ loading: false });
                        }
                    }
                }
            } else {
                // MetaMask is not installed, show an error message
                new Noty({
                    theme: 'sunset',
                    text: "Please Login to MetaMask",
                    type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                    layout: "topRight", // Position on the screen
                    timeout: 2000,
                }).show();
            }
        }
        catch (err) {
            new Noty({
                theme: 'sunset',
                text: err,
                type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                layout: "topRight", // Position on the screen
                timeout: 2000,
            }).show();
        }
    }

    captureFile = event => {
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) });
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div>
                <Hospital_nav />
                <Grid centered columns={2} style={{ marginTop: '20px' }}>
                    <Grid.Column width={9}>
                        <Segment>
                            <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                                Register New Recipient
                            </Header>
                            <Divider />
                            <Form onSubmit={this.onSubmit} error={!!this.state.errMsg} success={!!this.state.successMsg}>
                                <Form.Group widths={2}>
                                    <Form.Input
                                        value={this.state.fname}
                                        onChange={this.onChange}
                                        name="fname"
                                        label='First name'
                                        placeholder='First name'
                                        required
                                    />
                                    <Form.Input
                                        value={this.state.lname}
                                        onChange={this.onChange}
                                        name="lname"
                                        label='Last name'
                                        placeholder='Last name'
                                        required
                                    />
                                </Form.Group>
                                <Form.Group widths={2}>
                                    <Form.Field
                                        value={this.state.gender}
                                        onChange={this.onChange}
                                        name="gender"
                                        label='Gender'
                                        control='select'
                                        required
                                    >
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Other'>Other</option>
                                    </Form.Field>
                                    <Form.Field
                                        value={this.state.city}
                                        onChange={this.onChange}
                                        name="city"
                                        label='City'
                                        control='select'
                                        required
                                    >
                                        <option value='Gwalior'>Gwalior</option>
                                        <option value='New Delhi'>New Delhi</option>
                                        <option value='Pune'>Pune</option>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths={2}>
                                    <Form.Input
                                        value={this.state.phone}
                                        onChange={this.onChange}
                                        name="phone"
                                        label='Phone'
                                        placeholder='Phone'
                                        required
                                    />
                                    <Form.Input
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        name="email"
                                        type="email"
                                        label='Email'
                                        placeholder='Email'
                                        required
                                    />
                                </Form.Group>
                                <Form.Group widths={2}>
                                    <Form.Field
                                        value={this.state.bloodgroup}
                                        onChange={this.onChange}
                                        name="bloodgroup"
                                        label='Blood Group'
                                        control='select'
                                        required
                                    >
                                        <option value='A+'>A+</option>
                                        <option value='A-'>A-</option>
                                        <option value='B+'>B+</option>
                                        <option value='B-'>B-</option>
                                        <option value='AB+'>AB+</option>
                                        <option value='AB-'>AB-</option>
                                        <option value='O+'>O+</option>
                                        <option value='O-'>O-</option>
                                    </Form.Field>
                                    <Form.Field
                                        value={this.state.organ}
                                        onChange={this.onChange}
                                        name="organ"
                                        label='Organ'
                                        control='select'
                                        required
                                    >
                                        <option value='Eyes'>Eyes</option>
                                        <option value='Heart'>Heart</option>
                                        <option value='Kidney'>Kidney</option>
                                        <option value='Liver'>Liver</option>
                                        <option value='Lungs'>Lungs</option>
                                        <option value='Pancreas'>Pancreas</option>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths={1}>
                                    <Form.Input
                                        value={this.state.aadhaarNumber}
                                        onChange={this.onChange}
                                        name="aadhaarNumber"
                                        label='aadhar number'
                                        placeholder='aadhar number'
                                        required
                                    />

                                </Form.Group>


                                <Message error header="Oops " content={this.state.errMsg} />
                                <Message success header="Success " content={this.state.successMsg} />
                                <Segment basic textAlign={"center"}>
                                    <Button loading={this.state.loading} positive type='submit'>Register</Button>
                                </Segment>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default RegisterRecipient;