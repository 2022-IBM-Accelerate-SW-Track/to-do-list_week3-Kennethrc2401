import React, { Component } from "react";
import "./About.css";
import kenneth_profile_pic from "../assets/kenneth_profile_pic.jpg";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={kenneth_profile_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Kenneth Ramirez Castro</div>
            <div className="brief_description">
            Overachieving computer science student with a strong belief in self-motivated learning. 
            Adept at quickly learning and applying new skills. Strong teamwork and training skills. 
            Fluent in Spanish and English. Proficient with Python, robotics, Front-End Web Development, 
            Microsoft Office, and photography. Seeking CS careers in Web Development and Robotics and am 
            open to explore other career paths.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
