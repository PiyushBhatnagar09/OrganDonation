import React, { Component } from 'react';
import { Card, Button, Divider, Header, Portal, Segment } from 'semantic-ui-react';
import {ethers} from 'ethers';
import Noty from "noty";
import "noty/lib/noty.css"; // Default CSS
import "noty/lib/themes/sunset.css";

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
                        const amount = { value: ethers.parseEther("0") };
                                    
                        const { contract } = this.props;

                        const transaction = await contract.transplantMatch(this.props.recipient.recipientId, amount);
                        await transaction.wait();

                        var result = await contract.isMatchFound(this.props.recipient.recipientId);
                        if (result === "false") {
                            new Noty({
                                theme: 'sunset',
                                text: "Match not found",
                                type: "alert", // 'alert', 'success', 'error', 'warning', 'info'
                                layout: "topRight", // Position on the screen
                                timeout: 2000,
                            }).show();
                        }
                        else {
                            var donorId;
                            var donorId = await contract.getMatchedDonor(this.props.recipient.recipientId);

                            const donor = await contract.getDonor(donorId);
                            this.setState({ donorId: donorId, organ: donor[0], bloodgroup: donor[1] });

                            const res = (donor[0]);
                            this.setState({
                                donorFound: true
                            })

                            //updating data in MongoDB
                            const data = JSON.stringify({ 
                                recipient_addr: this.props.recipient.recipientId,
                                donor_addr: donorId
                            });
                            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/transplants`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: data,
                            });

                            new Noty({
                                theme: 'sunset',
                                text: "Match found",
                                type: "success", // 'alert', 'success', 'error', 'warning', 'info'
                                layout: "topRight", // Position on the screen
                                timeout: 2000,
                            }).show();
                        }
                    }
                    else {
                        // User is not logged in
                        new Noty({
                            theme: 'sunset',
                            text: "Please Login to MetaMask",
                            type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                            layout: "topRight", // Position on the screen
                            timeout: 2000,
                        }).show();
                    }
                    this.setState({ loading: false });
                }
                else {
                    // MetaMask is not installed
                    new Noty({
                        theme: 'sunset',
                        text: "Please Login to MetaMask",
                        type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                        layout: "topRight", // Position on the screen
                        timeout: 2000,
                    }).show();
                }
            }
            else {
                // MetaMask is not installed
                new Noty({
                    theme: 'sunset',
                    text: "Please Login to MetaMask",
                    type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                    layout: "topRight", // Position on the screen
                    timeout: 2000,
                }).show();
            }
        }
        catch (error) {
            new Noty({
                theme: 'sunset',
                text: error,
                type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                layout: "topRight", // Position on the screen
                timeout: 2000,
            }).show();
            console.error('Error:', error);
            this.setState({ open: true })
            this.setState({ loading: false });
        }
    }

    handleClose = () => this.setState({ open: false })

    render() {
        return (
            <>
                <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                    Recipient<br />
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