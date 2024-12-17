import { Component } from "react";
import Top2 from "../Navbar/Top2";
import "./styles.css";
import "react-bootstrap";
import './card.css';
import web3 from "web3";
import Noty from "noty";
import "noty/lib/noty.css"; // Default CSS
import "noty/lib/themes/sunset.css";

const sha3 = require('js-sha3');
const { toChecksumAddress } = require('ethereumjs-util');

class Donor_login extends Component {

    state = {
        aadhaarNumber: '123456789101',
        organ: '',
        bloodgroup: '',
        matchfound: false,
        matchid: '',
    }

    onSubmit = async (event) => {

        event.preventDefault();
        if(this.state.aadhaarNumber.length != 12)
        {
            new Noty({
                theme: 'sunset',
                text: "Enter valid Aadhar Number",
                type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                layout: "topRight", // Position on the screen
                timeout: 2000,
            }).show();
            return;
        }

        try {
            if (window.ethereum) {
                if (window.ethereum.isMetaMask) 
                {
                    // MetaMask is installed
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

                    if (accounts.length > 0) 
                    {
                        try {
                            const hash = sha3.keccak256(this.state.aadhaarNumber);
                            const addressBytes = hash.slice(-40);
                            const address = '0x' + addressBytes.toString('hex');
                            const checksumAddress = web3.utils.toChecksumAddress(address);
                            
                            const {contract} = this.props;
            
                            //interacting with contract
                            const transaction = await contract.getDonor(checksumAddress)
                            .then(result => {
                                const organ = result[0];
                                const blood = result[1];
                                const matchFound = result[2];
                                const recipientId = result[3];
                                this.setState({ organ: organ });
                                this.setState({ bloodgroup: blood });
                                this.setState({ matchfound: matchFound });
                                this.setState({ recipientId: recipientId });
                            })
                            .catch((err) => {
                                new Noty({
                                    theme: 'sunset',
                                    text: "Donor doesn't exist",
                                    type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                                    layout: "topRight", // Position on the screen
                                    timeout: 2000,
                                }).show();
                                console.error('Error: ', err);
                            });
                        }
                        catch {
                            new Noty({
                                theme: 'sunset',
                                text: "Bad Request",
                                type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                                layout: "topRight", // Position on the screen
                                timeout: 2000,
                            }).show();
                        }
                    } else {
                        // User is not logged in
                        new Noty({
                            theme: 'sunset',
                            text: "Please Login to MetaMask",
                            type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                            layout: "topRight", // Position on the screen
                            timeout: 2000,
                        }).show();
                    }
                    
                } else {
                    // MetaMask is not installed
                    new Noty({
                        theme: 'sunset',
                        text: "Please Login to MetaMask",
                        type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                        layout: "topRight", // Position on the screen
                        timeout: 2000,
                    }).show();
                }
            } else {
                // MetaMask is not installed
                new Noty({
                    theme: 'sunset',
                    text: "Please Login to MetaMask",
                    type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                    layout: "topRight", // Position on the screen
                    timeout: 2000,
                }).show();
            }
        } catch (error) {
            new Noty({
                theme: 'sunset',
                text: error,
                type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                layout: "topRight", // Position on the screen
                timeout: 2000,
            }).show();
            console.error('Error:', error);
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {

        return (
            <>
                <Top2 />
                <section class="hospital_login">
                    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
                        <div class="container">
                            <div class="row gx-lg-5 align-items-center">
                                <div class="col-lg-6 mb-5 mb-lg-0">
                                    <h1 class="my-5 display-3 fw-bold ls-tight">
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span class="text-primary">Check Donor Info and Status</span>
                                    </h1>
                                    <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                                    "I used to overlook the importance of organ donation, but now I am incredibly grateful for it. As it happens, I found myself in need, and I sincerely hope that my donor's family receives blessings a thousandfold for their selfless sacrifice." –Karl Black
                                    </p>

                                </div>

                                <div class="col-lg-6 mb-5 mb-lg-0">
                                    <div class="card">
                                        <div class="card-body py-5 px-md-5">
                                            <form onSubmit={this.onSubmit}>
                                                <div class="form-outline mb-4">
                                                <label class="form-label" for="aadhaarNumber">Aadhaar Number</label>
                                                    <input type="string" id="aadhaarNumber" name="aadhaarNumber" class="form-control" value={this.state.aadhaarNumber} onChange={this.handleChange} required />
                                                </div>
                                                <button type="submit" class="btn btn-primary btn-block mb-4" onSubmit={this.onSubmit}>
                                                    Check
                                                </button>
                                                {this.state.errMsg &&
                                                    <h3 className="error"> {this.state.errMsg} </h3>}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {this.state.organ && this.state.organ.length >= 1 ?
                    <div class="alert alert col-md donor_id mx-auto" style={{ marginLeft: "40px", marginRight: "40px" }} role="alert">
                        <h4 class="alert-heading" style={{ textAlign: "center", fontSize: "3em", color: "#2c3e50" }}>Donor Information </h4>
                        <div class="card " style={{ maxWidth: "500px", margin: "auto" }}>
                            <div class="card-body mx-auto">
                                <h3 class="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>Organ Donated: {this.state.organ}</h3>
                                <h3 class="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>Blood Group: {this.state.bloodgroup}</h3>
                                <h3 class="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>Match Found: {this.state.matchfound === true ? `Yes` : `No`}</h3>
                                <h3 class="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>Recipient ID: {this.state.matchfound === true ? `${this.state.recipientId}` : ``}</h3>
                            </div>
                        </div>
                    </div>
                    : <div />
                }
            </>
        );
    }
}
export default Donor_login;

