import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HashLink as Link } from 'react-router-hash-link';
import './top.css'; // Import the external CSS file

const Top = () => {
    const [fix, setfix] = useState(false);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY >= 100) {
                setfix(true);
            } else {
                setfix(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navbarClass = fix ? 'fixed-navbar navBackground' : 'navBackground';

    return (
        <Navbar
            bg=""  // Set the background color to "primary" or another desired color
            className={navbarClass}
            expand="md"
        >
            <Container>
                <Navbar.Brand>
                    <Link to="#courous" className='trans nav-link nav-link-ltr head' smooth>Organ Donation</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="#about" className='trans nav-link nav-link-ltr' smooth>About Us</Link>
                        <Link to="#success" className='trans nav-link nav-link-ltr' smooth>Success Stories</Link>
                        <Link to="#footer-contact" className='trans nav-link nav-link-ltr'>Partner with us</Link>
                        <Link to="#donate-money" className='trans nav-link nav-link-ltr'>DONATE MONEY</Link>
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Top;
