import React from "react";
import "./Pattern.css";

const Pattern = () => {
  const data = [
    { id: "Paper-1", name: "John", email: "john@example.com" },
    { id: "Paper-2", name: "Jane", email: "jane@example.com" },
    { id: "Paper-3", name: "Doe", email: "doe@example.com" },
  ];
  return (
    <>
      <div className="pattern_wrapper">
        <div className="patter_container">
          <h1>
            UGC NET Exam{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>Pattern 2024</span>
          </h1>

          <div className="patter-table">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>General Awareness</th>
                  <th>Reasoning Ability</th>
                  <th>Computer Knowledge</th>
                  <th>Quantitative Aptitude</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.email}</td>
                    <td>{item.email}</td>
                    <td>{item.email}</td>
                    <td>{item.email}</td>
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

export default Pattern;
