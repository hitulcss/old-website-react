import React from "react";
import "./HeroSection.css";
import { MdArrowRightAlt } from "react-icons/md";
import { HiArrowLongRight } from "react-icons/hi2";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ imgSrc }) => {
  const navigate = useNavigate();

  return (
    <>
      <Wrapper>
        <div className="c2_herosection_wrapper">
          <div className="c2_herosection_left">
            <h1>
              Welcome to SD Campus{" "}
              <span style={{ color: "rgba(228, 110, 48, 1)" }}>
                India’s Best Ed-Tech Platform
              </span>
            </h1>
            <p>
              Student's Dream Campus is a leading EdTech platform that
              specializes in comprehensive education across various fields. We
              have experienced tremendous growth thanks to our commitment to
              excellence, particularly in preparing students for competitive
              exams.
            </p>
            <div className="c2_hero_buttons">
              <button
                className="c2_register-btn"
                onClick={() => {
                  navigate(
                    `/login?ref=${window.location.hostname}/competitive-exam`
                  );
                }}
              >
                Register Now <HiArrowLongRight className="btn-right_icon" />
              </button>
              <button
                className="c2_login-btn"
                onClick={() => {
                  navigate(
                    `/login?ref=${window.location.hostname}/competitive-exam`
                  );
                }}
              >
                Login <HiArrowLongRight className="btn-right_icon" />
              </button>
            </div>
          </div>
          <div className="c2_herosection_right">
            <img src={imgSrc} alt="herosecImg" loading="lazy" />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default HeroSection;
