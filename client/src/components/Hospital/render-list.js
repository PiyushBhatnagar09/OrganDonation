import React, { Component } from 'react';
import { Card, Button, Divider, Header, Portal, Segment } from 'semantic-ui-react';
import contract from '../../ethereum/web3';
import Web3 from 'web3';


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

        if (typeof window.ethereum !== 'undefined') {
            // Request the user's permission to connect to MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Use MetaMask as the web3 provider
            const web3 = new Web3(window.ethereum);

            // Get the user's account
            const accounts = await web3.eth.getAccounts();

            const account = accounts[0];

            try {
                await contract.methods.transplantMatch(this.props.recipient.recipientId).send({
                    from: accounts[0],
                    gas: 1000000
                });

                var result = await contract.methods.isMatchFound(this.props.recipient.recipientId).call();
                if (result === "false") {
                    throw Object.assign(
                        new Error("Match Not Found!")
                    );
                }
                else {
                    var donorId;
                    var donorId = await contract.methods.getMatchedDonor(this.props.recipient.recipientId).call()


                    const donor = await contract.methods.getDonor(donorId).call()
                    console.log(donor[0]);
                    this.setState({ donorId: donorId, organ: donor[1], bloodgroup: donor[2] });

                    const res = (donor[0]);
                    this.setState({

                        donorFound: true
                    })
                }
            }
            catch (err) {
                this.setState({ open: true })
            }
            this.setState({ loading: false });
        }
        else {
            alert("Check metamask login");
        }
    }

    handleClose = () => this.setState({ open: false })

    render() {
        return (
            <>
                <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                    Receipients Associated with the Hospital<br />
                </Header>
                <Card.Group style={{ display: "flex", flexDirection: "row" }}>

                    {!this.state.donorFound ? null :
                        <Card style={{ width: "370px" }}>
                            <Card.Content>
                                <Card.Description style={{ fontSize: "14px", textAlign: "center" }}>
                                    <Card.Meta>{this.state.donorId}</Card.Meta>
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
                                <Card.Meta >{this.props.recipient.recipientId}</Card.Meta>
                                <strong>Organ : </strong> {this.props.recipient.organ} <br /><br />
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