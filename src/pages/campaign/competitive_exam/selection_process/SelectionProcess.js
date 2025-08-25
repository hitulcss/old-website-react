import React from "react";
import "./SelectionProcess.css";

const SelectionProcess = () => {
  const data = [
    {
      test: "Computer-Based Examination",
      marks: "100 marks",
    },
    {
      test: "Physical Endurance & Measurement Qualifying Tests (PE&MT)",
      marks: "Qualifying",
    },
  ];
  return (
    <>
      <div className="selecton_wrapper">
        <div className="selection_container">
          <h1>
            Delhi Police Constable{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>
              Selection Process
            </span>
          </h1>

          <div className="patter-table">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Tests / Examinations</th>
                  <th>Maximum marks/ Qualifying</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.test}</td>
                    <td>{item.marks}</td>
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

export default SelectionProcess;
