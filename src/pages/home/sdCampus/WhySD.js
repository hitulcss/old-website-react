import React from "react";
import "./WhySD.css";
import p1 from "../../../assets/why sd/1.png";
import p2 from "../../../assets/why sd/2.png";
import p3 from "../../../assets/why sd/3.png";
import p4 from "../../../assets/why sd/4.png";
import p5 from "../../../assets/why sd/5.png";
import p6 from "../../../assets/why sd/6.png";
import mainimg from "../../../assets/whysd.png";
import { useNavigate } from "react-router-dom";
const WhySD = () => {
  const navigate = useNavigate();
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const points = [
    {
      id: 0,
      img: p1,
      title: "Live & Scheduled Lectures",
    },

    {
      id: 1,
      img: p2,
      title: "Live One to One Doubt Solving Sessions",
    },
    {
      id: 2,
      img: p3,
      title: "Expert Faculty Team",
    },
    {
      id: 3,
      img: p4,
      title: "Daily Practice Papers",
    },
    {
      id: 4,
      img: p5,
      title: "Complete Structured Study Material",
    },
    {
      id: 5,
      img: p6,
      title: "Subject Wise Mock Test",
    },
  ];

  const bgColors = [
    "#FEFFC5",
    "#F2ECFF",
    "#D2FFD6",
    "#FEFFC5",
    "#F2ECFF",
    "#F2ECFF",
  ];

  return (
    <>
      <div className="why_sd_wrapper" data-aos="fade-up">
        <div className="left_side" data-aos="fade-up">
          <img src={mainimg} alt="img" loading="lazy" />
        </div>
        <div className="right_side" data-aos="fade-up">
          <div className="sd_detail">
            <h1>
              Why <span className="primary_color">SD Campus?</span>
            </h1>
            <p>
              SD Campus Is India’s Premier Learning Platform For Students In
              Classes 6 To 12. We Provide Affordable Access To Education With A
              Commitment To Excellence.
            </p>

            <div className="why-sd-points">
              {points.map((item, index) => (
                <div key={index} className="point-box">
                  <span style={{ backgroundColor: bgColors[index] }}>
                    <img src={item.img} alt="p1" loading="lazy" />
                  </span>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              if (localStorage.getItem("isLoggedIn")) {
                localStorage.setItem("index", 0);
                navigate("/learning/home");
              } else {
                navigate(
                  `/login?ref=${window.location.origin}/learning${window?.location?.pathname}&source=why_sd_home-page`
                );
              }
            }}
          >
            get started
          </button>
        </div>
      </div>
    </>
  );
};

export default WhySD;
