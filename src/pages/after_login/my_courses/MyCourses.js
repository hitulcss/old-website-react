import React, { useContext, useEffect, useState } from "react";
import "./MyCourses.css";
import Navbar from "../../../components/Navbar/Navbar";
import AfterLoginTabs from "../../../pages/after_login/LoginTabs";
import Wrapper from "../../../components/Wrapper/Wrapper";
import { IoCalendarOutline } from "react-icons/io5";
import { CoursesData } from "../../../context/courses/Courses";
import VideoBox from "../../../components/YT_Video_Box/VideoBox";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import NotFound from "../../../components/NotFound/NotFound";
import CloseIcon from "@mui/icons-material/Close";
import Banner from "../../home/banner/Banner";
import SideBar from "../../../components/Sidebar/SideBar";
import ReactPlayer from "react-player";

const MyCourses = ({ from }) => {
  const {
    getCourses,
    courses,
    getBanner,
    banner,
    myCourses,
    getMyCourses,
    recommendedCourses,
    getRecommendedCourses,
  } = useContext(CoursesData);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn) {
      // getCourses();

      getMyCourses();
      if (window.innerWidth < 450) {
        getBanner("", "APP");
      } else {
        getBanner("", "WEB");
      }
      getRecommendedCourses();
    } else {
      navigate(`/login?source=${window?.location?.href}`);
    }
  }, []);

  const navigate = useNavigate();

  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [demoVideo, setDemoVideoLink] = useState("");

  return (
    <>
      {showDemoVideo && (
        <div className="demo-video-modal">
          <CloseIcon
            className="demo-video-close-icon"
            onClick={() => {
              setShowDemoVideo(false);
            }}
          />
          <ReactPlayer
            url={demoVideo}
            controls={false}
            width="100%"
            height="50vh"
          />
        </div>
      )}
      {from !== "after-login" && <Navbar />}
      <div className="mycourses_wrapper">
        {/* <img src={poster1} alt="poster1" /> */}
        {from !== "after-login" && (
          <section className="hero_section">
            {from == "after-login" && <SideBar />}
            <Banner banner={banner?.data} />
          </section>
        )}
        <Wrapper>
          <div className="mycourses">
            <div className="after_login_lower_container">
              {" "}
              {from == "after-login" && <AfterLoginTabs from={from} />}
            </div>
            {from !== "after-login" && (
              <div className="mycourse_container" data-aos="fade-left">
                {myCourses?.length > 0 ? (
                  myCourses?.map((item, index) => (
                    <div
                      className="mycourses_box"
                      key={index}
                      data-aos="fade-left"
                    >
                      <img src={item?.banner} alt="cover" loading="lazy" />
                      <div className="mycourse_description">
                        <h2>
                          {item.batchName?.slice(0, 10)}
                          {item.batchName?.length > 10 ? ".." : ""}
                        </h2>

                        <p>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "2px",
                              marginTop: "10px",
                            }}
                          >
                            <IoCalendarOutline />

                            <span>
                              Start on{" "}
                              <span
                                style={{ fontWeight: "600", color: "#000" }}
                              >
                                {" "}
                                {item?.startingDate}
                              </span>{" "}
                              | End on{" "}
                              <span
                                style={{ fontWeight: "600", color: "#000" }}
                              >
                                {item?.endingDate}
                              </span>
                            </span>
                          </span>{" "}
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          if (from == "after-login") {
                            navigate(`/learning/my-courses/c/${item?.slug}`, {
                              state: {
                                id: item?.batchId,
                                slug: item?.slug,
                              },
                            });
                          } else {
                            navigate(`/my-courses/c/${item?.slug}`, {
                              state: {
                                id: item?.batchId,
                                slug: item?.slug,
                              },
                            });
                          }
                        }}
                      >
                        <button>Let's Study</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <NotFound title={"Course"} />
                )}
              </div>
            )}
          </div>

          {/* <div className="youtube_free_courses">
            <VideoBox
              yt_title="Free Learning"
              view="View All"
              setDemoVideoLink={setDemoVideoLink}
              setShowDemoVideo={setShowDemoVideo}
            />
          </div> */}
        </Wrapper>
      </div>
    </>
  );
};

export default MyCourses;
