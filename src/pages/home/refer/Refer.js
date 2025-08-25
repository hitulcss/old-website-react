import React from "react";
import "./Refer.css";
import giftimg from "../../../assets/giftcard.png";
import { useNavigate } from "react-router-dom";
const Refer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="refer_wrapper" data-aos="fade-up">
        <div className="refer_left_side" data-aos="fade-up">
          <h1>Refer friends to win SD Campus vouchers and Plus Subscription</h1>
          <p>
            Share app to your friends to learn and crack the exam For every
            successful referral win up to <b>21 INR</b> & your friend will get{" "}
            <b>51 INR</b>.
          </p>
          <button
            className="refer_btn"
            onClick={() => {
              window.location.href =
                "https://play.google.com/store/apps/details?id=com.sdcampus.app&utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp";
            }}
          >
            {" "}
            Refer A Friend
          </button>
        </div>
        <div className="refer_right_side" data-aos="fade-up">
          <img src={giftimg} alt="gifrcard" loading="lazy" />
        </div>
      </div>
    </>
  );
};

export default Refer;
