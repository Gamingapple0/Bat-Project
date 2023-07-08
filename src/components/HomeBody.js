import bg from "../images/batman-homepage.jpg";
import "./HomeBody.css";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

function HomeBody(props) {
  useEffect(() => {
    const frame = document.querySelector(".border-load");
    setTimeout(function () {
      frame.classList.add("animate-border-load");
    }, 100);

    const lines = document.querySelectorAll(".line");
    setTimeout(function () {
      lines.forEach((line) => {
        line.classList.add("line-extend");
      });
    }, 200);


  }, []);

  return (
    <div className="home-body">
      <div className="frame border-load">
        <div className="horizontal-line">
          <div className="line"></div>
          <div className="line-text">Find Strength in Darkness</div>
          <div className="line"></div>
        </div>
        <h1 className="slogan">Embrace the Dark Knight</h1>
        <h1 className="slogan">Within You</h1>
        <h1 className="slogan">Rise Above the Ordinary</h1>
        <NavLink to="/signup">
        <button className="start">
          <span>START NOW</span>
        </button>
        </NavLink>
      </div>
    </div>
  );
}

export default HomeBody;
