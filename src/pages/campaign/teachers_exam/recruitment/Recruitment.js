import React from "react";
import "./Recruitment.css";

const Recruitment = () => {
  return (
    <>
      <div className="recruitment_wrapper">
        <div className="recruitment_container">
          <h1>
            DSSSB Recruitment 2024 For{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>TGT, PGT MTS</span>{" "}
          </h1>

          <div className="recruit_lower">
            <p>
              The Delhi Subordinate Services Selection Board (DSSSB) has
              announced a large number of job openings – 12,785 to be exact –
              for both teaching and non-teaching positions in 2024.
            </p>
            <p>
              DSSSB is a body responsible for conducting exams under the Delhi
              government. Its main aim is to hire people for different types of
              jobs, ranging from teaching to administrative roles.
            </p>
            <p>
              This year, they're looking to fill positions such as teachers,
              nurses, assistants, and more. The application process for some of
              these jobs has already started online on the official website
              www.dsssb.delhi.gov.in.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recruitment;
