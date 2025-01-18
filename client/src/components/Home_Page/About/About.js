import React from 'react';
import "../About/About.css"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Link } from 'react-router-dom';

const About = () => {

    return (
        <div id="about">
            <h1 className="second">
                <span><b>About Us</b></span>
            </h1>
            <div className="content">
                <div className="rightchild">
                    <div className="images">
                        <div className="image_circle">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/008/652/596/non_2x/world-organ-donation-day-with-kidneys-heart-lungs-eyes-or-liver-for-transplantation-saving-lives-and-health-care-in-flat-cartoon-illustration-vector.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="facts">
                        <h2>Donate Life - Empowering Tomorrow Through Organ Donation</h2>
                        <p>'Beyond Life, There Is Hope For A Better Tomorrow.'</p>
                        <p>The journey of life and death is a beautiful, inevitable cycle controlled by forces beyond human comprehension. However, the power to save lives and bestow the gift of breath lies within us as humans. How can we exercise this power? By choosing to donate our organs.</p>
                        <p>Organ donation is a crucial necessity and a beacon of hope for a brighter future for those less fortunate. Some are in need of organs to survive, while others have transitioned to another realm, and their organs can breathe life into those still in this world. Our non-profit organization, Donate Life, acts as the bridge connecting these two worlds.</p>
                        <p>'Organ Donation Is A Blessing That Stays Long After You Have Passed Away.'</p>
                        <p>Unlike many parts of the world, organ transplants in India commenced in the 1970s. Despite nearly five decades of progress, there is still much ground to cover. Donate Life is dedicated to the global community, driven by a non-commercial mission to facilitate organ donations between donors and recipients.</p>
                        <p>Nothing in the world can rival the value of a human life - it is truly priceless. This makes preserving a life even more challenging. At Donate Life, we believe in turning the difficult into the possible. All our efforts are focused on increasing the number of organ donors and reducing the number of deaths caused by the unavailability of organs for transplantation - ultimately saving lives.</p>
                    </div>

                </div>
            </div>
            <br></br>
            <div className="initiate">
                <p>
                    Become a part of this Initiative
                </p>
            </div>
            <div className="list-button">
                <>
                    <Link to="/Donor_Register" className="btn btn-primary button-71" >
                        Register as Donor
                    </Link>

                    {/* <Link to="/Needy_signup" className="btn btn-primary button-71">
                        Register as Needy
                    </Link> */}
                </>
            </div>
        </div>


    );

}

export default About;





