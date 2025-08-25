import React from "react";
import "./ExploreProgram.css";
import { MdDone } from "react-icons/md";

const ExploreProgram = () => {
  const program1 = [
    "Free Demo Class ",
    "Live and Recorded Lectures",
    "Weekly PTM ",
    "India’s Best Faculties",
    "Weekly Doubt Session",
    "Prepare for Class 5 Exams also",
    "Complete coverage of English, Hindi, Maths, GK/GS and Reasoning",
    "Join our class from anywhere in India and start learning easily",
    "PDF Notes & Regular Test",
  ];

  const program2 = [
    "Free Demo Class ",
    "Live and Recorded Lectures",
    "Weekly PTM ",
    "India’s Best Faculties",
    "Weekly Doubt Session",
    "Prepare for Class 5 Exams also",
    "Complete coverage of English, Hindi, Maths, GK/GS and Reasoning",
    "Join our class from anywhere in India and start learning easily",
    "PDF Notes & Regular Test",
  ];
  return (
    <>
      <div className="explore_program">
        <h1>
          Explore By{" "}
          <span style={{ color: "rgba(228, 110, 48, 1)" }}>Program’s</span>
        </h1>
        <div className="explore_program_container">
          <div className="explore_program_left">
            <div className="explore_left_box">
              <div className="explore_heading">
                <h1>1 Program</h1>
                <h2>⎯ 2025 ⎯</h2>
              </div>
              <div className="explore_features_container">
                {program1.map((item, index) => (
                  <div className="explore_features" key={index}>
                    <MdDone />
                    <p>{item}</p>
                  </div>
                ))}

                <button
                  className="explore_1st_btn"
                  onClick={() => {
                    window.location.href =
                      "https://www.sdcampus.com/school-entrance-exams/sainik-school-entrance-exam-2025-for-admission-in-class-6th654de8d80139029158f3bb8c";
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className="explore_program_right">
            <div className="explore_right_box">
              <div className="explore_heading">
                <h1>2 Program</h1>
                <h2>⎯ 2025 ⎯</h2>
              </div>
              <div className="explore_features_container">
                {program2.map((item, index) => (
                  <div className="explore_features" key={index}>
                    <MdDone />
                    <p>{item}</p>
                  </div>
                ))}

                <button
                  className="explore_2nd_btn"
                  onClick={() => {
                    window.location.href =
                      "https://www.sdcampus.com/school-entrance-exams/ujjawal-batch-two-year-program-for-jnv-sainik-rms-rimc-entrance-exam-class-6th";
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreProgram;
