import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login_signup from './components/Login/Donor_SignUp';
import Hospital_login from './components/Login/Hospital_login';
import Home from './components/Home';
import Donor_login from './components/Login/Donor_Info';
import ApproveDonor from './components/Hospital_Dashboard/Approve_donor';
import TransactionList from './components/Transplant_Insights/Transactions_Info';
import Main_page from './components/Hospital_Dashboard/Main';
import RegisterRecipient from './components/Hospital_Dashboard/Register_recipient';
import HospitalList from './components/Hospitals_List/Hospital_list';
import TransplantMatch from './components/Hospital_Dashboard/Transplant_Match';

import Noty from "noty";
import "noty/lib/noty.css"; // Default CSS
import "noty/lib/themes/sunset.css";

import abi from "./contract/OrganChain.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      const contractABI = abi.abi;
      console.log(contractABI);
      try {
        const { ethereum } = window;

        if (ethereum) {
          //to open metamask when user opens website
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });


          const provider = await new ethers.BrowserProvider(ethereum);
          
          //need signer because there will be changes in blockchain
          const signer = await provider.getSigner();
          const contract = await new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
          
          new Noty({
            theme: 'sunset',
            text: "MetaMask connected successfully",
            type: "success", // 'alert', 'success', 'error', 'warning', 'info'
            layout: "topRight", // Position on the screen
            timeout: 2000,
          }).show();
        } else {
          new Noty({
            theme: 'sunset',
            text: "Please install MetaMask",
            type: "error", // 'alert', 'success', 'error', 'warning', 'info'
            layout: "topRight", // Position on the screen
            timeout: 2000,
          }).show();
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home account={account}/>} />
        <Route path="/Donor_Register" element={<Login_signup />} />
        <Route path="/Hospital_login" element={<Hospital_login />} />
        <Route path="/Donor_login" element={<Donor_login contract={state.contract}/>} />
        <Route path="/Transactions" element={<TransactionList contract={state.contract}/>} />
      
        <Route
          path="/Main_page"
          element={
            window.localStorage.getItem('isAuthenticated') ? (
              <Main_page />
            ) : (
              <Navigate to="/Hospital_login" />
            )
          }
        />
        <Route
          path="/Approve_donor"
          element={
            window.localStorage.getItem('isAuthenticated') ? (
              <ApproveDonor contract={state.contract}/>
            ) : (
              <Navigate to="/Hospital_login" />
            )
          }
        />
        <Route
          path="/RegisterRecipient"
          element={
            window.localStorage.getItem('isAuthenticated') ? (
              <RegisterRecipient contract={state.contract}/>
            ) : (
              <Navigate to="/Hospital_login" />
            )
          }
        />
        <Route
          path="/Transplant_match"
          element={
            window.localStorage.getItem('isAuthenticated') ? (
              <TransplantMatch contract={state.contract}/>
            ) : (
              <Navigate to="/Hospital_login" />
            )
          }
        />
        <Route path="/Hospital_list" element={<HospitalList />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;