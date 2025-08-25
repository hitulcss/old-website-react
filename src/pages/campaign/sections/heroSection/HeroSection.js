import React from "react";
import "./HeroSection.css";
import heroImg from "../../../../assets/campaign/herosection.png";

const HeroSection = () => {
  return (
    <>
      <div className="hero_section_two">
        <div className="hero_section_left">
          <h1>Are You Preparing For</h1>
          <p style={{ color: "rgba(72, 101, 129, 1)", fontSize: "1.2rem" }}>
            Sainik | JNV | RMS | RIMC
          </p>
          <p className="border_text">
            Entrance exam for class 6th & 9th Admission
          </p>

          <button
            style={{ borderRadius: "50px" }}
            onClick={() => {
              window.location.href =
                "https://www.sdcampus.com/school-entrance-exams";
            }}
          >
            Apply Now
          </button>
        </div>
        <div className="hero_section_right">
          <img src={heroImg} alt="heroimg" />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
