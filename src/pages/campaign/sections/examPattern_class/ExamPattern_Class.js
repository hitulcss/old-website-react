import React from "react";
import "./ExamPattern_Class.css";
import Switch from "@mui/material/Switch";
import ClassTable from "./ClassTable";

const label = { inputProps: { "aria-label": "Color switch demo" } };
const ExamPattern_Class = () => {
  return (
    <>
      <div className="exampattern_class_wrapper">
        <div className="exampattern_class_container">
          <div className="exampattern_class_upper">
            {" "}
            <p>JNVST Exam Pattern - Class 6th</p>
            {/* <Switch {...label} />
            <p>Class 9th</p> */}
          </div>

          <ClassTable />
        </div>
      </div>
    </>
  );
};

export default ExamPattern_Class;
