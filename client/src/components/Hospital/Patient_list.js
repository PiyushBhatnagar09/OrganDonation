import React, { Component } from 'react';
import { Grid, Form, Segment, Header, Button, Icon, Divider, Message } from 'semantic-ui-react';
import Hospital_nav from './Hospital_nav';
import contract from '../../ethereum/web3';
import Web3 from 'web3';

const sha3 = require('js-sha3');
const { toChecksumAddress } = require('ethereumjs-util');


class PatientRecord extends Component {
    state = {
        publicKey: '',
        ipfsHash: '',
        loading: false,
        errMsg: ''
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errMsg: '' });

        const { publicKey } = this.state;
        const hash = sha3.keccak256(publicKey);

        // Take the rightmost 160 bits of the hash value
        const addressBytes = hash.slice(-20);

        // Convert the address bytes to a hexadecimal string
        const address = '0x' + Buffer.from(addressBytes).toString('hex');

        // Use ethereumjs-util to convert the address to checksum format
        const checksumAddress = toChecksumAddress(address);

        if (typeof window.ethereum !== 'undefined') {
            // Request the user's permission to connect to MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Use MetaMask as the web3 provider
            const web3 = new Web3(window.ethereum);

            // Get the user's account
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            try {
                const ipfsHash = await contract.methods.getEMR(checksumAddress).send(
                    {
                        from: account,
                        gas: 1000000
                    }
                );
                if (!ipfsHash)
                    throw Object.assign(
                        new Error("Patient Doesn't Exists!")
                    );
                this.setState({ ipfsHash });
            }
            catch (err) {
                this.setState({ errMsg: err.message })
            }
            this.setState({ loading: false });
        }
        else {
            alert('Please install MetaMask to use this dApp');
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
                                Get Patient's EMR
                            </Header>
                            <Divider />
                            <Form onSubmit={this.onSubmit}>
                                <Form.Input
                                    value={this.state.publicKey}
                                    onChange={this.onChange}
                                    name="publicKey"
                                    label='Public Key'
                                    placeholder='Public Key'
                                    required
                                />
                                <Message error header="Oops!" content={this.state.errMsg} />
                                <Segment basic textAlign={"center"}>
                                    <Button loading={this.state.loading} positive type='submit'>Get EMR</Button>
                                </Segment>
                            </Form>
                            <Segment basic textAlign={"center"}>
                                {this.state.ipfsHash ?
                                    <Button
                                        primary
                                        style={{ textAlign: "center" }}
                                        href={`https://ipfs.io/ipfs/${this.state.ipfsHash}`}
                                        target="_blank"
                                    >
                                        <Icon name="download" /> Download EMR
                                    </Button>
                                    : null
                                }
                            </Segment>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </>
        )
    }
}

export default PatientRecord; 