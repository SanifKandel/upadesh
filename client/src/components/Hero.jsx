import React from "react";
import image from "../images/image4.png";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
        Empowering Mentorship, <br />
        for Success.
        </h1>
        <p>
        Unlock your potential with Upadesh - Find your perfect mentor and gain valuable guidance for personal and professional growth.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
