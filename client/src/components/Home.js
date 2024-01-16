import React from "react";

import Top from "./Navbar/Top";
import Corous from "./corousal/Corous";
import About from "./About/About";
import Success from "./Success_Story/Success";
import Partner from "./Partner_with_us/Partner";



const Home = (props) => {

    return (
        <>
            <Top />
            <Corous account={props.account}/>
            <About />
            <Success />
            <Partner />
        </>
    );
};

export default Home;