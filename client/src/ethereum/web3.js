import Web3 from "web3";
import configurations from "./build/contracts/OrganChain.json";

const contractAddress = configurations.networks["5777"].address;
const contractABI = configurations.abi;
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
const contract = new web3.eth.Contract(contractABI, contractAddress);

export default contract;

// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


// const contractAddress = '0x32B4f1FE3c24dC1c58fF0363C7052ADAcD2454c6';
// const contractAbi = [
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_donor_addr",
//                 "type": "address"
//             },
//             {
//                 "name": "_ipfsHash",
//                 "type": "string"
//             },
//             {
//                 "name": "_EMRHash",
//                 "type": "string"
//             },
//             {
//                 "name": "_organ",
//                 "type": "string"
//             },
//             {
//                 "name": "_bloodgroup",
//                 "type": "string"
//             }
//         ],
//         "name": "addDonor",
//         "outputs": [],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function",
//         "signature": "0x48803dbf"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_donor_addr",
//                 "type": "address"
//             }
//         ],
//         "name": "getDonor",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "string"
//             },
//             {
//                 "name": "",
//                 "type": "string"
//             },
//             {
//                 "name": "",
//                 "type": "string"
//             },
//             {
//                 "name": "",
//                 "type": "bool"
//             },
//             {
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function",
//         "signature": "0x96c59043"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_recipient_addr",
//                 "type": "address"
//             },
//             {
//                 "name": "_hospital_addr",
//                 "type": "address"
//             },
//             {
//                 "name": "_ipfsHash",
//                 "type": "string"
//             },
//             {
//                 "name": "_EMRHash",
//                 "type": "string"
//             },
//             {
//                 "name": "_organ",
//                 "type": "string"
//             },
//             {
//                 "name": "_bloodgroup",
//                 "type": "string"
//             }
//         ],
//         "name": "addRecipient",
//         "outputs": [],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function",
//         "signature": "0xe96f2bea"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_recipient_addr",
//                 "type": "address"
//             }
//         ],
//         "name": "getRecipient",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "address"
//             },
//             {
//                 "name": "",
//                 "type": "string"
//             },
//             {
//                 "name": "",
//                 "type": "string"
//             },
//             {
//                 "name": "",
//                 "type": "string"
//             },
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function",
//         "signature": "0x62812a39"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_hospital_addr",
//                 "type": "address"
//             }
//         ],
//         "name": "getRecipientCount",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function",
//         "signature": "0xb02d6cf6"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_hospital_addr",
//                 "type": "address"
//             },
//             {
//                 "name": "i",
//                 "type": "uint256"
//             }
//         ],
//         "name": "getRecipientDetail",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "address"
//             },
//             {
//                 "name": "",
//                 "type": "string"
//             },
//             {
//                 "name": "",
//                 "type": "string"
//             },
//             {
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function",
//         "signature": "0x681bc108"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_recipient_addr",
//                 "type": "address"
//             }
//         ],
//         "name": "isMatchFound",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function",
//         "signature": "0xc39aeabc"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_recipient_addr",
//                 "type": "address"
//             }
//         ],
//         "name": "getMatchedDonor",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function",
//         "signature": "0x784c413d"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_address",
//                 "type": "address"
//             }
//         ],
//         "name": "getEMR",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function",
//         "signature": "0x1164de0e"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_recipient_addr",
//                 "type": "address"
//             }
//         ],
//         "name": "transplantMatch",
//         "outputs": [],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function",
//         "signature": "0xf3f7bb52"
//     }
// ];

// const myContract = new web3.eth.Contract(contractAbi, contractAddress);


// export default myContract;
