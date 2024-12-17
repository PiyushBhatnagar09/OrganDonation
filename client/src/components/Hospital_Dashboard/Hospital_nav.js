import React from "react";
import 'react-bootstrap';
import '@fortawesome/fontawesome-svg-core';
import './main.css';
import SideNav, { Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { NavLink } from "react-router-dom";

function Hospital_nav() {
    const logout = (event) => {

        window.localStorage.removeItem("isAuthenticated");
        window.localStorage.removeItem("token");
        window.location = "/";
    }

    return (
        <>
            <SideNav className="side-nav"
            >
                <SideNav.Toggle />
                <SideNav.Nav>
                    <NavItem eventKey="home">
                        <NavIcon>
                            <NavLink to='/Main_page'><i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} ></i></NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to='/Main_page'>Home</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="approve_donor">
                        <NavIcon>
                            <NavLink to='/Approve_donor'><i className="fa fa-fw fa-check" style={{ fontSize: '1.75em' }} /></NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to='/Approve_donor'>Approve_donor</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="register_recipient">
                        <NavIcon>
                            <NavLink to='/RegisterRecipient'><i className="fa fa-fw fa-heart" style={{ fontSize: '1.75em' }} /></NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to='/RegisterRecipient'>Register Recipient</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Transplant Match">
                        <NavIcon>
                            <NavLink to='/Transplant_match'><i className="fa fa-fw fa-key" style={{ fontSize: '1.75em' }} /></NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to='/Transplant_match'>Transplant Match</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Logout">
                        <NavIcon>
                            <i className="fa fa-fw fa-sign-out" style={{ fontSize: '1.75em' }} onClick={logout} />
                        </NavIcon>
                        <NavText>
                            <NavLink onClick={logout}>Logout </NavLink>
                        </NavText>
                    </NavItem>

                </SideNav.Nav>
            </SideNav>
        </>
    );
};


export default Hospital_nav;