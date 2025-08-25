import React from "react";
import "./Access.css";
import icon1 from "../../assets/access/feed.png";
import icon2 from "../../assets/access/quizzes.png";
import icon3 from "../../assets/access/doubt.png";
import icon4 from "../../assets/access/community.png";
import { BsArrowRightSquareFill } from "react-icons/bs";

const Access = () => {
  const accessContent = [
    {
      icon: icon1,
      title: "Feeds",
      descrip: "Stay Updated with daily curated Current Affairs",
    },
    {
      icon: icon2,
      title: "Mock Tests & Quizzes",
      descrip: "Expert- Designing exam prep tests",
    },
    {
      icon: icon3,
      title: "Instant Doubt Support",
      descrip: "Upload Screenshot and Post Doubt Instant Doubt Solutions",
    },
    {
      icon: icon4,
      title: "Community Group learning",
      descrip: "Share your posts in Community & Interact with your peers.",
    },
    {
      icon: icon2,
      title: "Mock Tests & Quizzes",
      descrip: "Expert- Designing exam prep tests",
    },
  ];

  const bgColors = ["#F2ECFF", "#FFF8E5", "#EEFFF0", "#F2ECFF", "#FFF8E5"];

  return (
    <>
      <div className="access-wrapper">
        <div className="access-container">
          <div className="access-upper">
            <h1>No-hassle Access</h1>
            <p>Instant Access to Your Learning Access</p>
          </div>
          <p style={{ border: "1px solid #eeee" }}></p>
          <div className="access-lower">
            {accessContent.map((item, index) => (
              <div
                className="access-box"
                key={index}
                style={{
                  backgroundColor: bgColors[index],
                }}
              >
                <div className="access-box-upper">
                  <img src={item.icon} alt="icon" loading="lazy" />
                  <BsArrowRightSquareFill className="access-arrow-icon" />
                </div>
                <div className="access-box-lower">
                  <h2> {item.title}</h2>
                  <p>{item.descrip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Access;
