import React from "react";
import "./Testimonials.css";
import upper from "../../../../assets/campaign-2/upper.png";
import lower from "../../../../assets/campaign-2/lower.png";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import { FaHeart } from "react-icons/fa";
import userImg from "../../../../assets/campaign-2/user.png";
import { IoStarSharp } from "react-icons/io5";

const Testimonials = ({ data }) => {
  return (
    <>
      <Wrapper>
        <div className="camp-testi-wrapper">
          <p className="testi-text"> ─── TESTIMONIALS</p>
          <h1>
            Student Success <FaHeart className="heart-icon" />{" "}
            <span style={{ color: "var(--campSecondary)" }}> Stories</span>
          </h1>
          <div className="camp-testi-container">
            {data?.map((item, index) => (
              <div className="camp-testi-box" key={index}>
                <div className="camp-testi-left">
                  <div className="testi-quote">
                    <img
                      className="upper-quote"
                      src={upper}
                      alt="upper"
                      loading="lazy"
                    />
                    <img
                      className="lower-quote"
                      src={lower}
                      alt="lower"
                      loading="lazy"
                    />
                  </div>

                  <div className="camp-testi-left-upper">
                    <span style={{ color: "#f1fae5" }}>
                      ────────────────────
                    </span>
                    <p className="testi-descrip">{item.comment}</p>
                    <span style={{ color: "#f1fae5" }}>
                      {" "}
                      ────────────────────
                    </span>
                  </div>
                  <div className="camp-testi-left-lower">
                    <img src={userImg} alt="user" />

                    <div>
                      <h2>{item.username}</h2>
                      <div>
                        <IoStarSharp className="testi-star-icon" />
                        <IoStarSharp className="testi-star-icon" />
                        <IoStarSharp className="testi-star-icon" />
                        <IoStarSharp className="testi-star-icon" />
                        <IoStarSharp className="testi-star-icon" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="camp-testi-right">
                  <img src={testi} alt="img" />
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Testimonials;
