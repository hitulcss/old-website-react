import React from "react";
import "./Faq.css";
import Accordian from "../../../components/Accordian/Accordian";

const Faq = ({ data, staticData }) => {
  return (
    <>
      <div className="FAQ_wrapper">
        <h1>Frequently Asked Questions</h1>
        <div className="FAQ_accordion">
          <Accordian data={data} staticData={staticData} />
        </div>
      </div>
    </>
  );
};

export default Faq;
