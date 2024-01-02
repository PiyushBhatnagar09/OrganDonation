import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HashLink as Link } from 'react-router-hash-link';
import './top.css'; // Import the external CSS file

const Top = () => {

    const [fix, setfix] = useState(false);

    function setfixed() {
        if (window.scrollY >= 100) {
            setfix(true);
        } else {
            setfix(false);
        }
    }

    window.addEventListener("scroll", setfixed);

    return (
        <Navbar 
            bg=""  // Set the background color to "primary" or another desired color
        >
            <Container>
                <Nav className="me-auto">
                    <Navbar.Brand>
                        <Link to="#courous" className='trans nav-link nav-link-ltr head' smooth>OrganD</Link>
                        <Link to="#about" className='trans nav-link nav-link-ltr' smooth>About Us</Link>
                        <Link to="#success" className='trans nav-link nav-link-ltr' smooth>Success Stories</Link>
                        <Link to="#Partner" className='trans nav-link nav-link-ltr'>Partner with us</Link>
                    </Navbar.Brand>
                </Nav>
                <Nav className="login-nav">
                    <Link
                        to="/Donor_login"
                        className='buttn nav-link'
                        style={{ borderRadius: "32%" }}
                    >
                        Login/Signup
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Top;