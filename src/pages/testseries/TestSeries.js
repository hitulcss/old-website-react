import React, { useContext, useEffect } from "react";
import "./TestSeries.css";
import "../home/HomePage.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import NewTestSeries from "./newtestseries/NewTestSeries";
import Refer from "../home/refer/Refer";
import PopularExams from "../home/popularExams/PopularExams";
import TestSeriesCategory from "./testseriescategory/TestSeriesCategory";
import Testimonial from "../home/testimonial/Testimonial";
import LiveTestQuiz from "./livetestquiz/LiveTestQuiz";
import ExamPrepration from "../courses/start_exam_prepration/ExamPrepration";
import Faq from "../courses/asked_Ques/Faq";
import "../courses/Courses.css";
import courseBanner from "../../assets/coursebanner.png";
import sscicon from "../../assets/sscicon.png";
import delhipoliceicon from "../../assets/delhipoliceicon.png";
import {
  MdOutlineTrackChanges,
  MdOutlineMenuBook,
  MdOutlineVerified,
} from "react-icons/md";
import { FiTrendingUp } from "react-icons/fi";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { CoursesData } from "../../context/courses/Courses";

const TestSeries = () => {
  const { getAllTestSeries, testSeries, setSelectedCategory } =
    useContext(CoursesData);

  useEffect(() => {
    getAllTestSeries();
    // setSelectedCategory("");
  }, []);

  return (
    <>
      <Navbar />
      <div className="courses">
        <Wrapper>
          <div className="courses_wrapper">
            <div className="courses_left_side">
              <h1>
                One Stop Solution for{" "}
                <span className="primary_color">All Exams</span>
              </h1>
              <div className="key_points">
                <p>
                  <MdOutlineMenuBook className="key_points_icon" />
                  Learn
                </p>
                <p>
                  <MdOutlineTrackChanges className="key_points_icon" />
                  Practice
                </p>
                <p>
                  <FiTrendingUp className="key_points_icon" />
                  Improve
                </p>
                <p>
                  <MdOutlineVerified className="key_points_icon" />
                  Succeed
                </p>
              </div>
              <div className="exams">
                <div className="exams_left_side">
                  <span className="exams_upper_side">
                    <img
                      src={delhipoliceicon}
                      alt="delhipolice"
                      loading="lazy"
                    />
                    <p>Delhi Police Constable</p>
                  </span>
                  <span className="exams_lower_side">
                    <p>Exam Date: 21 October 2023</p>
                  </span>
                </div>
                <div className="exams_right_side">
                  <span className="exams_upper_side">
                    <img src={sscicon} alt="delhipolice" loading="lazy" />
                    <p>SSC GD Constable</p>
                  </span>
                  <span className="exams_lower_side">
                    <p>Exam Date: 21 October 2023</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="course_right_side" data-aos="fade-left">
              <img
                src={courseBanner}
                alt="banner"
                className="test_series_banner"
                loading="lazy"
              />
            </div>
          </div>
        </Wrapper>
      </div>
      <div
        className="test_series_page_cont"
        style={{ marginLeft: "60px", marginRight: "60px" }}
      >
        <section className="new_test_series">
          <Wrapper>
            <NewTestSeries />
          </Wrapper>
        </section>
        <section className="test_series_category">
          <Wrapper>
            <TestSeriesCategory
              testSeries={testSeries}
              getAllTestSeries={getAllTestSeries}
            />
          </Wrapper>
        </section>
        <section className="popular_exams">
          <Wrapper>
            <PopularExams title="Test Series" />
          </Wrapper>
        </section>

        <section className="refer_section">
          <Wrapper>
            <Refer />
          </Wrapper>
        </section>
        <section className="live_test_quiz">
          <Wrapper>
            <LiveTestQuiz />
          </Wrapper>
        </section>

        <section className="testimonials_section">
          <Wrapper>
            <Testimonial />
          </Wrapper>
        </section>
        <div className="FAQ_Section">
          <Wrapper>
            <Faq />
          </Wrapper>
        </div>
      </div>
      <div className="exam_prepration">
        <ExamPrepration />
      </div>
      <Footer />
    </>
  );
};

export default TestSeries;
