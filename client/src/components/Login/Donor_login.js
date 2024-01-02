import { Component } from "react";
import Top2 from "../Navbar/Top2";
import "./styles.css";
import Web3 from "web3";
import contract from "../../ethereum/web3";
import "react-bootstrap";
import './card.css';
const sha3 = require('js-sha3');
const { toChecksumAddress } = require('ethereumjs-util');

class Donor_login extends Component {

    state = {
        public_key: '',
        errMsg: '',
        ipfsHash: '',
        organ: '',
        bloodgroup: '',
        matchfound: false,
        matchid: '',
    }


    onSubmit = async (event) => {

        event.preventDefault();

        const key = this.state.public_key;
        const hash = sha3.keccak256(key);

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

            try {
                contract.methods.getDonor(checksumAddress).call()
                    .then(result => {
                        const ipfsHash = result[0];
                        const organ = result[1];
                        const blood = result[2];
                        const matchFound = result[3];
                        const recipientId = result[4];
                        this.setState({ ipfsHash: ipfsHash });
                        this.setState({ organ: organ });
                        this.setState({ bloodgroup: blood });
                        this.setState({ matchfound: matchFound });
                        this.setState({ matchid: recipientId });
                    })
                    .catch(err => console.log(err));

            }
            catch {
                this.setState({ errMsg: "bad request" });
            }
        }

        else {
            alert('Please install MetaMask to use this dApp');
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
                                        “I never used to pay that much attention to organ donation, but I’m tremendously glad for it: it turned out that I was one of the ones in need. I hope my donor’s family will be blessed a thousand times for their sacrifice.” –Karl Black
                                    </p>

                                </div>

                                <div class="col-lg-6 mb-5 mb-lg-0">
                                    <div class="card">
                                        <div class="card-body py-5 px-md-5">
                                            <form onSubmit={this.onSubmit}>
                                                <div class="form-outline mb-4">
                                                    <input type="string" id="public_key" name="public_key" class="form-control" value={this.state.public_key} onChange={this.handleChange} required />
                                                    <label class="form-label" for="public_key">Public Key</label>
                                                </div>
                                                <button type="submit" class="btn btn-primary btn-block mb-4" onSubmit={this.onSubmit}>
                                                    Sign up
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
                    <div class="alert alert col-md donor_id" style={{ marginLeft: "40px", marginRight: "20px" }} role="alert">
                        <h4 class="alert-heading" style={{ textAlign: "center", fontSize: "3em", color: "#2c3e50" }}>Donor Information </h4>
                        <div class="card " style={{ maxWidth: "500px", marginLeft: "25vw" }}>
                            <div class="card-body">
                                <h3 class="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>Organ Needed: {this.state.organ}</h3>
                                <h3 class="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>Blood Group: {this.state.bloodgroup}</h3>
                                <h3 class="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>Match Found: {this.state.matchfound === true ? `Yes` : `No`}</h3>
                                <h3 class="card-subtitle mb-2 text-muted" style={{ color: "#34495e" }}>Recipient ID: {this.state.matchfound === true ? `Recipient id: ${this.state.recipientId}` : ``}</h3>
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

