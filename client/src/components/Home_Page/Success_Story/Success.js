import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import "./Success.css"
import Lifestory from "./Data.js";
import Cards from "./Cards.js";

export default function Success() {
    const [copydata, setCopyData] = useState([]);
    useEffect(() => {

        setTimeout(() => {
            setCopyData(Lifestory);
        }, 3000);

    }, [])

    return (
        <div id="success">
            <div class="nine">
                <h1>&nbsp;&nbsp;&nbsp;LIFE STORY</h1>
            </div>
            <section className='iteam_section mt-4 container'>
                <div className="row mt-2 d-flex justify-content-around align-items-center">
                    <Cards data={copydata} />
                </div>
            </section>
        </div>
    );
}