import { Typography } from "@mui/material";
import React from "react";
import exams from "../../../../assets/exams.png";
import "./TestSeriesDetailsScrollCard.css";

const TestSeriesDetailsScrollCards = () => {
  const popular_exams = [
    {
      exam_name: "Delhi Police Constable2023 Mock Test",
      tests: "216 Total Tests",
      chapter_test: "107 Chapter Test",
      sectional_test: "40 Sectional Test",
      full_test: "45 Full Test",
      more_test: "+24 more tests",
      img: exams,
      language: "Hindi / English",
    },
    {
      exam_name: "Delhi Police Constable2023 Mock Test",
      tests: "216 Total Tests",
      chapter_test: "107 Chapter Test",
      sectional_test: "40 Sectional Test",
      full_test: "45 Full Test",
      more_test: "+24 more tests",
      img: exams,
      language: "Hindi / English",
    },
    {
      exam_name: "Delhi Police Constable2023 Mock Test",
      tests: "216 Total Tests",
      chapter_test: "107 Chapter Test",
      sectional_test: "40 Sectional Test",
      full_test: "45 Full Test",
      more_test: "+24 more tests",
      img: exams,
      language: "Hindi / English",
    },
    {
      exam_name: "Delhi Police Constable2023 Mock Test",
      tests: "216 Total Tests",
      chapter_test: "107 Chapter Test",
      sectional_test: "40 Sectional Test",
      full_test: "45 Full Test",
      more_test: "+24 more tests",
      img: exams,
      language: "Hindi / English",
    },
    {
      exam_name: "Delhi Police Constable2023 Mock Test",
      tests: "216 Total Tests",

      chapter_test: "107 Chapter Test",
      sectional_test: "40 Sectional Test",
      full_test: "45 Full Test",
      more_test: "+24 more tests",
      img: exams,
      language: "Hindi / English",
    },
  ];
  return (
    <>
      <div data-aos="fade-right">
        <Typography>Delhi Police Constable Test Series</Typography>
        <div className="test_details_scroll_container">
          {popular_exams.map((item, index) => (
            <div className="exam_box" key={index}>
              <img src={item.img} alt="img" loading="lazy" />
              <h1>{item.exam_name}</h1>
              <div className="test_count">
                <span style={{ fontWeight: "500" }}>{item.tests}</span> |{" "}
                <span className="primary_color">1 Free Tests</span>
              </div>

              <div className="tests">
                <p>{item.chapter_test}</p>
                <p>{item.sectional_test}</p>
                <p>{item.full_test}</p>
                <p className="more_test">{item.more_test}</p>
              </div>
              <p className="language">{item.language}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TestSeriesDetailsScrollCards;
