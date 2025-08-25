import React from "react";
import "./FreeLearning.css";
import { MdOutlineAutoStories } from "react-icons/md";
import { MdOutlineCastForEducation } from "react-icons/md";
import { RiBookMarkLine } from "react-icons/ri";
import { MdOutlineReceiptLong } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const FreeLearning = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="free_learning_wrapper">
        <h1 data-aos="fade-up">Try Learning For Free</h1>
        <div className="free_learning_container" data-aos="fade-up">
          <div
            className="free_learning_box"
            onClick={() => {
              if (!localStorage?.getItem('isLoggedIn')) {
                Cookies.set('utm_campaign', 'sdcampusweb')
                Cookies.set('utm_source', 'Free_Courses-home_page')
                Cookies.set('utm_medium', 'Free_Courses-home_page')
                navigate(`/login?ref=${window.location.origin}/learning${window?.location?.pathname}&utm_source=home-page_free_courses&utm_medium=try_free_learning&utm_campaign=campuswebsite_homepage`);
              }

            }}
          >
            <div className="icon_bg">
              <MdOutlineAutoStories className="free_learn_icon" />
            </div>

            <p>Free Courses</p>
            <FaArrowRightLong className="free_learn_icon" />
          </div>
          <div
            className="free_learning_box"
            onClick={() => {
              if (!localStorage?.getItem("isLoggedIn")) {
                Cookies.set('utm_campaign', 'sdcampusweb')
                Cookies.set('utm_source', 'Free_Live_Classes-home_page')
                Cookies.set('utm_medium', 'Free_Live_Classes-home_page')
                navigate(
                  `/login?ref=${window.location.origin}/learning${window?.location?.pathname}&utm_source=home-page_free_live_classes&utm_medium=free_live_classes&utm_campaign=campuswebsite_homepage`
                );
              }
            }}
          >
            <div className="icon_bg">
              <MdOutlineCastForEducation className="free_learn_icon" />
            </div>

            <p>Free Live Classes</p>
            <FaArrowRightLong className="free_learn_icon" />
          </div>
          <div
            className="free_learning_box"
            onClick={() => {
              window.location.href = "https://sdpublication.com?utm_source=campuswebsite_homepage_reference_books&utm_medium=reference_books&utm_campaign=campuswebsite_homepage";
            }}
          >
            <div className="icon_bg">
              <RiBookMarkLine className="free_learn_icon" />
            </div>

            <p>Reference Books</p>
            <FaArrowRightLong className="free_learn_icon" />
          </div>
          <div
            className="free_learning_box"
            onClick={() => {
              if (!localStorage?.getItem("isLoggedIn")) {
                Cookies.set('utm_campaign', 'sdcampusweb')
                Cookies.set('utm_source', 'Free_Notes-home_page')
                Cookies.set('utm_medium', 'Free_Notes-home_page')
                navigate(
                  `/login?ref=${window.location.origin}/learning${window?.location?.pathname}&utm_source=home-page_free_notes&utm_medium=free_notes&utm_campaign=campuswebsite_homepage`
                );
              }
            }}
          >
            <div className="icon_bg">
              <MdOutlineReceiptLong className="free_learn_icon" />
            </div>

            <p>Free Notes</p>
            <FaArrowRightLong className="free_learn_icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeLearning;
