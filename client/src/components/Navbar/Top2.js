import React from "react";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { HashLink as Link } from 'react-router-hash-link';
import './top.css';

const Top2 = () => {
    const navbarClass = 'navBackground';
    return (
        <Navbar
            className={navbarClass}
            expand="md"
        >
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto trans">
                        <NavLink to="/Donor_login" className={({ isActive }) =>
                            isActive ? 'trans nav-link nav-link-ltr active-link' : 'trans nav-link nav-link-ltr'}
                        >Donor Info</NavLink>
                        <NavLink to="/Donor_Register" className={({ isActive }) =>
                            isActive ? "trans nav-link nav-link-ltr active-link" : "trans nav-link nav-link-ltr"}
                        >Donor Register</NavLink>
                        <NavLink to="/Hospital_login" className={({ isActive }) =>
                            isActive ? "trans nav-link nav-link-ltr active-link" : "trans nav-link nav-link-ltr"}
                        >Hospital Login</NavLink>
                    </Nav>
                    <Nav className='login-nav'>
                        <Link to="/" className='buttn nav-link' href="#pricing"> Go Back</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Top2;
