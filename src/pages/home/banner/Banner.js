import React, { useContext, useEffect } from "react";
import "./Banner.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CoursesData } from "../../../context/courses/Courses";

const Banner = ({ banner, from }) => {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  const navigate = useNavigate();

  const {
    setSelectedCategory,
    setSelectedCategoryId,
    selectedCategoryId,
    setDropDownCategory,
    getBanner,
    dropdownCategory,
  } = useContext(CoursesData);
  useEffect(() => {
    if (window.innerWidth < 450) {
      getBanner(selectedCategoryId, "APP");
    } else {
      getBanner(selectedCategoryId, "WEB");
    }
  }, [dropdownCategory]);

  return (
    <>
      <div>
        <Slider {...settings}>
          {banner?.map((item, index) => {
            return (
              <div className="banner" key={index}>
                {item && (
                  <p
                    onClick={() => {
                      if (from == "after-login") {
                        if (item?.link == "batch" || item?.link == "category") {
                          setSelectedCategory(item?.categoryDetails?.title);
                          setSelectedCategoryId(item?.categoryDetails?.id);
                          setDropDownCategory(item?.categoryDetails?.slug);
                          localStorage.setItem(
                            "currentCategoryName",
                            item?.categoryDetails?.title
                          );
                          localStorage.setItem(
                            "currentCategoryId",
                            item?.categoryDetails?.id
                          );
                          localStorage.setItem(
                            "currentCategorySlug",
                            item?.categoryDetails?.slug
                          );

                          navigate(
                            `/learning/${
                              item.link === "batch"
                                ? `${item.categoryDetails?.slug}/${item.batchDetails?.slug}`
                                : item.link === "category"
                                ? `${item.categoryDetails?.slug}`
                                : item.link === "link"
                                ? `${item.linkWith}`
                                : "#"
                            }`
                          );
                        } else {
                          if (item?.linkWith !== "") {
                            window.open(item?.linkWith);
                          }
                        }
                      } else {
                        if (item?.link == "batch" || item?.link == "category") {
                          setSelectedCategory(item?.categoryDetails?.title);
                          setSelectedCategoryId(item?.categoryDetails?.id);
                          setDropDownCategory(item?.categoryDetails?.slug);
                          localStorage.setItem(
                            "currentCategoryName",
                            item?.categoryDetails?.title
                          );
                          localStorage.setItem(
                            "currentCategoryId",
                            item?.categoryDetails?.id
                          );
                          localStorage.setItem(
                            "currentCategorySlug",
                            item?.categoryDetails?.slug
                          );

                          navigate(
                            `/${
                              item.link === "batch"
                                ? `${item.categoryDetails?.slug}/${item.batchDetails?.slug}`
                                : item.link === "category"
                                ? `${item.categoryDetails?.slug}`
                                : item.link === "link"
                                ? `${item.linkWith}`
                                : "#"
                            }`
                          );
                        } else {
                          if (item?.linkWith !== "") {
                            window.open(item?.linkWith);
                          }
                        }
                      }
                    }}
                    href={
                      item.link === "batch"
                        ? `${item.categoryDetails?.slug}/${item.batchDetails?.slug}`
                        : item.link === "category"
                        ? `${item.categoryDetails?.slug}`
                        : item.link === "link"
                        ? `${item.linkWith}`
                        : "#"
                    }
                    target={item.link === "link" ? "_blank" : "_self"}
                  >
                    <img src={item?.url} alt={item.title} loading="lazy" />
                  </p>
                )}
              </div>
            );
          })}
        </Slider>
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

export default Banner;
