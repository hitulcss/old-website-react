import React, { useContext, useEffect } from "react";
import "./Lectures.css";
import LectureVideos from "../../../../../../components/LectureVideos/LectureVideos";
import { CoursesData } from "../../../../../../context/courses/Courses";
import { useNavigate } from "react-router-dom";

const Lectures = ({ subjectData, from }) => {
  const { lecturesOfBatch, getLecturesOfSubject } = useContext(CoursesData);
  useEffect(() => {
    getLecturesOfSubject(subjectData?.batchSlug, subjectData?.subjectId);
  }, []);
  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate(`/login?source=${window?.location?.href}`);
  }
  return (
    <>
      <div className="lecture_wrapper">
        <div className="lecture_container">
          <LectureVideos
            from={from}
            lecturesOfBatch={lecturesOfBatch}
            batchSlug={subjectData?.batchSlug}
          />
        </div>
      </div>
    </>
  );
};

export default Lectures;
