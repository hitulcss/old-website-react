import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Wrapper from "../../../components/Wrapper/Wrapper";

const State_PSC_Courses = () => {
  return (
    <>
      <Navbar />
      <div className="state_psc_courses">
        <Wrapper>
          <div className="state_psc_wrapper">
            <h1>STATE PSC COURSES</h1>
          </div>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default State_PSC_Courses;
