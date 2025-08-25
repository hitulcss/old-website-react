import React from "react";
import "./Tests.css";

const Tests = () => {
  const data = [
    {
      parameter: "Height",
      name: "170 cms",
      email: "165 cms",
      adaptive: "157 cms",
      name: "155 cms",
    },
    {
      parameter:
        "(Residents of Hill areas, ST, Sons of Delhi   Police personnel)",

      email:
        "(Residents of Hill areas, SC/ST, Daughters of Delhi Police personnel)",
    },
    {
      parameter: "Chest",
      name: "81-85 cms (min 4 cms expansion)",
      email: "81-85 cms (min 4 cms expansion with relaxations)",
    },
    {
      parameter: "Physical Endurance Test",
    },
    {
      parameter: "Race 1600 Meters",
      name: "6 minutes (up to 30 years)",
      email: "6 minutes (up to 30 years)",
      adaptive: "8 minutes (up to 30 years)",
      name: "8 minutes (up to 30 years)",
    },
    {
      parameter: "7 minutes (31-40 years)",
      name: "Do7 minutes (31- 40 years)",
      email: "9 minutes (31-40 years)",
      adaptive: "9 minutes (31-40 years)",
    },
    {
      parameter: "8 minutes (above 40 years)",
      name: "8 minutes (above 40 years)",
      email: "d10 minutes (above 40 years)",
      adaptive: "10 minutes (above 40 years)",
    },
    {
      parameter: "GLong Jump",
      name: "14 Feet",
      email: "14 Feet",
      adaptive: "10 Feet",
      name: "10 Feet",
    },

    {
      parameter: "High Jump",
      name: "3'9",
      email: "3'9",
      adaptive: "3 Feet",
      name: "3 Feet",
    },
  ];
  return (
    <>
      <div className="tests_wrapper">
        <div className="tests_container">
          <h1>
            Physical Endurance &
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>
              Measurement Qualifying Tests(PE&MT)
            </span>
          </h1>

          <div className="tests_table">
            <div className="patter-table">
              <div className="tests_upper">
                <h2>
                  Physical Endurance & Measurement Qualifying Tests(PE&MT)
                </h2>
              </div>
              <table className="custom-table tests-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Male Candidates (General)</th>
                    <th>Male Candidates (Special Categories)</th>
                    <th>Quantitative Aptitude</th>
                    <th>Female Candidates (Special Categories)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.parameter}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.adaptive}</td>
                      <td>{item.adaptive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tests;
