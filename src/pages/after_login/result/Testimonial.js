import React from "react";
import "./Testimonial.css";
import { FaHeart } from "react-icons/fa6";
import testiPic from "../../../assets/result-testi.png";
import userImg from "../../../assets/campaign-2/user.png";

const Testimonial = () => {
  const resultTesti = [
    {
      img: testiPic,
      title: "Ravi Sharma",
      icon: userImg,
      rank: "7",
      course: "Sainik Entrance Exam ",
      descrip:
        " SD Campus transformed my approach to the BPSC exam. The faculty's guidance, comprehensive study material, and regular  mock tests were pivotal in my success. The personalized stud plan kept me motivated and focused throughout my preparation. I couldn't have asked for a better learning experience!",
    },
    {
      img: testiPic,
      title: "Ravi Sharma",
      icon: userImg,
      rank: "7",
      course: "Sainik Entrance Exam ",
      descrip:
        " SD Campus transformed my approach to the BPSC exam. The faculty's guidance, comprehensive study material, and regular  mock tests were pivotal in my success. The personalized stud plan kept me motivated and focused throughout my preparation. I couldn't have asked for a better learning experience!",
    },
    {
      img: testiPic,
      title: "Ravi Sharma",
      icon: userImg,
      rank: "7",
      course: "Sainik Entrance Exam ",
      descrip:
        " SD Campus transformed my approach to the BPSC exam. The faculty's guidance, comprehensive study material, and regular  mock tests were pivotal in my success. The personalized stud plan kept me motivated and focused throughout my preparation. I couldn't have asked for a better learning experience!",
    },
    {
      img: testiPic,
      title: "Ravi Sharma",
      icon: userImg,
      rank: "7",
      course: "Sainik Entrance Exam ",
      descrip:
        " SD Campus transformed my approach to the BPSC exam. The faculty's guidance, comprehensive study material, and regular  mock tests were pivotal in my success. The personalized stud plan kept me motivated and focused throughout my preparation. I couldn't have asked for a better learning experience!",
    },
  ];

  return (
    <>
      <div className="result-testi-wrapper">
        <div className="result-testi-container">
          <div className="result-testi-upper">
            <p>
              ━━━━━ <span>TESTIMONIAL</span>
            </p>
            <h1>
              Student Success <FaHeart className="heart-icon" />{" "}
              <span style={{ color: "var(--primaryColor)" }}> Stories</span>
            </h1>
          </div>
          <div className="result-testi-lower">
            <div className="result-testi-lower-left">
              <img src={testiPic} alt="pic" loading="lazy" />
            </div>
            <div className="result-testi-lower-right">
              <p>
                SD Campus transformed my approach to the BPSC exam. The
                faculty's guidance, comprehensive study material, and regular
                mock tests were pivotal in my success. The personalized study
                plan kept me motivated and focused throughout my preparation. I
                couldn't have asked for a better learning experience!
              </p>
              <div className="camp-testi-left-lower">
                <img src={userImg} alt="user" />

                <div>
                  <h2>Ravi Sharma</h2>
                  <div className="testi-rank">
                    Rank -1 | Sainik Entrance Exam
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="result-testi-lower-container">
          <div className="result-testi-container2">
            <div className="result-testi-slider">
              {resultTesti.map((item, index) => (
                <div className="result-testi-slider-box" key={index}>
                  <p>{item.descrip}</p>
                  <img src={item.img} alt="user" className="video-img" />

                  <div className="camp-testi-left-lower">
                    <img src={item.icon} alt="user" />

                    <div>
                      <h2>{item.title}</h2>
                      <div className="testi-rank2">
                        Rank - {item.rank} | {item.course}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
