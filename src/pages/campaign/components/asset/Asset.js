import React from "react";
import "./Asset.css";
import giftImg from "../../../../assets/campaign/gift.png";

const Asset = () => {
  return (
    <>
      <div className="asset_wrapper">
        <div className="asset_container">
          <h1>
            Our <span style={{ color: "rgba(228, 110, 48, 1)" }}>Asset</span>
          </h1>

          <div className="asset_circle">
            <div className="circle_upper">
              <h2>SD LIBRARY</h2>
              <p>registered Student 100 + </p>
            </div>
            <div className="circle_mid">
              <div className="circle_mid_1st">
                <h2>SD CAMPUS ED-TECH CATEGORIES</h2>
                <p>
                  JNV | SAINIK SCHOOL RIMS | RMS ENTRANCE EXAM UGCT NET EXAM
                  competitive Exams
                </p>
              </div>
              <div className="circle_mid_2nd">
                <img src={giftImg} alt="gift" />
              </div>
              <div className="circle_mid_3rd">
                <h2>SD SCHOOL</h2>
                <p>Nursery To K-10 1200+ Students</p>
              </div>
            </div>
            <div className="circle_lower">
              <h2>SD HOSTAL</h2>
              <p>200+ Students</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Asset;
