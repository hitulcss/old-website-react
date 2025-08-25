import React from "react";
import "./ExamPattern_Year.css";
import YearTable from "./YearTable";
import { MdDone } from "react-icons/md";

const ExamPattern_Year = () => {
  return (
    <>
      <div className="exampattern_year_wrapper">
        <div className="exampattern_year_container">
          <div className="exampattern_year_upper">
            <h2>JNV Exam Pattern 2024-25</h2>
            <p>
              According to government rules and regulations, NVS admission has
              some Age criteria. As per government guidelines, all applied
              candidates have to follow age limitations. In Simple Words for
              class, 6th Students have Minimum age of 10 Years and Maximum Age
              of 12 Years. If a candidate can not fulfill age criteria they are
              not able to apply in Jawahar Navodaya Vidyalaya Admission 2024.
            </p>
          </div>

          <YearTable />

          <div className="exampattern_year_lower">
            <div>
              <MdDone />
              <p>
                <span>Mode of Examination : </span>
                Pen-and-paper-based entrance exam
              </p>
            </div>
            <div>
              <MdDone />
              <p>
                <span>Type of Questions : </span>
                All questions will be of multiple-choice or objective type
              </p>
            </div>
            <div>
              <MdDone />
              <p>
                <span>Negative Marking : </span>
                There will be no negative marking for unanswered questions or
                incorrect responses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamPattern_Year;
