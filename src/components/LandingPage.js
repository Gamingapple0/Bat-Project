import HomeBody from './HomeBody.js'
import Navbar from './Navbar';
import "./LandingPage.css"
import React from 'react';



function LandingPage(props){
    return (
        <div className="landing">
           <Navbar></Navbar>
           <HomeBody></HomeBody>
        </div>
    )
}

export default LandingPage;