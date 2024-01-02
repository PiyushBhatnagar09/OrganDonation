import React, { Component } from 'react';
import { Form, Button, Grid, Segment, Header, Divider, Message } from 'semantic-ui-react';
import Hospital_nav from './Hospital_nav';
import {jwtDecode} from 'jwt-decode';

import contract from '../../ethereum/web3';
import Web3 from 'web3';

const sha3 = require('js-sha3');
const { toChecksumAddress } = require('ethereumjs-util');


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
        ipfsHash: '12345',
        publicKey: '',
        EMRHash: '12345',
        loading: false,
        errMsg: '',
        successMsg: ''
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errMsg: '', successMsg: '' });

        const { fname, lname, gender, city, phone, email, bloodgroup, organ, buffer, publicKey } = this.state;
        //console.log(fname);

        if (typeof window.ethereum !== 'undefined') {
            // Request the user's permission to connect to MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Use MetaMask as the web3 provider
            const web3 = new Web3(window.ethereum);

            // Get the user's account
            const accounts = await web3.eth.getAccounts();

            const account = accounts[0];
            //console.log(account);


            try {
                const data = JSON.stringify({ fname, lname, gender, city, phone, email });

                const buf = Buffer.from(data);

                var result = "Qm1d4";

                var result1 = "Qm1d";
                this.setState({ EMRHash: result });

                const hash = sha3.keccak256(this.state.publicKey);

                // Take the rightmost 160 bits of the hash value
                const addressBytes = hash.slice(-20);

                // Convert the address bytes to a hexadecimal string
                const address = '0x' + Buffer.from(addressBytes).toString('hex');

                // Use ethereumjs-util to convert the address to checksum format
                const checksumAddress = toChecksumAddress(address);

                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                const hospitalid = decodedToken.key;


                await contract.methods.addRecipient(checksumAddress, hospitalid, result, result1, organ, bloodgroup).send({
                    from: account,
                    gas: 1000000
                });
                this.setState({ successMsg: "Repient Registered Successfully!" })
                this.setState({ loading: false });

                // Use the account for your contract interactions
                // ...

            }
            catch (err) {
                this.setState({ errMsg: "Cannot send data already present user" });
                this.setState({ loading: false });
            }

            // Use the account for your contract interactions
            // ...
        } else {
            // MetaMask is not installed, show an error message
            alert('Please install MetaMask to use this dApp');
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
        //console.log(event.target.value);
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


                                <Message error header="Oops!" content={this.state.errMsg} />
                                <Message success header="Success" content={this.state.successMsg} />
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