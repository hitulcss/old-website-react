import React, { useContext, useEffect } from "react";
import "./SimilarCourses.css";
import { CoursesData } from "../../../context/courses/Courses";
import { useNavigate } from "react-router-dom";
import Course_Exam_Box from "../../../components/Course_Exam_Box/Course_Exam_Box";

const SimilarCourses = ({ course }) => {
  const { getCourses, courses } = useContext(CoursesData);
  const navigate = useNavigate();
  const handleCategoryChange = () => {
    getCourses(course, 8);
  };
  // console.log('line38', course)

  useEffect(() => {
    handleCategoryChange();
    getCourses(false, 8);
  }, [course]);
  return (
    <>
      <div className="similar_courses_wrapper" data-aos="fade-right">
        <h1>
          Similar <span className="primary_color">Courses</span>
        </h1>
        <div className="courses_and_materials_top">
          <Course_Exam_Box courses={courses} />
          {/* {courses?.data?.length > 0 ? (
            courses?.data?.map((item, index) => (
              <div className="card" key={index} onClick={() => window.open(`${item?.id}`, '_blank')}>
                <span>
                  <LuRadio /> LIVE CLASS
                </span>
                <div className="poster">
                  <img
                    src={item.banner}
                    alt="poster"
                    style={{
                      objectFit: "cover",
                      width: "200px",
                      height: "120px",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className="description">
                  <h1>
                    {item.batchName?.slice(0, 18)}
                    {item.batchName?.length > 18 ? "..." : ""}
                  </h1>
                  <p>12</p>
                  <p>
                    {item.language == "enhi"
                      ? "English & Hindi"
                      : item?.language == "en"
                        ? "English"
                        : "Hindi"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <NotFound />
          )} */}
        </div>

        {/* <button
          className="explore_courses"
          onClick={() => navigate("/courses")}
        >
          Explore Courses
        </button> */}
      </div>
    </>
  );
};

export default SimilarCourses;
