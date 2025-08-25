import React from "react";
import "./Parents.css";
import icon1 from "../../../../../assets/centers/icon1.png";
import icon2 from "../../../../../assets/centers/icon2.png";
import icon3 from "../../../../../assets/centers/icon3.png";
import icon4 from "../../../../../assets/centers/icon4.png";
import modes from "../../../../../assets/centers/modes.png";
import method from "../../../../../assets/centers/method.png";

export const Parents = () => {
  const plans = [
    {
      icon: icon1,
      title: "Regular attendance updates",
      point1: "RFID based attendance, real time update",
      point2: "Stay on top of your ward's attendance",
      point3: "Receive an alert if your ward does not attend a class",
    },
    {
      icon: icon2,
      title: "Frequent parent-teacher connects",
      point1: "Connect with teachers every month on your ward's performance",
      point2: "Understand how your ward is progressing towards the goal",
      point3: "Flexible communication channels",
    },
    {
      icon: icon3,
      title: "Detailed performance reports",
      point1:
        "Evaluate time, attempted questions, and missed opportunities to score better marks",
      point2: "Tailored learning plans for areas for improvement",
      point3: "Comparison with peers through cumulative test reports",
    },
    {
      icon: icon4,
      title: "Flexible payment options like loans, EMIs etc",
      point1:
        "Partnership with multiple loan partners such as  Bajaj, Propelld etc.",
      point2: "Flexible instalment options available",
      point3: "Payment modes",
      img: modes,
      payment_method: method,
    },
  ];
  return (
    <>
      <div className="parents_wrapper">
        <div className="parents_header">
          <h1>
            <span style={{ color: "var(--primaryColor)" }}>Parents</span>
            , we’ve got you covered
          </h1>
          <p>
            Tailored plans that accommodate the needs of both children and
            parents to ensure a successful learning experience
          </p>
        </div>

        <div className="plan_container">
          {plans.map((item, index) => (
            <div className="plan_box" key={index}>
              <img src={item.icon} alt="icon1" loading="lazy" />
              <h2>{item.title}</h2>
              <p>{item.point1}</p>
              <p>{item.point2}</p>
              <p>{item.point3}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
