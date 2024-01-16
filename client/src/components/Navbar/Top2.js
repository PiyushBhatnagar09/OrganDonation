import React from "react";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HashLink as Link } from 'react-router-hash-link';
import './top.css';

const Top2 = () => {
    const navbarClass = 'navBackground';
    return (
        <Navbar
            // position="sticky"
            // fixed="top"
            className={navbarClass}
            expand="md"
        >
            <Container className='trans'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto trans">
                        <Link to="/Donor_login" className=' trans nav-link nav-link-ltr' smooth>Donor Info</Link>
                        <Link to="/Donor_Register" className=' trans nav-link nav-link-ltr' smooth>Donor Register</Link>
                        <Link to="/Hospital_login" className='trans nav-link nav-link-ltr'>Partner with us (for Hospitals)</Link>
                    </Nav>
                    <Nav className='trans'>
                        <Link to="/" className='buttn nav-link' href="#pricing"> Go Back</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Top2;
