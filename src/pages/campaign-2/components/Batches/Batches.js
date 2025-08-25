import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import "./Bactches.css";
import CourseExamBox from "../../../../components/Course_Exam_Box/Course_Exam_Box";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import { CoursesData } from "../../../../context/courses/Courses";

const Batches = ({ slug , subCategorySlug}) => {
  const { getCourses, courses } = useContext(CoursesData);
  const navigate = useNavigate();

  useEffect(() => {
    if( subCategorySlug && subCategorySlug != ""){
       getCourses(slug, 4, "" , subCategorySlug);
    }else{
       getCourses(slug, 4 );
    }
  }, []);
  return (
    <>
      <div className="batches-wrapper">
        <Wrapper>
          <div className="batches-container">
            <div className="batches-upper">
              <h1>
                <span style={{ color: "var(--campSecondary)" }}>
                  Bihar Civil Services
                </span>{" "}
                Batches
              </h1>
              <button className="laptop-view-btn batch-btn" onClick={ () => {
                if( !subCategorySlug || subCategorySlug == ""  ){
                  navigate(`/${slug}/view-all`)
                }else{
                  navigate(`/${slug}/${subCategorySlug}/view-all`)

                }
              }}>
                Explore More
              </button>
            </div>
            <div className="batches-lower">
              <CourseExamBox courses={courses?.data?.batches}  from="campaign2" />
            </div>
            <button className="phone-view-btn ">Explore More</button>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Batches;
