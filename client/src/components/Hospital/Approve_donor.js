import React, { Component } from 'react';
import { Grid, Form, Segment, Header, Button, Divider, Message } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import Hospital_nav from './Hospital_nav';
import contract from '../../ethereum/web3';
import Web3 from 'web3';
const sha3 = require('js-sha3');
const { toChecksumAddress } = require('ethereumjs-util');

class ApproveDonor extends Component {
    state = {
        fname: '',
        lname: '',
        email: '',
        donorId: '',
        buffer: null,
        ipfsHash: '',
        EMRHash: '',
        loading: false,
        errMsg: '',
        successMsg: ''
    }


    onChange = event => {

        this.setState({ [event.target.name]: event.target.value });
    }



    onApprove = (event) => {
        event.preventDefault();

        this.setState({ errMsg: '', successMsg: '' });

        const { fname, lname, email, buffer, donorId } = this.state;

        axios.get(`http://localhost:5002/api/donors/${email}`)
            .then(async (res) => {

                this.setState({ loading: true });

                const { gender, city, phone, email, organ, bloodgroup } = res.data;

                const data = JSON.stringify({ fname, lname, gender, city, phone, email });

                var result = "563jhjh"
                this.setState({ ipfsHash: result });
                result = "435353";
                this.setState({ EMRHash: result });
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
                        const hash = sha3.keccak256(this.state.donorId);

                        // Take the rightmost 160 bits of the hash value
                        const addressBytes = hash.slice(-20);

                        // Convert the address bytes to a hexadecimal string
                        const address = '0x' + Buffer.from(addressBytes).toString('hex');

                        // Use ethereumjs-util to convert the address to checksum format
                        const checksumAddress = toChecksumAddress(address);

                        console.log(checksumAddress);

                        const accounts = await web3.eth.getAccounts();
                        await contract.methods.addDonor(checksumAddress, this.state.ipfsHash, this.state.EMRHash, organ, bloodgroup).send({
                            from: accounts[0],
                            gas: 1000000
                        });
                        this.setState({ successMsg: "Donor Approved !" })
                    }
                    catch (err) {
                        this.setState({ errMsg: "Donor doesnt exist or already exists" })
                    }
                    this.setState({ loading: false });
                }
                else {
                    alert('Please install MetaMask to use this dApp');
                }
            }).catch(err => this.setState({ errMsg: err.message }));

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
                                    value={this.state.donorId}
                                    onChange={this.onChange}
                                    name="donorId"
                                    label='Donor Public Key'
                                    placeholder='Donor Public Key'
                                    required
                                />
                                {/* <Form.Input
                                    onChange={this.captureFile}
                                    name="EMR"
                                    label="EMR"
                                    type="file"
                                    required
                                /> */}
                                {
                                    this.state.errMsg && this.state.errMsg.length > 0 ?
                                        <Message success header="Sucess" content={this.state.successMsg} /> : <Message error header="Oops!!" content={this.state.errMsg} />
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