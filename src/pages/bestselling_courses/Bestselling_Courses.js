import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Wrapper from "../../components/Wrapper/Wrapper";

const Bestselling_Courses = () => {
  return (
    <>
      <Navbar />
      <div className="bestselling_courses">
        <Wrapper>
          <div className="bestselling_wrapper">
            <h1>BEST SELLING COURSES</h1>
          </div>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default Bestselling_Courses;
