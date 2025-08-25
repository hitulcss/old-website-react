import React from "react";
import "./EntranceExam.css";

const EntranceExam = () => {
  const facilities = [
    "Seek Guidance",
    "Stay Motivated",
    "Collect Study Material",
    "Practice With Sample Paper ",
    "Mock Tests",
    "Focus On Week Area",
    "Time Mangement",
    "Study The Syllabus",
    "Understand The Exam Pattern ",
  ];

  const colors = [
    "rgba(10, 75, 122, 1)",
    "rgba(133, 48, 125, 1)",
    "rgba(228, 110, 48, 1)",
    "rgba(3, 148, 71, 1)",
    "rgba(189, 32, 46, 1)",
    "rgba(133, 48, 125, 1)",
    "rgba(228, 110, 48, 1)",
    "rgba(10, 75, 122, 1)",
  ];
  const bgColors = [
    "rgba(10, 75, 122, 0.08)",
    "rgba(133, 48, 125, 0.08)",
    "rgba(228, 110, 48, 0.08)",
    "rgba(3, 148, 71, 0.08)",
    "rgba(189, 32, 46, 0.08)",
    "rgba(133, 48, 125, 0.08)",
    "rgba(228, 110, 48, 0.08)",
    "rgba(10, 75, 122, 0.08)",
  ];
  return (
    <>
      <div className="facility_wrapper">
        <div className="facility_container">
          <div className="facility_upper">
            <h1>
              How to Prepare for
              <span style={{ color: "rgba(228, 110, 48, 1)" }}>
                {" "}
                Teaching Entrance Exam
              </span>
            </h1>
          </div>
          <div className="facility_lower">
            {facilities.map((item, index) => (
              <div
                className="facility_box"
                key={index}
                style={{
                  color: colors[index],
                  backgroundColor: bgColors[index],
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EntranceExam;
