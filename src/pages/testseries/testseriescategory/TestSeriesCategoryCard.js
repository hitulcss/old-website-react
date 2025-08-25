import React from "react";
import "./TestSeriesCategory.css";
import "../../home/popularExams/PopularExam.css";
import exams from "../../../assets/exams.png";

const TestSeriesCategoryCard = ({ item, testSeries }) => {
  return (
    <div
      className="exam_box"
      id="exam_box"
      style={{ height: testSeries?.data?.length > 3 ? "100%" : "270px" }}
      onClick={() => window.open(`${item.link}`, "_blank")}
    >
      <img
        src={exams}
        alt="exam"
        style={{ marginTop: "10px" }}
        loading="lazy"
      />
      <h1>{item.name}</h1>
      <div className="test_count">
        <span style={{ fontWeight: "500" }}>{item?.noOfTest} Total Tests</span>{" "}
        | <span className="primary_color">1 Free Tests</span>
      </div>

      <p className="language">
        {item.language == "en"
          ? "English"
          : item?.language == "hi"
          ? "Hindi"
          : "English & Hindi"}
      </p>
    </div>
  );
};

export default TestSeriesCategoryCard;
