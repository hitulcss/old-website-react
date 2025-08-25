import React from "react";
import "./ExamPattern.css";
import { duration } from "moment/moment";

const ExamPattern = () => {
  const data = [
    {
      section: "Reasoning",
      ques: "25",
      maxMarks: "25",
      duration: "1 hour 30 minutes",
    },
    {
      section: "General Knowledge/ Current Affairs",
      ques: "50",
      maxMarks: "50",
    },
    {
      section: "Quantitative Aptitude",
      ques: "15",
      maxMarks: "15",
    },
    {
      section: "Computer Awareness",
      ques: "10",
      maxMarks: "10",
    },
    {
      section: "Total",
      ques: "100",
      maxMarks: "100",
    },
  ];
  return (
    <>
      <div className="exam_pattern_wrapper">
        <div className="exam_pattern_container">
          <h1>
            Delhi Police Constable{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>
              Exam Pattern 2024
            </span>
          </h1>
          <p>
            Here are the key details about the Delhi Police Constable CBT
            (Computer Based Test) exam, rewritten in an easy to understand way
          </p>
          <ol>
            <li> The exam will have 100 Multiple Choice Questions in total.</li>
            <li> Each question is worth 1 mark.</li>
            <li>
              {" "}
              You will get 90 minutes (1 hour and 30 minutes) to complete the
              full exam. There is no separate timing for different sections.
            </li>
            <li>
              {" "}
              For every wrong answer, there will be a negative marking of 0.25
              marks deducted from your score
            </li>
            <li> The questions will be divided into 4 sections:</li>
          </ol>

          <div className="exam_pattern_points">
            {" "}
            <li>Reasoning Ability</li>
            <li>General Awareness</li>
            <li>Quantitative Aptitude</li>
            <li>Computer Awareness</li>
          </div>

          <div className="exam_pattern_table">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>No. of Questions</th>
                  <th>Maximum Marks</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr >
                  <td></td>
                  <td>20</td>
                  <td>300</td>

                  <td >1 hour 30 minutes</td>
                </tr> */}
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.section}</td>
                    <td>{item.ques}</td>
                    <td>{item.maxMarks}</td>

                    {index == 0 && <td>{item?.duration}</td>}
                    {index == 1 && (
                      <td rowSpan="4">A cumulative time of 90 minutes</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamPattern;
