import React from "react";
import "./JoinUs.css";
import facebook from "../../assets/socials/facebook.png";
import instagram from "../../assets/socials/instagram.png";
import linkedin from "../../assets/socials/linkedin.png";
import telegram from "../../assets/socials/telegram.png";
import twitter from "../../assets/socials/twitter.png";
import { pushToDataLayer } from "../../gtm/gtm";

const JoinUs = () => {
  return (
    <>
      <div className="joinus-wrapper">
        {" "}
        <div className="join_us2" data-aos="fade-up">
          <div className="join_us2_title">
            {" "}
            <h2>Join Us On</h2>
          </div>

          <p style={{ border: "1px solid #dfdfdf" }}></p>
          <div className="social_media">
            <img
              src={facebook}
              alt="facebook"
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
              loading="lazy"
            />
            <img
              src={instagram}
              alt="instagram"
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
              loading="lazy"
            />
            <img
              src={linkedin}
              alt="linkedin"
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
              loading="lazy"
            />
            <img
              src={telegram}
              alt="telegram"
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
              loading="lazy"
            />
            <img
              src={twitter}
              alt="twitter"
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
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinUs;
