import React from "react";
import "./TestSeriesDetails.css";
import Wrapper from "../../../components/Wrapper/Wrapper";
import {
  MdOutlineMenuBook,
  MdOutlineTrackChanges,
  MdOutlineVerified,
} from "react-icons/md";
import { FiTrendingUp } from "react-icons/fi";
import courseBanner from "../../../assets/coursebanner.png";
import sscicon from "../../../assets/sscicon.png";
import delhipoliceicon from "../../../assets/delhipoliceicon.png";
import TestSeriesDetailsScrollCards from "./components/TestSeriesDetailsScrollCards";
import OverviewUpdates from "./overviewupdates/OverviewUpdates";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

const TestSeriesDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="courses" data-aos="fade-right">
        <Wrapper>
          <div className="courses_wrapper">
            <div className="courses_left_side">
              <h1>
                One <span className="primary_color">Destination</span> for
                Complete Exam <span className="primary_color">Preparation</span>
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
            <div className="course_right_side">
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
      <section className="">
        <Wrapper>
          <OverviewUpdates />
        </Wrapper>
      </section>
      <section className="popular_exams">
        <Wrapper>
          <TestSeriesDetailsScrollCards />
        </Wrapper>
      </section>
      <Footer />
    </div>
  );
};

export default TestSeriesDetails;
