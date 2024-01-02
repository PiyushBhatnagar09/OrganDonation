import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HashLink as Link } from 'react-router-hash-link';

const Top2 = () => {

    return (
        <Navbar position="sticky" fixed="top" className='navbar fixed'>
            <Container className='trans'>
                <Nav className="me-auto trans">
                    <Link to="/Donor_login" className=' trans nav-link nav-link-ltr' smooth>Donor Info</Link>
                    <Link to="/Donor_Register" className=' trans nav-link nav-link-ltr' smooth>Donor Register</Link>
                    <Link to="/Hospital_login" className='trans nav-link nav-link-ltr'>Partner with us (for Hospitals)</Link>

                </Nav>
                <Nav className='trans'>
                    <Link to="/" className='buttn nav-link' href="#pricing"> Go Back</Link>
                </Nav>
            </Container>
        </Navbar>


    );
}

export default Top2;