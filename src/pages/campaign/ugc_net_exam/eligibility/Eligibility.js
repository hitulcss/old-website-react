import React from "react";
import "./Eligibility.css";

const Eligibility = () => {
  return (
    <>
      <div className="eligibility_wrapper">
        <div className="eligibility_container">
          <h1>
            UGC NET 2024{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>Eligibility</span>
          </h1>
          <p>
            To take the UGC NET Exam, candidates must meet certain requirements.
            They should have completed their Master's degree or an equivalent
            qualification from a recognized university. Additionally, they must
            have secured at least 55% marks (or 50% for reserved categories) in
            the subject they want to appear for in the exam.
          </p>
          <p>
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>
              There is no maximum age limit to appear for the UGC NET Exam.
            </span>
            Candidates of any age can apply for the exam as long as they meet
            the educational qualification criteria mentioned above.
          </p>
        </div>
      </div>
    </>
  );
};

export default Eligibility;
