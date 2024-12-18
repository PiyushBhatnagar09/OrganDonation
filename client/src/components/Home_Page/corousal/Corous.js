import React, { useState } from 'react';
import "./corous.css";

const Corous = (props) => {

    return (
        <>
        <p
            className="text-muted lead"
            style={{ borderRadius: "15px", padding: "5px", marginTop: "10px", marginLeft: "5px", backgroundColor: "lightgreen", textAlign: "center", fontWeight: "bold" }}
        >
            <small>
                <div className="scrollable-text1">Meta Mask Connected Account - {props.account}</div>
            </small>
        </p>
            <div className="con">
                <div className="container1" id="courous">
                    <div className="image">
                        <img src="https://media.istockphoto.com/vectors/heart-in-his-hands-symbol-of-love-and-charity-illustration-in-hand-vector-id1047076438?k=6&m=1047076438&s=170667a&w=0&h=5ssPnTvv8BzZpngboxzuoWv64XnhNDnFxO9RfrYHCfk=" alt="heart-image" />
                    </div>
                    <div className="text">
                        <div className='heading'>
                            <h1>
                                <span>"There </span>
                                <span> is </span>
                                <span>one </span>
                                <span>thing </span>
                                <span>I </span>
                                <span>know </span>
                                <span>about </span>
                                <span>my </span>
                                <span>donor </span>
                                <span>,</span>
                                <span>no matter </span>
                                <span>what </span>
                                <span>they </span>
                                <span>did </span>
                                <span>while </span>
                                <span>they were </span>
                                <span>on Earth </span>
                                <span>, they died </span> <span>a hero. </span><span>they saved </span>
                                <span>my life. </span>
                                <span>and that's </span>
                                <span>a debt </span><span>I can </span>
                                <span>never repay" </span>
                                <span>-John Wilson </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Corous;