import React from "react";
import "./Learn.css";
import playstore from "../../../assets/playstore2.png";
import mobile from "../../../assets/mobile.png";
import { useNavigate } from "react-router-dom";

const Learn = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="learn_wrapper" data-aos="fade-up">
        <div className="learn_container">
          <div className="learn_left" data-aos="fade-up">
            <h2>Learn From Anywhere</h2>
            <p>
              We're available on Android devices and website. Study from
              anywhere at your convenience.
            </p>

            <div className="learn_app">
              <p>Download Now!</p>
              <img
                src={playstore}
                alt="playstore"
                onClick={() => {
                  window.location.href =
                    "https://play.google.com/store/apps/details?id=com.sdcampus.app&pcampaignid=web_share";
                }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="learn_right" data-aos="fade-up">
            <img src={mobile} alt="mobile" loading="lazy" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Learn;
