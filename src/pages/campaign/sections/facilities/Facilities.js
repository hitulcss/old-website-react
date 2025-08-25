import React from "react";
import "./Facilities.css";

const Facilities = () => {
  const facilities = [
    "Team of Experienced Faculties",
    "Provide Comprehensive Study Material",
    "Live Doubt Session",
    "Offline ka Feel Online Me",
    "Fast Solution Oriented Approach",
    "High Selection Rate",
    "Proper Lecture Planner",
    "Aptitude-based Mocks",
    "Daily Practice Sets & Mock Test",
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
              Sainik / JNV / RMS/ RIMC School
              <span style={{ color: "rgba(228, 110, 48, 1)" }}>
                {" "}
                Facilities
              </span>
            </h1>
            <p>Here is the list of facilities are:</p>
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

export default Facilities;
