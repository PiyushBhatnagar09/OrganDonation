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
                                src="https://www.uniquenewsonline.com/wp-content/uploads/2022/08/flat-world-organ-donation-day-illustration-with-hands-showing-heart_23-2149478062.webp"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="facts">
                        <h2>DONATE LIFE - An Initiative For Organ Donation</h2>
                        'Beyond Life, There Is Hope For A Better Tomorrow'
                        <br />
                        The cycle of life and death is a very beautiful, undeniable phenomenon
                        that is in the hands of a power that is beyond human. But saving lives
                        and giving the gift of breath is in our power and is completely human.
                        How do we do that? By donating our organs.
                        <br />
                        <br />
                        Organ donation is the need of the day and a hope for the brighter
                        ‘Organ Donation Is A Blessing That Stays Long After You Have Passed Away’
                        future of those who are not as blessed as most of us. There are those
                        who need an organ to survive and then there are those who have
                        transcended into a different world and whose organs could infuse life
                        in many who are still in this world. Our non-profit organisation,
                        Donate Life, serves as the bridge between the two.
                        <br />
                        <br />
                        <br />
                        As compared to the rest of the world, organ transplants began only in
                        the 1970s in India. Today, as we stand almost 5 decades away, we still
                        have a very long way to go. Donate Life is devoted to the world at
                        large, without any commercial motive, facilitating organ donations
                        between the donors and the recipients.
                        <br />
                        Nothing in the world can compare with the value of a life-it is
                        priceless. That is what makes it even more difficult to preserve a
                        life. At Donate Life, we believe in making the difficult, possible. All
                        our efforts are thus directed in the direction of increasing the number
                        of organ donors and decreasing the number of deaths resulting due to
                        non-availability of an organ for transplant-thereby saving a life.
                    </div>
                </div>
            </div>
            <br></br>
            <div className="initiate">
                <p>
                To be a part of this initiative
                </p>
            </div>
            <div className="list-button">
                <center>
                    <Link to="/Donor_Register" className="btn btn-primary button-71" >
                        Register as Donor
                    </Link>
                    {/* &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; */}

                    <Link to="/Needy_signup" className="btn btn-primary button-71">
                        Register as Needy
                    </Link>
                </center>
            </div>
        </div>


    );

}

export default About;





