import React from "react";
import "./Header.css";
import examheaderimg from "../../../assets/exmas/examheaderimg.png";
import Wrapper from "../../../components/Wrapper/Wrapper";

const Header = () => {
  return (
    <>
      <div className="exams_header">
        <Wrapper>
          <div className="exams_header_container">
            <div className="exam_header_left" data-aos="fade-right">
              <h1 className="exam_header_title primary_color">
                Hello Aspirant,
              </h1>
              <p className="exam_header_para">
                Welcome to our download section which exists just to furnish you
                with required supplies while you tread this road to UPSC. Feel
                free to navigate through the documents prepared and organized by
                us and we hope it helps you!
              </p>
            </div>
            <div className="exam_header_right" data-aos="fade-left">
              <img src={examheaderimg} alt="examheader" loading="lazy" />
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Header;
