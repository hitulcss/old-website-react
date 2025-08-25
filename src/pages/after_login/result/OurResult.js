import React, { useContext } from "react";
import "./OurResult.css";
import SideBar from "../../../components/Sidebar/SideBar";
import NavBar from "../NavBar/NavBar";
import { CoursesData } from "../../../context/courses/Courses";
import { HeadProvider, Title } from "react-head";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import resultBanner from "../../../assets/resultBanner.png";
import Testimonial from "./Testimonial";
import thankYou from "../../../assets/thankyou.png";
import ResultTabs from "./ResultTabs";

const OurResult = () => {
  const { isSidebarExpanded } = useContext(CoursesData);
  return (
    <>
      <HeadProvider>
        <Title>Our Result - SD Campus </Title>
      </HeadProvider>
      <NavBar from="after-login" width={isSidebarExpanded ? 250 : 93} />
      <div>
        {" "}
        <SideBar />
        <div
          className={
            isSidebarExpanded
              ? "after-login-mid open-sidebar"
              : "after-login-mid closed-sidebar"
          }
          style={{ marginLeft: isSidebarExpanded ? "250px" : "100px" }}
        >
          <div className="our-result-wrapper">
            <div>
              <ResultTabs />
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default OurResult;
