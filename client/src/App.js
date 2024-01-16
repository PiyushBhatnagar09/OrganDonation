import React from 'react';

//used for creating routes
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login_signup from './components/Login/Login_sigup';
import Landing_page from './components/Login/Landing_page';
import Hospital_login from './components/Login/Hospital_login';
import Home from './components/Home';
import Donor_login from './components/Login/Donor_login';
import ApproveDonor from './components/Hospital/Approve_donor';
// import Hospital_nav from './components/Hospital/Hospital_nav';
import Main_page from './components/Hospital/Main';
// import PatientRecord from './components/Hospital/Patient_list';
import RegisterRecipient from './components/Hospital/Register_recipient';
import HospitalList from './components/donor_dashboard/Hospital_list';
import TransplantMatch from './components/Hospital/transplant-match';

import abi from "./contract/OrganChain.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
// import { contract } from 'web3/lib/commonjs/eth.exports';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xBAA67c996824a8BF91E0c98D3BAECfF2D1120E5E";
      const contractABI = abi.abi;
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
          console.log(signer, provider, contract);
          setAccount(account);
          setState({ provider, signer, contract });
          console.log("hyey",state);
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  console.log(state);
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home account={account}/>} />
        <Route path="/login" element={<Landing_page />} />
        <Route path="/Donor_Register" element={<Login_signup />} />
        <Route path="/Hospital_login" element={<Hospital_login />} />
        <Route path="/Donor_login" element={<Donor_login contract={state.contract}/>} />
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
        {/* <Route
          path="/Patient_list"
          element={
            window.localStorage.getItem('isAuthenticated') ? (
              <PatientRecord />
            ) : (
              <Navigate to="/Hospital_login" />
            )
          }
        /> */}
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