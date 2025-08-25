import React, { useContext, useEffect } from "react";
import "./OfferingCoures.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CoursesData } from "../../context/courses/Courses";
import { useNavigate } from "react-router-dom";
import CourseExamBox from "../Course_Exam_Box/Course_Exam_Box";

const OfferingCourses = () => {
  const { dropdownCategory, getCourses, courses, selectedCategoryId } =
    useContext(CoursesData);



  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn) {
      getCourses(dropdownCategory, 3, "CategoryPage");
    } else {
      navigate(`/login?source=${window?.location?.href}`);
    }
  }, [dropdownCategory]);
  return (
    <>
      <div className="offering-courses-wrapper">
        {" "}
        <div className="offering-courses-container">
          <div className="offering-courses-upper">
            <div>
              {" "}
              <h1>Offering Courses for UP Police </h1>
              <p>Let’s start with these most popular courses</p>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/learning/home/${dropdownCategory == ""
                    ? courses?.data?.batches?.[0]?.category?.slug
                    : dropdownCategory
                  }/view-more/0`,
                  {
                    state: {
                      category: courses?.data?.batches?.[0]?.category?.title,
                      dropdownCategory: dropdownCategory,
                    },
                  }
                )
              }
            >
              View All
              <MdKeyboardArrowRight />
            </button>
          </div>
          <p style={{ border: "1px solid #efefef" }}></p>
          <div className="offering-courses-lower">
            {" "}
            <CourseExamBox
              from="after-login"
              source="category-page"
              courses={courses?.data?.batches}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferingCourses;
