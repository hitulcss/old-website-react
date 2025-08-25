import React, { useContext, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import resultBanner from "../../../assets/resultBanner.png";
import Testimonial from "./Testimonial";
import thankYou from "../../../assets/contactUS/thankyou.png";
import { CoursesData } from "../../../context/courses/Courses";

const MainResultPage = ({ newCategory, year }) => {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const {
    setSelectedCategory,
    setSelectedCategoryId,
    selectedCategoryId,
    setDropDownCategory,
    getResultBanner,
    getSuccessStory,
    successStory,
    resultBanner,
    dropdownCategory,
  } = useContext(CoursesData);

  useEffect(() => {
    getSuccessStory(newCategory, year);
    getResultBanner(newCategory, year);
  }, [newCategory, year]);
  return (
    <>
      <div style={{ marginTop: "1.5rem" }}>
        {" "}
        {resultBanner?.map((item, index) => (
          <div key={index}>
            <Slider {...settings}>
              <div className="banner-result">
                <img src="" alt="img" loading="lazy" />
              </div>
            </Slider>
          </div>
        ))}
        <div>
          <Testimonial />
        </div>
        <div className="thanks-container">
          <div className="thanks-left">
            <h2>
              We thanks{" "}
              <span style={{ color: "var(--primaryColor)" }}>Our Students</span>{" "}
              &{" "}
              <span style={{ color: "var(--primaryColor)" }}>
                Their Parents
              </span>{" "}
              For Believeing Us !
            </h2>
            <button>
              BE A PART OF SD CAMPUS NOW <FaAngleRight />
            </button>
          </div>
          <div className="thanks-right">
            <img src={thankYou} alt="thank" loading="lazy" />
          </div>
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
        <FaAngleLeft />
      </span>
    </div>
  );
};

const CustomNextArrow = (props) => {
  return (
    <div className="custom-next-arrow" onClick={props.onClick}>
      {/* Your custom right arrow icon or content */}
      <span className="right_arrow">
        <FaAngleRight />
      </span>
    </div>
  );
};

export default MainResultPage;
