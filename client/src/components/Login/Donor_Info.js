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
            const hash = sha3.keccak256(this.state.aadhaarNumber);
            const addressBytes = hash.slice(-40);
            const address = '0x' + addressBytes.toString('hex');
            const checksumAddress = web3.utils.toChecksumAddress(address);

            const data1 = JSON.stringify({
                donor_addr: checksumAddress
            });
                        
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/donors/donor_info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data1,
            });                   

            if (!response.ok) {
                new Noty({
                    theme: 'sunset',
                    text: `Error in accessing server`,
                    type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                    layout: "topRight", // Position on the screen
                    timeout: 2000,
                }).show();
                return;
            }

            const data = await response.json();
            
            this.setState({
                organ: data.organ,
                bloodgroup: data.bloodgroup,
                matchfound: data.matchFound
            })
        }
        catch {
            new Noty({
                theme: 'sunset',
                text: "Donor not found",
                type: "error", // 'alert', 'success', 'error', 'warning', 'info'
                layout: "topRight", // Position on the screen
                timeout: 2000,
            }).show();

            this.setState({
                organ: '',
                bloodgroup: '',
                matchfound: ''
            })
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
                                        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                        <span class="text-primary">Check Donor Details</span>
                                    </h1>
                                    <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                                    "Organ donation is the ultimate act of kindness. It transformed my life when I needed it most, and I can never thank my donor and their family enough for their priceless gift."                                    
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
                    <div className="alert alert col-md donor_id mx-auto" role="alert">
                        <h4 className="alert-heading">Donor Information</h4>
                        <div className="card">
                            <div className="card-body mx-auto">
                                <h3 className="card-subtitle mb-2">Organ Donated: {this.state.organ}</h3>
                                <h3 className="card-subtitle mb-2">Blood Group: {this.state.bloodgroup}</h3>
                                <h3 className="card-subtitle mb-2">Match Found: {this.state.matchfound === true ? `Yes` : `No`}</h3>
                                <h3 className="card-subtitle mb-2">
                                    Recipient ID: {this.state.matchfound === true ? `${this.state.recipientId}` : ``}
                                </h3>
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
