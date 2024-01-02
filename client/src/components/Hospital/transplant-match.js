import React, { Component } from 'react';
import {jwtDecode} from 'jwt-decode';
import contract from '../../ethereum/web3';
import Web3 from 'web3';
import RenderList from './render-list';
import { Card, Segment, Header, Divider, Grid, Form, Button, Dimmer, Loader } from 'semantic-ui-react';
import Hospital_nav from './Hospital_nav';


class TransplantMatch extends Component {

    state = {
        recipient_arr: [],
        loading: true,
        errMsg: '',
        recipientCount: 0,
    }

    Oncheck = async (event) => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        const hospitalId = decodedToken.key;

        if (typeof window.ethereum !== 'undefined') {
            // Request the user's permission to connect to MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Use MetaMask as the web3 provider
            const web3 = new Web3(window.ethereum);
            // Get the user's account
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            try {

                const result = await contract.methods.getRecipientCount(hospitalId).call();
                var recipient_arr = [];

                for (let i = 0; i < result[0]; i++) {

                    const recipient = await contract.methods.getRecipientDetail(hospitalId, i).call();


                    if (recipient[1] === "") {

                        continue;
                    }

                    const temp = recipient[1];
                    const data = JSON.stringify({
                        recipientId: recipient[0],
                        organ: recipient[2],
                        bloodgroup: recipient[3]
                    });
                    const element = JSON.parse(data);
                    recipient_arr.push(element);
                }
                this.setState({ recipient_arr });
            }
            catch (err) {
                console.log("Error Catched => " + err);
            }
            this.setState({ loading: false })
        }
        else {
            alert("check the metamask and if you are logged In");
        }
    }

    renderList = () => {
        const List = this.state.recipient_arr.map((recipient) => {
            return (
                <div key={recipient.recipientId}>
                    <RenderList recipient={recipient} />
                    <Divider />
                </div>
            );
        });
        return <div>{List}</div>;
    }

    render() {
        return (
            <div>
                <Hospital_nav />

                {
                    this.state.loading ?
                        <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                            Click Below if want to see the transplant matches <br />
                            <Button positive type='submit' onClick={this.Oncheck}>Check</Button>
                        </Header>
                        :
                        <Grid centered columns={2} style={{ marginTop: "10px" }}>
                            <Grid.Column width={11}>
                                {this.renderList()}
                            </Grid.Column>
                        </Grid>

                }
            </div>
        )
    }
}

export default TransplantMatch;