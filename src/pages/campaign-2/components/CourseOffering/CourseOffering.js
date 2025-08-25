import React from "react";
import "./CourseOffering.css";
import img from "../../../../assets/campaign-2/courseOffer.png";
import live from "../../../../assets/campaign-2/live.png";
import syllabus from "../../../../assets/campaign-2/syllabus.png";
import practice from "../../../../assets/campaign-2/practice.png";
import twoway from "../../../../assets/campaign-2/twoway.png";
import testseries from "../../../../assets/campaign-2/testseries.png";
import guidence from "../../../../assets/campaign-2/guidence.png";
import Wrapper from "../../../../components/Wrapper/Wrapper";

const CourseOffering = () => {
  const handleClickScroll = () => {
    const element = document.getElementById("book-demo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="course-offer-wrapper">
        <Wrapper>
          <div className="course-offer-container">
            <div className="course-offer-left">
              <img src={img} alt="img" loading="lazy" />
            </div>
            <div className="course-offer-right">
              <h1>BPSC Exam Course Offering</h1>
              <div className="offer-features">
                <span>
                  <img src={live} alt="icon" loading="lazy" />
                  <p>Complete LIVE Preparation</p>
                </span>
                <span>
                  <img src={syllabus} alt="icon" loading="lazy" />
                  <p>Based on the Latest Exam Pattern & Syllabus</p>
                </span>
                <span>
                  <img src={guidence} alt="icon" loading="lazy" />
                  <p>Guidance Session</p>
                </span>
                <span>
                  <img src={practice} alt="icon" loading="lazy" />
                  <p>Practice Questions & Structured Study Notes</p>
                </span>
                <span>
                  <img src={testseries} alt="icon" loading="lazy" />
                  <p>Fully Solved PYQ's & Mock Test Series</p>
                </span>
                <span>
                  <img src={twoway} alt="icon" loading="lazy" />
                  <p>Two way communication</p>
                </span>
              </div>
              <button onClick={handleClickScroll}>Book Free Demo!</button>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default CourseOffering;
