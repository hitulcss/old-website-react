import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import CourseExamBox from "../../../components/Course_Exam_Box/Course_Exam_Box";
import { GoGift } from "react-icons/go";
import { MdContentCopy } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import referCoin from "../../../assets/coin1.png";
import facebook from "../../../assets/socials/facebook.png";
import instagram from "../../../assets/socials/instagram.png";
import linkedin from "../../../assets/socials/linkedin.png";
import telegram from "../../../assets/socials/telegram.png";
import twitter from "../../../assets/socials/twitter.png";
import { MdOutlineRingVolume } from "react-icons/md";
import support from "../../../assets/support.png";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Divider, Tooltip } from "@mui/material";
import { WhatsappShareButton } from "react-share";
import { CoursesData } from "../../../context/courses/Courses";
import { useNavigate } from "react-router-dom";
import TodayClasses from "./today_classes/TodayClasses";
import Banner from "../../home/banner/Banner";
import { pushToDataLayer } from "../../../gtm/gtm";
import lectureImg from "../../../assets/lecture_default.jpg";

const Home = ({ from, todayClasses }) => {
  const [subscribed, setSubscribed] = useState(false);

  const {
    dropdownCategory,
    getCourses,
    courses,
    setSelectedCategory,
    setDropDownCategory,
    banner,
    getBanner,
    selectedCategoryId,
    isSidebarExpanded,
  } = useContext(CoursesData);

  const handleSubscribeClick = (subscribeLink) => () => {
    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "view_youtube_channels",
      subscribeLink: subscribeLink,
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
    });

    if (!subscribed) {
      // Perform any additional actions if needed when the user subscribes
      setSubscribed(true);
    }
    window.open(subscribeLink, "_blank");
  };

  const yt_channel = [
    {
      img: "https://d1mbj426mo5twu.cloudfront.net/assets/sdcampus_logo.png",
      title: "SD Teaching Exams",
      subs: "178K+",
      videos: "7.5K",
      subLink:
        "https://www.youtube.com/channel/UC1o9hfvby_ns1sJIKEq9LFQ?sub_confirmation=1",
      subLink:
        "https://www.youtube.com/channel/UC1o9hfvby_ns1sJIKEq9LFQ?sub_confirmation=1",
    },
    {
      img: "https://d1mbj426mo5twu.cloudfront.net/assets/sdcampus_logo.png",
      title: "SD Campus",
      subs: "44.4K+ ",
      videos: "1.3K",
      subLink:
        "https://www.youtube.com/channel/UCXi36lfrMGc3oH-OFC_1EtA?sub_confirmation=1",
    },
    {
      img: "https://d1mbj426mo5twu.cloudfront.net/assets/sdpublication-logo.png",
      title: "SD Publication",
      subs: "6K+",
      videos: "200+",
      subLink: "https://www.youtube.com/@sdpublication",
    },
    {
      img: "https://d1mbj426mo5twu.cloudfront.net/assets/sdcampus_logo.png",
      title: "SD Sainik & JNV School",
      subs: "6K+",
      videos: "500+",
      subLink: "https://www.youtube.com/@sdsainikschool",
    },
    {
      img: "https://yt3.googleusercontent.com/ctSSQSbyPye3ANtIbD8ll6joj7APgRdZ5vBmpniZdEUTtaYiC-1j5W3K6xEGkU4mCcdecJrkiRs=s160-c-k-c0x00ffffff-no-rj",
      title: "SD Sainik & JNV School English",
      subs: "5K+",
      videos: "230+",
      subLink: "https://www.youtube.com/@SDCampusSainikJNVSchoolEnglish",
    },
    // {
    //   img: "https://d1mbj426mo5twu.cloudfront.net/assets/sd_study_abroad_1718430048.jpg",
    //   title: "SD Study Abroad",
    //   subs: "1.5K+",
    //   videos: "120+",
    //   subLink: "https://www.youtube.com/@sdstudyabroad",
    // },
  ];
  const title =
    "🌟 Exciting news! Discovered SD Campus App - top-notch courses & online bookstore. 📚 Join using my code ODCTZOOI  for exclusive benefits! Let's boost our learning journey together! 🚀 ";
  const shareUrl = "https://sdcampus.onelink.me/rnhk/SDCampusApp";

  const referralCode = JSON.parse(localStorage?.getItem("details"));

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      getCourses(dropdownCategory, 10, "CategoryPage");
      if (window.innerWidth < 450) {
        getBanner(selectedCategoryId, "APP");
      } else {
        getBanner(selectedCategoryId, "WEB");
      }
    } else {
      navigate(`/login?source=${window?.location?.href}`);
    }
  }, [dropdownCategory]);
  return (
    <>
      <Toaster />
      <div className="after_login_home">
        <div className="after_login_banner">
          <Banner from="after-login" banner={banner?.data} />
        </div>

        {/* <div
          className="after_login_lower_container"
          style={{ padding: "10px" }}
        >
          {" "}
          <h1>Popular Courses</h1>
          <AfterLoginTabs from={from} />
        </div>

        <section className="top_educators">
          <Wrapper>
            <TopEducators />
          </Wrapper>
        </section> */}

        {todayClasses?.length > 0 && (
          <TodayClasses todayClasses={todayClasses} />
        )}
        <div className="offering_courses_wrapper home-courses-wrapper">
          <div>
            <h1>
              Offering Courses{" "}
              {dropdownCategory !== ""
                ? courses?.data?.batches
                  ? `for ${courses?.data?.batches?.[0]?.category?.title}`
                  : ""
                : ""}{" "}
            </h1>
            <div>
              <p
                className="after_login_view_more"
                onClick={() =>
                  navigate(
                    `/learning/home/${dropdownCategory == ""
                      ? courses?.data?.batches?.[0]?.category?.slug
                      : dropdownCategory
                    }/view-more/0`,
                    {
                      state: {
                        category: courses?.data?.batches?.[0]?.category?.title,
                        dropdownCategory: dropdownCategory,
                      },
                    }
                  )
                }
              >
                View all
              </p>
            </div>
          </div>
          <Divider />
          <div>
            <CourseExamBox
              from="after-login"
              courses={courses?.data?.batches?.slice(
                0,
                isSidebarExpanded ? 6 : 10
              )}
            />
          </div>
        </div>

        {dropdownCategory == "" && (
          <div className="shishak_refer_earn">
            <div className="shishak_refer_earn_container">
              <div
                className="shishak_refer_earn_upper"
                style={{ background: "#fff" }}
              >
                <div className="shishak_upper_left">
                  <div
                    className="refer_gift_container"
                    style={{ marginBottom: "10px" }}
                  >
                    <GoGift className="gift_icon" />
                    <p>REFER AND EARN</p>
                  </div>
                  <h2>Learn Together. Earn Together</h2>
                  <p>
                    Share app to your friends to learn and crack the exam For
                    every successful referral win up to 21 INR & your friend
                    will get 51 INR.
                  </p>
                </div>
                <div className="shishak_upper_right">
                  <img src={referCoin} alt="refercoin" />
                </div>
              </div>
              <div className="shishak_refer_earn_lower home_refer_earn">
                <div className="home_code_copy">
                  <p>{referralCode?.myReferralCode}</p>
                  <Tooltip title="Copy">
                    <MdContentCopy
                      onClick={() => {
                        navigator.clipboard.writeText(
                          referralCode?.myReferralCode
                        );
                        toast.dismiss();
                        toast.success("Copied");
                      }}
                    />
                  </Tooltip>
                </div>
                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  separator="Download Now : "
                  className="Demo__some-network__share-button"
                >
                  <div className="home_invite">
                    <FaWhatsapp className="refer_wp_icon refer_icon" />
                    <p>Invite Your Friends</p>
                  </div>
                </WhatsappShareButton>
                <div className="home_share_icon">
                  <IoShareSocialOutline />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="after_login_channel">
          <div className="chanel_top_title">
            <h2>SD Campus YouTube Channels</h2>
          </div>

          <p style={{ border: "1px solid #dfdfdf" }}></p>

          <div className="after_login_channel_Container">
            {yt_channel.map((item, index) => (
              <div
                className="after_login_channel_box"
                key={index}
                onClick={handleSubscribeClick(item.subLink)}
              >
                <img src={item.img} alt="" />
                <h2>{item.title}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="learning_bottom_section">
          <div className="need_our_help" data-aos="fade-up">
            <div className="need_help_left_side">
              <p>Need Our Help?</p>
              <NavLink to="tel:+917428394524">
                <button
                  className="call_button"
                  onClick={() => {
                    pushToDataLayer({
                      ecommerce: null, // Clear the previous ecommerce object.
                    });
                    pushToDataLayer({
                      event: "contact_support",
                      medium: "Phone",
                      isLoggedIn: localStorage?.getItem("isLoggedIn"),
                    });
                  }}
                >
                  <MdOutlineRingVolume className="help_icon" /> Call
                  +917428394524
                </button>
              </NavLink>

              <button
                className="wp_button"
                onClick={() => {
                  pushToDataLayer({
                    ecommerce: null, // Clear the previous ecommerce object.
                  });
                  pushToDataLayer({
                    event: "contact_support",
                    medium: "Whatsapp",
                    isLoggedIn: localStorage?.getItem("isLoggedIn"),
                  });
                  window.open(
                    "https://api.whatsapp.com/send/?phone=7428394524&text&type=phone_number&app_absent=0"
                  );
                }}
              >
                {" "}
                <FaWhatsapp className="help_icon" />
                Chat on WhatsApp
              </button>
            </div>
            <div className="need_help_right_side">
              <img src={support} alt="support" />
            </div>
          </div>
          <div className="join_us" data-aos="fade-up">
            <h2>Join Us On</h2>
            <p style={{ border: "1px solid #dfdfdf" }}></p>
            <div className="social_media">
              <img
                src={facebook}
                alt=""
                onClick={() => {
                  pushToDataLayer({
                    ecommerce: null, // Clear the previous ecommerce object.
                  });
                  pushToDataLayer({
                    event: "view_social_media",
                    medium: "FB",
                    isLoggedIn: localStorage?.getItem("isLoggedIn"),
                  });
                  window.open(
                    "https://www.facebook.com/sdcampus1?mibextid=b06tZ0"
                  );
                }}
              />
              <img
                src={instagram}
                alt=""
                onClick={() => {
                  pushToDataLayer({
                    ecommerce: null, // Clear the previous ecommerce object.
                  });
                  pushToDataLayer({
                    event: "view_social_media",
                    medium: "instagram",
                    isLoggedIn: localStorage?.getItem("isLoggedIn"),
                  });
                  window.open(
                    "https://www.instagram.com/sd_campus/?igshid=MzRlODBiNWFlZA%3D%3D"
                  );
                }}
              />
              <img
                src={linkedin}
                alt=""
                onClick={() => {
                  pushToDataLayer({
                    ecommerce: null, // Clear the previous ecommerce object.
                  });
                  pushToDataLayer({
                    event: "view_social_media",
                    medium: "Linkedin",
                    isLoggedIn: localStorage?.getItem("isLoggedIn"),
                  });
                  window.open("https://www.linkedin.com/company/sd-campus/");
                }}
              />
              <img
                src={telegram}
                alt=""
                onClick={() => {
                  pushToDataLayer({
                    ecommerce: null, // Clear the previous ecommerce object.
                  });
                  pushToDataLayer({
                    event: "view_social_media",
                    medium: "Telegram",
                    isLoggedIn: localStorage?.getItem("isLoggedIn"),
                  });
                  window.open("");
                }}
              />
              <img
                src={twitter}
                alt=""
                onClick={() => {
                  pushToDataLayer({
                    ecommerce: null, // Clear the previous ecommerce object.
                  });
                  pushToDataLayer({
                    event: "view_social_media",
                    isLoggedIn: localStorage?.getItem("isLoggedIn"),
                    medium: "Twitter",
                  });
                  window.open(
                    "https://twitter.com/SdCampus?t=954CVu6lwAprPboG5ca6dw&s=09"
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
