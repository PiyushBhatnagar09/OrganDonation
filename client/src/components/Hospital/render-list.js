import React, { Component } from 'react';
import { Card, Button, Divider, Header, Portal, Segment } from 'semantic-ui-react';
import {ethers} from 'ethers';


class RenderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donorId: '',
            bloodgroup: '',
            organ: '',
            donorFound: false,
            loading: false,
            open: false
        }
    }

    onMatch = async () => {
        this.setState({ loading: true, open: false });

        try {
            if (window.ethereum) {
                if (window.ethereum.isMetaMask) 
                {
                    // MetaMask is installed
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

                    if (accounts.length > 0) 
                    {
                        const amount = { value: ethers.parseEther("0.0000001") };
                                    
                        const { contract } = this.props;

                        const transaction = await contract.transplantMatch(this.props.recipient.recipientId, amount);
                        await transaction.wait();

                        var result = await contract.isMatchFound(this.props.recipient.recipientId);
                        // console.log("torr", result);
                        if (result === "false") {
                            throw Object.assign(
                                new Error("Match Not Found!")
                            );
                        }
                        else {
                            var donorId;
                            var donorId = await contract.getMatchedDonor(this.props.recipient.recipientId);
                            // console.log(donorId);

                            const donor = await contract.getDonor(donorId);
                            // console.log(donor);
                            this.setState({ donorId: donorId, organ: donor[0], bloodgroup: donor[1] });

                            const res = (donor[0]);
                            this.setState({
                                donorFound: true
                            })
                        }
                        console.log("Transaction is done");
                    }
                    else {
                        // User is not logged in
                        alert('Login to MetaMask is required to use this dApp');
                    }
                    this.setState({ loading: false });
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
        }
        catch (error) {
            console.error('Error:', error);
            this.setState({ open: true })
            this.setState({ loading: false });
            this.setState({ errMsg: 'Error. Please try again.' });
        }
    }

    handleClose = () => this.setState({ open: false })

    render() {
        return (
            <>
                <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                    Receipient<br />
                </Header>
                <Card.Group style={{ display: "flex", flexDirection: "row" }}>

                    {!this.state.donorFound ? null :
                        <Card style={{ width: "370px" }}>
                            <Card.Content>
                                <Card.Description style={{ fontSize: "14px", textAlign: "center" }}>
                                <strong>Donor ID :</strong> {this.state.donorId} <br /><br />
                                    <strong>Organ : </strong> {this.state.organ} <br /><br />
                                    <strong>Blood Group : </strong> {this.state.bloodgroup} <br /><br />
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra style={{ textAlign: "center" }}>
                                <Header as="h3" color="grey" >
                                    Donor
                                </Header>
                            </Card.Content>
                        </Card>
                    }
                    <Card style={{ width: "370px" }} >
                        <Card.Content>
                            <Card.Description style={{ fontSize: "14px", textAlign: "center" }}>
                                <strong>Recipient ID :</strong> {this.props.recipient.recipientId} <br /><br />
                                <strong>Organ :</strong> {this.props.recipient.organ} <br /><br />
                                <strong>Blood Group : </strong> {this.props.recipient.bloodgroup} <br /><br />
                            </Card.Description>
                        </Card.Content>
                        <Portal onClose={this.handleClose} open={this.state.open}>
                            <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000, }}>
                                <Header>Sorry, No Match Found!</Header>
                                <Button content='OK' negative onClick={this.handleClose} />
                            </Segment>
                        </Portal>
                        <Card.Content extra style={{ textAlign: "center" }}>
                            {this.state.donorFound ?
                                <Header as="h3" color="grey" >
                                    Recipient
                                </Header>
                                : <Button loading={this.state.loading} content="Match" positive onClick={this.onMatch} />
                            }
                        </Card.Content>
                    </Card>
                </Card.Group>
            </>
        )
    }
}

export default RenderList;