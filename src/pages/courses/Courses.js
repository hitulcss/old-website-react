import React, { useContext, useEffect } from "react";
import "./Courses.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import courseBanner from "../../assets/coursebanner.png";
import sscicon from "../../assets/sscicon.png";
import delhipoliceicon from "../../assets/delhipoliceicon.png";
import {
  MdOutlineTrackChanges,
  MdOutlineMenuBook,
  MdOutlineVerified,
} from "react-icons/md";

import { FiTrendingUp } from "react-icons/fi";
import TopCourses from "../home/top_courses/TopCourses";
import FreeLive from "./free_live_classes/FreeLive";
import TopEducators from "../home/topEducators/TopEducators";
import Refer from "../home/refer/Refer";
import Testimonial from "../home/testimonial/Testimonial";
import Faq from "./asked_Ques/Faq";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { CoursesData } from "../../context/courses/Courses";

const Courses = () => {
  const {
    getCourses,
    courses,
    setSelectedCategory,
    getAllCategory,
    category,
    getBanner,
    banner,
    selectedCategory,
  } = useContext(CoursesData);

  useEffect(() => {
    getCourses(false, 8);
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
                    <img src={delhipoliceicon} alt="delhipolice" />
                    <p>Delhi Police Constable</p>
                  </span>
                  <span className="exams_lower_side">
                    <p>Exam Date: 21 October 2023</p>
                  </span>
                </div>
                <div className="exams_right_side">
                  <span className="exams_upper_side">
                    <img src={sscicon} alt="delhipolice" />
                    <p>SSC GD Constable</p>
                  </span>
                  <span className="exams_lower_side">
                    <p>Exam Date: 21 October 2023</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="course_right_side" data-aos="fade-left">
              <img src={courseBanner} alt="banner" />
            </div>
          </div>
        </Wrapper>
      </div>

      <div className="top_courses ">
        <Wrapper>
          <TopCourses courses={courses} from="courses" />
        </Wrapper>
      </div>

      <div className="free_live_classess">
        <Wrapper>
          <FreeLive />
        </Wrapper>
      </div>

      <div className="top_educators">
        <Wrapper>
          <TopEducators />
        </Wrapper>
      </div>

      <div className="refer_section">
        <Wrapper>
          <Refer />
        </Wrapper>
      </div>
      <div className="testimonials_section">
        <Wrapper>
          <Testimonial />
        </Wrapper>
      </div>

      <div className="FAQ_Section">
        <Wrapper>
          <Faq />
        </Wrapper>
      </div>

      <Footer />
    </>
  );
};

export default Courses;
