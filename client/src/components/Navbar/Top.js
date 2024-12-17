import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
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
    const [activeLink, setActiveLink] = useState("");

    const handleSetActive = (link) => {
        setActiveLink(link);
    };

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
                        <Link to="#about" className={`trans nav-link nav-link-ltr ${activeLink === "about" ? "active-link" : ""
                            }`}
                            onClick={() => handleSetActive("about")}>About Us</Link>
                        <Link to="#success" className={`trans nav-link nav-link-ltr ${activeLink === "success" ? "active-link" : ""
                            }`}
                            onClick={() => handleSetActive("success")}>Success Stories</Link>
                        <Link to="#donate-money" className={`trans nav-link nav-link-ltr ${activeLink === "donate-money" ? "active-link" : ""
                            }`}
                            onClick={() => handleSetActive("donate-money")}>DONATE MONEY</Link>
                        <Link to="#footer-contact" className={`trans nav-link nav-link-ltr ${activeLink === "footer-contact" ? "active-link" : ""
                            }`}
                            onClick={() => handleSetActive("footer-contact")}>Partner with us</Link>
                    </Nav>
                    <Nav className="me-auto custom-nav">
                        <Link to="/Transactions" className={`custom-nav-link ${activeLink === "transactions" ? "active-link" : ""
                            }`}
                            onClick={() => handleSetActive("transactions")}>TRANSPLANT INSIGHTS</Link>
                    </Nav>
                    <Nav className="login-nav">
                        <Link
                            to="/Donor_login"
                            className='buttn nav-link'
                            // style={{ borderRadius: "32%" }}
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
