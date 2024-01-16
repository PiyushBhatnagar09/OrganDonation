import React, { Component } from 'react';
import {jwtDecode} from 'jwt-decode';
// import contract from '../../ethereum/web3';
// import Web3 from 'web3';
import RenderList from './render-list';
import { Card, Segment, Header, Divider, Grid, Form, Button, Dimmer, Loader } from 'semantic-ui-react';
import Hospital_nav from './Hospital_nav';


class TransplantMatch extends Component {

    state = {
        recipient_arr: [],
        loading: true,
        errMsg: '',
        recipientCount: 0,
        empty: false
    }

    Oncheck = async (event) => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        const hospitalId = decodedToken.key;
        // console.log(hospitalId);
        
        try {
            if (window.ethereum) {
                if (window.ethereum.isMetaMask) 
                {
                    // MetaMask is installed
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

                    if (accounts.length > 0) 
                    {
                        // User is logged in
                        const { contract } = this.props;
                        
                        // console.log(contract);
                        const result = await contract.getRecipientCount(hospitalId);
                        // const result1 = await contract.getRecipientCount(hospitalId);
                        var recipient_arr = [];
                        // console.log('result: ', result, result[0]);

                        for (let i = 0; i < result; i++) {

                            const recipient = await contract.getRecipientDetail(hospitalId, i);
                            // console.log("here", recipient, recipient[0], recipient[1]);
                            if (recipient[1] === "") {
                                continue;
                            }

                            const temp = recipient[1];
                            const data = JSON.stringify({
                                recipientId: recipient[0],
                                organ: recipient[1],
                                bloodgroup: recipient[2]
                            });
                            const element = JSON.parse(data);
                            recipient_arr.push(element);
                        }
                        if(recipient_arr.length===0)
                        {
                            this.setState({
                                empty: true
                            });
                        }
                        this.setState({ recipient_arr });
                        // console.log('final', recipient_arr);
                    }
                    else {
                        // User is not logged in
                        alert('Login to MetaMask is required to use this dApp');
                    }
                    // this.setState({ loading: false })
                }
                else {
                    // MetaMask is not installed
                    alert('Please install MetaMask to use this dApp');
                }
            }
            else {
                // MetaMask is not installed
                alert('Please install MetaMask to use this dApp');
            }
            this.setState({ loading: false });
        }
        catch(err) {
            console.error('Error:', err);
            this.setState({ loading: false });
            this.setState({ errMsg: 'Error. Please try again.' });
        }
    }

    renderList = () => {
        const List = this.state.recipient_arr.map((recipient) => {
            return (
                <div key={recipient.recipientId}>
                    <RenderList recipient={recipient} contract={this.props.contract} />
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
                            Click Below if want to see the transplant matches <br /><br/>
                            <Button positive type='submit' onClick={this.Oncheck}>Check</Button>
                        </Header>
                        :
                        
                            this.state.empty===true?
                            <h3 style={{textAlign: "center"}}>-- NO RECORDS --</h3>
                            :
                            <>
                                <Grid centered columns={2} style={{ marginTop: "10px" }}>
                                    <Grid.Column width={11}>
                                        {this.renderList()}
                                    </Grid.Column>
                                </Grid>
                            </>    
                }
            </div>
        )
    }
}

export default TransplantMatch;