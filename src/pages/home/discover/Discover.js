import React, { useContext, useState } from "react";
import "./Discover.css";
import "slick-carousel/slick/slick.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CoursesData } from "../../../context/courses/Courses";

const Explore = ({ category, setSelectedCategory }) => {
  const [showAll, setShowAll] = useState(false);
  const { setDropDownCategory, setSelectedCategoryId } =
    useContext(CoursesData);

  const navigate = useNavigate();

  const visibleItems = showAll ? category : category?.slice(0, 2);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <div
        className="explore_wrapper"
        style={{ position: "relative" }}
        data-aos="fade-up"
      >
        <div className="">
          <p className="explore_heading">
            Explore Exam Categories <br></br>
            <span>
              Students are being prepared for {category?.length} exam categories
              at SD Campus.
            </span>
          </p>
        </div>
        <div className="explore_courses_wrapper" data-aos="fade-up">
          <div className="explore_course_container">
            {visibleItems?.map((item, index) => (
              <div
                className="explore_course_box"
                key={index}
                onClick={() => {
                  setSelectedCategory(item?.name);
                  setSelectedCategoryId(item?.id);
                  setDropDownCategory(item?.slug);
                  localStorage.setItem("currentCategoryName", item?.name);
                  localStorage.setItem("currentCategoryId", item?.id);
                  localStorage.setItem("currentCategorySlug", item?.slug);
                  navigate(`/${item?.slug !== "" ? item?.slug : "category"}`, {
                    state: {
                      name: item?.name,
                      id: item?.id,
                    },
                  });
                }}
              >
                <div className="explore_course_left">
                  <img
                    src={item?.banner}
                    alt={`Course ${index}`}
                    className="course_Img"
                    loading="lazy"
                  />
                </div>
                <div className="explore_course_right">
                  <h2>{item?.name}</h2>
                  <div className="__category_tag">
                    {item?.tags?.length > 0 &&
                      item?.tags?.map((tag, idx) => (
                        <p className="___cat__tags" key={idx}>
                          {tag}
                        </p>
                      ))}
                  </div>

                  <div className="explore_category_container">
                    <button className="explore_category_btn">
                      <p className="explore_icon_container">Explore Category</p>
                      <div className="explore_icon_container">
                        
                        <FaExternalLinkAlt className="explore_icon" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
