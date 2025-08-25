import React from "react";
import "./Love.css";
import Counter from "../../../components/CountUp/CountUp";
const Love = () => {
  const counts = [
    {
      numbers: 100000,
      sourse: "Happy Students",
    },
    {
      numbers: 31300,
      sourse: "Video Lectures",
    },
    {
      numbers: 3000,
      sourse: "Free Test",
    },
    {
      numbers: 3000,
      sourse: "Hours Weekly Content on YT",
    },
  ];
  return (
    <>
      <div className="love_wrapper" data-aos="fade-up">
        <h1 data-aos="fade-up">
          Our <span className="primary_color">Students</span> And{" "}
          <span className="primary_color">Parents</span> Love Us
        </h1>
        <div className="counts_container" data-aos="fade-up">
          {counts.map((item, index) => (
            <div className="counts_box" key={index}>
              <h1>
                <Counter number={item.numbers} />{" "}
              </h1>
              <p>{item.sourse}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Love;
