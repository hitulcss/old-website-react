import React, { useContext, useState, useEffect } from "react";
import Course_Exam_Box from "../../../components/Course_Exam_Box/Course_Exam_Box";
import { CoursesData } from "../../../context/courses/Courses";
import Wrapper from "../../../components/Wrapper/Wrapper";
import { useParams } from "react-router-dom";

const AllCourses = ({ from }) => {
  const { getCourses, courses } = useContext(CoursesData);

  const { slug } = useParams();

  useEffect(() => {
    // if (slug) {
    getCourses("All", 8, "");
    // }
  }, [slug]);

  return (
    <>
      <div>
        {" "}
        <div className="new_courses_container">
          <Wrapper>
            <Course_Exam_Box courses={courses?.data?.batches} from={from} />
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export default AllCourses;
