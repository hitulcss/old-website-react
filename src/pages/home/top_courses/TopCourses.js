import React, { useContext, useEffect, useState } from "react";
import "./TopCourses.css";
import { NavLink, useNavigate } from "react-router-dom";
import { CoursesData } from "../../../context/courses/Courses";
import Course_Exam_Box from "../../../components/Course_Exam_Box/Course_Exam_Box";

const
  TopCourses = ({
    courses,
    category,
    selectedCategory,
    setSelectedCategory,
    setClicked,
    clicked,
    from,
  }) => {
    const navigate = useNavigate();
    const { getCourses, loading } = useContext(CoursesData);
    const handleCategoryChange = (stream) => {
      getCourses(stream, 8);
    };
    useEffect(() => {
      getCourses(selectedCategory, 8);
    }, [selectedCategory]);


    return (
      <>
        <div className="top_courses_wrapper" data-aos="fade-right">
          <h1>
            Latest <span className="primary_color">Competitive Exam </span>{" "}
            Courses{" "}
            {/* <span className="primary_color">Complete Study Material</span> */}
          </h1>

          <div className="courses_names">
            {from !== "courses" && (
              <p
                // key={index}
                style={{
                  background:
                    clicked == "All"
                      ? "#9603f2"
                      : selectedCategory == "All"
                        ? "#9603f2"
                        : "white",
                  color:
                    clicked == "All"
                      ? "white"
                      : selectedCategory == "All"
                        ? "white"
                        : "black",
                }}
                onClick={() => {
                  handleCategoryChange("");
                  setClicked("All");
                  setSelectedCategory("");
                }}
              >
                All
              </p>
            )}
            {category?.map((item, index) => {
              // console.log(item?.name == selectedCategory)
              let check = false;
              let checkForSamePage = false;
              // checkForSamePage = selectedCategory == '' ? '' : setClicked('')

              check = item?.name == selectedCategory;
              // console.log('Tags one', item)
              return (
                <p
                  key={index}
                  style={{
                    background:
                      clicked == item?.id
                        ? "#9603f2"
                        : check
                          ? "#9603f2"
                          : "white",
                    color:
                      clicked == item?.id ? "white" : check ? "white" : "black",
                  }}
                  onClick={() => {
                    handleCategoryChange(item?.slug);
                    setClicked(item?.id);
                    // setSelectedCategory("");
                  }}
                >
                  {item.name}
                </p>
              );
            })}
          </div>
          <Course_Exam_Box courses={courses} loading={loading} />

          {/* <button
          className="explore_exam"
          onClick={() => window.open("/", "_blank")}
        >
          Load More
        </button> */}
        </div>
      </>
    );
  };

export default TopCourses;
