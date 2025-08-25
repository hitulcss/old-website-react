import React from "react";
import "./Community.css";
import Wrapper from "../../../components/Wrapper/Wrapper";
import communityImg from "../../../assets/exmas/article1.png";
import communityRightImg from "../../../assets/exmas/communityimg.png";

const Community = () => {
  return (
    <>
      <div className="community_wrapper">
        <Wrapper>
          <h1 className="community_title">Community</h1>
          <div className="community_container">
            <div className="community_left_side" data-aos="fade-right">
              <div className="community_box">
                <img src={communityImg} alt="communityImg" loading="lazy" />
                <h3>Sainik School</h3>
                <p>
                  The Batch is Completely based on the DSSSB CDP.The best
                  faculties in India will cover the full syllabus of each
                  subject.All the classes will be Live only on our SD Campus.
                </p>
              </div>
            </div>
            <div className="community_right_side" data-aos="fade-left">
              <div>
                <div className="community_right">
                  <img
                    src={communityRightImg}
                    alt="communityImg"
                    loading="lazy"
                  />
                  <h3>Live UGC NET/BPSC PGT Psychology 2023</h3>
                </div>
              </div>
              <div>
                <div className="community_right">
                  <img
                    src={communityRightImg}
                    alt="communityImg"
                    loading="lazy"
                  />
                  <h3>Live UGC NET/BPSC PGT Psychology 2023</h3>
                </div>
              </div>
              <div>
                <div className="community_right">
                  <img
                    src={communityRightImg}
                    alt="communityImg"
                    loading="lazy"
                  />
                  <h3>Live UGC NET/BPSC PGT Psychology 2023</h3>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Community;
