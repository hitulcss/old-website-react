import React from "react";
import "./ExamPrepration.css";
import preprationImg from "../../../assets/prepration.png";

const ExamPrepration = () => {
  return (
    <>
      <div className="prepration_wrapper" data-aos="fade-right">
        <div className="prepration_img">
          <img src={preprationImg} alt="prep" loading="lazy" />
        </div>
        <div className="prepration_details">
          <h1>Start Your Exam Preparation Now!</h1>
          <p>Practice, Analyze and Improve.</p>
          <button
            onClick={() => window.open(`https://exams.sdcampus.com/`, "_blank")}
          >
            Get Started for Free
          </button>
        </div>
      </div>
    </>
  );
};

export default ExamPrepration;
