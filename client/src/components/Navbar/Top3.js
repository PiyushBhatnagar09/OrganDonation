import React from "react"; 
import { HashLink as Link } from 'react-router-hash-link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './top.css';

const Top3 = ({ onTabClick, activeTab }) => {
  const navbarClass = 'navBackground';

  // Helper function to apply active class
  const getTabClass = (tab) => {
    return activeTab === tab ? 'trans nav-link nav-link-ltr active-link' : 'trans nav-link nav-link-ltr';
  };

  return (
    <Navbar className={navbarClass} expand="md">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto trans">
            <span
              onClick={() => onTabClick("Active_Donors")}
              className={getTabClass("Active_Donors")}
            >
              Active Donors
            </span>
            <span
              onClick={() => onTabClick("Active_Recipients")}
              className={getTabClass("Active_Recipients")}
            >
              Active Recipients
            </span>
            <span
              onClick={() => onTabClick("Transplant_Matches")}
              className={getTabClass("Transplant_Matches")}
            >
              Transplant Matches
            </span>
          </Nav>
          <Nav className='login-nav'>
            <Link to="/" className='buttn nav-link' href="#pricing"> Go Back</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Top3;
