import React, { Component } from 'react';
import { Grid, Form, Segment, Header, Button, Divider, Message } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import Hospital_nav from './Hospital_nav';
import {ethers} from 'ethers';
import web3 from "web3";

const sha3 = require('js-sha3');
// const { toChecksumAddress } = require('ethereumjs-util');

class ApproveDonor extends Component {
    state = {
        fname: '',
        lname: '',
        email: '',
        aadhaarNumber: '',
        buffer: null,
        loading: false,
        errMsg: '',
        successMsg: '',
        isRequestingAccounts: false
    }

    onChange = event => {

        this.setState({ [event.target.name]: event.target.value });
    }

    onApprove = async (event) => {
        event.preventDefault();

        this.setState({ errMsg: '', successMsg: '' });

        const { fname, lname, email, buffer, aadhaarNumber } = this.state;

        try {
            if (window.ethereum) {
                if (window.ethereum.isMetaMask) 
                {
                    // MetaMask is installed
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

                    if (accounts.length > 0) 
                    {
                        // User is logged in
                        axios.get(`https://organ-donation-pb.onrender.com/api/donors/${email}`)
                            .then(async (res) => {
                                this.setState({ loading: true });
                                // console.log(res.data);

                                const { gender, city, phone, email, organ, bloodgroup } = res.data;

                                const data = JSON.stringify({ fname, lname, gender, city, phone, email });

                                try {
                                    const hash = sha3.keccak256(this.state.aadhaarNumber);
                                    const addressBytes = hash.slice(-40);
                                    const address = '0x' + addressBytes.toString('hex');
                                    const checksumAddress = web3.utils.toChecksumAddress(address);

                                    const amount = { value: ethers.parseEther("0.0000001") };
                                    
                                    const { contract } = this.props;

                                    const transaction = await contract.addDonor(checksumAddress, organ, bloodgroup, amount);
                                    await transaction.wait();
                                    console.log("Transaction is done !!");
                                    this.setState({ successMsg: "Donor Approved !" });
                                    // console.log(this.state.successMsg);
                                }
                                catch (err) {
                                    this.setState({ errMsg: "Donor doesn't exist or already exists" });
                                }
                                this.setState({ loading: false });
                            })
                            .catch(err => this.setState({ errMsg: err.message }));
                    } else {
                        // User is not logged in
                        alert('Login to MetaMask is required to use this dApp');
                    }
                    
                } else {
                    // MetaMask is not installed
                    alert('Please install MetaMask to use this dApp');
                }
            } else {
                // MetaMask is not installed
                alert('Please install MetaMask to use this dApp');
            }
        } catch (error) {
            console.error('Error:', error);
            this.setState({ errMsg: 'Error. Please try again.' });
        }
    }

    render() {
        return (
            <>
                <Hospital_nav />
                <Grid centered columns={2} style={{ marginTop: '20px' }}>
                    <Grid.Column width={6}>
                        <Segment>
                            <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                                Approve Donor
                            </Header>
                            <Divider />
                            <Form onSubmit={this.onApprove} error={!!this.state.errMsg}>
                                <Form.Input
                                    value={this.state.fname}
                                    onChange={this.onChange}
                                    name="fname"
                                    label='First Name'
                                    placeholder='First Name'
                                    required
                                />
                                <Form.Input
                                    value={this.state.lname}
                                    onChange={this.onChange}
                                    name="lname"
                                    label='Last Name'
                                    placeholder='Last Name'
                                    required
                                />
                                <Form.Input
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    name="email"
                                    label='Email'
                                    placeholder='Email'
                                    type="email"
                                    required
                                />
                                <Form.Input
                                    value={this.state.aadhaarNumber}
                                    onChange={this.onChange}
                                    name="aadhaarNumber"
                                    label='Donor Aadhaar Number'
                                    placeholder='Donor Public Key'
                                    required
                                />
                                {
                                    this.state.successMsg && this.state.successMsg.length > 0 ?
                                        <Message positive header="Sucess " content={this.state.successMsg} /> : 
                                        this.state.errMsg && this.state.errMsg.length>0 ?
                                        <Message negative header="Oops " content={this.state.errMsg} /> :
                                        <></>
                                }
                                
                                <Segment basic textAlign={"center"}>
                                    <Button loading={this.state.loading} positive type='submit'>Approve</Button>
                                </Segment>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </>
        )
    }
}

export default ApproveDonor;