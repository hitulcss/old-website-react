import React from "react";
import "./QualityCourse.css";
import learner_img from "../../../assets/learner_img.png";
import { MdAutoStories } from "react-icons/md";
import arrow from "../../../assets/arrow.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const QualityCourse = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="quality_wrapper"
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
      >
        <div className="quality_container">
          <div className="quality_left">
            <div className="quality_left_top" data-aos="fade-up">
              <MdAutoStories className="quality_icon" />
              <p>100% Quality Courses</p>
            </div>
            <p data-aos="fade-up">
              Unlock your potential by signing up with SD Campus <br></br>
              The most affordable learning solution
            </p>
            <div className="get_started_btn">
              <button
                onClick={() => {
                  if (!localStorage?.getItem("isLoggedIn")) {
                    Cookies.set("utm_source", "sdcampusweb");
                    navigate(
                      `/login?ref=${window.location.origin}/learning${window?.location?.pathname}&source=get-started_home-page`
                    );
                  } else {
                    localStorage.setItem("index", 0);
                    navigate("/learning/home");
                  }
                }}
                className="btn-three"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="quality_right">
            <img src={arrow} alt="" className="arrow_icon" loading="lazy" />
            <img
              src={learner_img}
              className="girl_pic"
              data-aos="flip-left"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QualityCourse;
