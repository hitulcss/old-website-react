import React from "react";
import "./Stars.css";
import stdImg from "../../../../assets/campaign/student.png";

const Stars = () => {
  const jnv_stars = [
    {
      img: stdImg,
      marks: "100",
      stdName: "Vishal",
      state: "Uttar Pradesh",
    },
    {
      img: stdImg,
      marks: "100",
      stdName: "Vishal",
      state: "Uttar Pradesh",
    },
    {
      img: stdImg,
      marks: "100",
      stdName: "Vishal",
      state: "Uttar Pradesh",
    },
    {
      img: stdImg,
      marks: "100",
      stdName: "Vishal",
      state: "Uttar Pradesh",
    },
    {
      img: stdImg,
      marks: "100",
      stdName: "Vishal",
      state: "Uttar Pradesh",
    },
  ];

  return (
    <>
      <div className="jnvstars_wrapper">
        <div className="stars_title">
          {" "}
          <h1>
            SD Campus -{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>Top Student</span>
          </h1>
          <p>Meet Our Topper Students</p>
        </div>

        <div className="jnvstars_container">
          {jnv_stars.map((item, index) => (
            <div className="jnv_students" key={index}>
              <div className="img-bg">
                <img src={item.img} alt="student" />
              </div>

              <p className="std_marks">Marks - {item.marks} / 100</p>
              <p className="stdname">
                {item.stdName} | {item.state}
              </p>
            </div>
          ))}
        </div>

        <button className="jnv_btn">Aaj Hi Join Kare!</button>
      </div>
    </>
  );
};

export default Stars;
