import React from "react";
import "./Dates.css";

const Dates = () => {
  return (
    <>
      <div className="dates_wrapper">
        <div className="dates_container">
          <h1>
            UGC NET 2024{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>
              Important Dates
            </span>
          </h1>
          <p>
            The UGC NET Exam happens twice every year. The application forms for
            the exam are usually made available in March and September.
          </p>
          <p>
            A few months before the actual exam dates, the National Testing
            Agency (NTA) announces when the exams will be held. After the exams
            are conducted, the results are typically declared within one month.
          </p>
          <p>
            Candidates need to apply during the application window in March or
            September to be eligible to appear for the respective UGC NET exam.
            They should keep an eye out for the exam date announcements and make
            sure to apply on time.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dates;
