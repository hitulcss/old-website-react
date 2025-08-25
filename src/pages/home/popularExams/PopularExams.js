import React, { useContext, useEffect } from "react";
import "./PopularExam.css";
import { CoursesData } from "../../../context/courses/Courses";
import Course_Exam_Box from "../../../components/Course_Exam_Box/Course_Exam_Box";

const PopularExams = ({ title }) => {
  const { getAllTestSeries, testSeries } = useContext(CoursesData);
  useEffect(() => {
    getAllTestSeries();
  }, []);
  // console.log('line64', testSeries)
  return (
    <>
      <div className="popular_exams_wrapper" data-aos="fade-right">
        <div className="popular_upper_part">
          <h1>Popular {title ? title : "Exams"}</h1>
          <p>View All</p>
        </div>

        {/* New exams design  */}
        <Course_Exam_Box />

        {title !== "Test Series" && (
          <button
            className="explore_exam"
            onClick={() => window.open("https://exams.sdcampus.com/", "_blank")}
          >
            Explore {title}
          </button>
        )}
      </div>
    </>
  );
};

export default PopularExams;
