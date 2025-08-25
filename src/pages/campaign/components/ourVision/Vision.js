import React from "react";
import "./Vision.css";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import vissionImg from "../../../../assets/campaign/vision.png";
import MissionImg from "../../../../assets/campaign//mission.png";

const Vision = () => {
  return (
    <>
      <Wrapper>
        {" "}
        <div className="vision_wrapper">
          <div className="vision">
            <div className="vision_left">
              <h1>
                Our{" "}
                <span style={{ color: "rgba(133, 48, 125, 1)" }}>Vision</span>{" "}
              </h1>
              <p>
                We are more than just a regular coaching institute- we are a
                nurturing community that cares about your all-round growth. At
                Student's Dream Campus, our focus is on developing not just your
                academic skills but also your character and values.
              </p>
            </div>
            <div className="vision_right">
              <img src={vissionImg} alt="vissionImg" loading="lazy" />
            </div>
          </div>
          <div className="mission">
            <div className="mission_left">
              {" "}
              <img src={MissionImg} alt="missionImg" loading="lazy" />
            </div>
            <div className="mission_right">
              {" "}
              <h1>
                Our{" "}
                <span style={{ color: "rgba(133, 48, 125, 1)" }}>Mission</span>{" "}
              </h1>
              <p>
                To empower students with comprehensive skills and knowledge,
                fostering an environment where each individual receives
                personalized attention.
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Vision;
