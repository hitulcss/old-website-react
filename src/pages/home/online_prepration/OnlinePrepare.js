import React from "react";
import "./OnlinePrepare.css";
import arrrowIcon from "../../../assets/prepareIcon.png";
import storeIcon from "../../../assets/playstore.png";
import appImg from "../../../assets/appImg.png";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";

const OnlinePrepare = () => {
  const preparation_keys = [
    "Interactive live classes",
    "Mock tests and practice questions",
    "High-quality notes",
    "Doubt solving",
  ];

  return (
    <>
      <div className="online_prepare_wrapper">
        <div className="online_prepare_container">
          <div className="online_prepare_left">
            <h1>Online preparation like never before</h1>
            <div className="online_keys">
              {preparation_keys.map((item, index) => (
                <p key={index}>
                  <MdOutlinePlaylistAddCheckCircle />
                  {item}
                </p>
              ))}
            </div>
            <NavLink
              to="https://play.google.com/store/apps/details?id=com.sdcampus.app&utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
              target="_blank"
            >
              {" "}
              <img src={storeIcon} alt="store" loading="lazy" />
            </NavLink>
          </div>

          <img
            className="arrow-icon"
            src={arrrowIcon}
            alt="arrow"
            loading="lazy"
          />
          <div className="online_prepare_right">
            <img src={appImg} alt="app" loading="lazy" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlinePrepare;
