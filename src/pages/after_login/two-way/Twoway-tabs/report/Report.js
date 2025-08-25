import React, { useContext, useState } from "react";
import "./Report.css";
import Textarea from "@mui/joy/Textarea";
import { CoursesData } from "../../../../../context/courses/Courses";
import toast, { Toaster } from "react-hot-toast";

const Report = ({ lectureDetails }) => {
  const { postReport } = useContext(CoursesData)

  //title
  const [title, setTitle] = useState('');






  const handlePostReport = () => {

    if (title !== '') {

      postReport({ title: title, lectureId: lectureDetails?._id })
      setTitle('')


    }
    else {
      toast.error('Add a Report...')
    }
  }

  return (
    <>
      <Toaster />
      <div className="report-wrapper">
        <div className="report-box">
          <h2>Report</h2>
          <p style={{ border: "1px solid #dfdfdf" }}></p>

          <div className="report-lower">
            <Textarea
              minRows={4}
              maxRows={4}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Write your review here"
            />

            <button className="report-btn" onClick={handlePostReport}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
