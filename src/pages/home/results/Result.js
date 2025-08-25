import React, { useState } from "react";
import "./Result.css";
import resultImg from "../../../assets/sainik_school_result.png";
import upResult from "../../../assets/up_police.jpg";
import jnvResult1 from "../../../assets/jnvResult1.jpg"
import jnvResult2 from "../../../assets/jnvResult2.jpg"
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const Result = () => {
  const [selectedDiv, setSelectedDiv] = useState(null);

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  const result_category = ["JNV SCHOOL", "SAINIK SCHOOL", "UP POLICE"];

  const handleDivClick = (index) => {
    setSelectedDiv(index);
  };

  return (
    <>
      <div className="result_conatiner">
        <h1 data-aos="fade-up">
          Our Inspiring Excellence:{" "}
          <span className="primary_color">Our Inspired Results </span>
        </h1>

        <div className="category_conatiner">
          {result_category.map((item, index) => (
            <div key={index} className="category_item">
              <p
                className={`selectable-p ${selectedDiv === index ? "selected-p" : ""
                  }`}
                onClick={() => handleDivClick(index)}
              >
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="result_pic" data-aos="fade-up">
          <Slider {...settings}>
            <div className="result_img">
              <img src={jnvResult1} alt="result" loading="lazy" />{" "}
            </div>
            <div className="result_img">
              <img src={jnvResult2} alt="result" loading="lazy" />{" "}
            </div>
            <div className="result_img">
              <img src={upResult} alt="result" loading="lazy" />{" "}
            </div>
            <div className="result_img">
              <img src={resultImg} alt="result" loading="lazy" />{" "}
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
};

const CustomPrevArrow = (props) => {
  return (
    <div className="custom-prev-arrow" onClick={props.onClick}>
      {/* Your custom left arrow icon or content */}
      <span className="left_arrow">
        <FaAngleLeft style={{ color: "var(--primaryColor)" }} />
      </span>
    </div>
  );
};

const CustomNextArrow = (props) => {
  return (
    <div className="custom-next-arrow" onClick={props.onClick}>
      {/* Your custom right arrow icon or content */}
      <span className="right_arrow result_right_arrow">
        <FaAngleRight style={{ color: "var(--primaryColor)" }} />
      </span>
    </div>
  );
};

export default Result;
