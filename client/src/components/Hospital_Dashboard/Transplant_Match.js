import React, { Component } from 'react';
import { jwtDecode } from 'jwt-decode';
import RenderList from './Render_List';
import { Card, Segment, Header, Divider, Grid, Form, Button, Dimmer, Loader } from 'semantic-ui-react';
import Hospital_nav from './Hospital_nav';
import Noty from "noty";
import "noty/lib/noty.css"; // Default CSS
import "noty/lib/themes/sunset.css";

class TransplantMatch extends Component {
    state = {
        recipient_arr: [],
        loading: true,
        recipientCount: 0,
        empty: false
    }

    Oncheck = async (event) => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        const hospitalId = decodedToken.key;

        try {
            if (window.ethereum) {
                if (window.ethereum.isMetaMask) {
                    // MetaMask is installed
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

                    if (accounts.length > 0) {
                        // User is logged in
                        const { contract } = this.props;

                        const result = await contract.getRecipientCount(hospitalId);
                        var recipient_arr = [];

                        for (let i = 0; i < result; i++) {

                            const recipient = await contract.getRecipientDetail(hospitalId, i);
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
                        if (recipient_arr.length === 0) {
                            this.setState({
                                empty: true
                            });
                        }
                        this.setState({ recipient_arr });
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
                    this.setState({ loading: false })
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
                    this.setState({ loading: false });
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
            this.setState({ loading: false });
        }
        catch (err) {
            new Noty({
                theme: 'sunset',
                text: "Please Login to MetaMask",
                type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                layout: "topRight", // Position on the screen
                timeout: 2000,
            }).show();

            console.error('Error:', err);
            this.setState({ loading: false });
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
                            Click Below if want to see the transplant matches <br /><br />
                            <Button positive type='submit' onClick={this.Oncheck}>Check</Button>
                        </Header>
                        :

                        this.state.empty === true ?
                            <h3 style={{ textAlign: "center" }}>-- NO RECORDS --</h3>
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