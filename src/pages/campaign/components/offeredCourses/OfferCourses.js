import React, { useContext, useEffect } from "react";
import "./OfferCourses.css";
import { CoursesData } from "../../../../context/courses/Courses";
import CourseExamBox from "../../../../components/Course_Exam_Box/Course_Exam_Box";

const OfferCourses = ({ source, slug }) => {
  const { getCourses, courses } = useContext(CoursesData);

  useEffect(() => {
    getCourses(slug, 4);
  }, []);

  // console.log("offered courses" + courses);
  return (
    <>
      <div className="offered_course_wrapper">
        {" "}
        <div className="offered_course_container">
          <div className="offered_upper">
            <h1>Our Offered Courses</h1>
            <p style={{ color: "rgba(228, 110, 48, 1)", cursor: "pointer" }}>
              {" "}
              View All{" "}
            </p>
          </div>

          <div className="offered_courses_wrapper">
            <CourseExamBox courses={courses?.data?.batches} source={source} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferCourses;
