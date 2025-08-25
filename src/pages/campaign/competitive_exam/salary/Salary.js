import React from "react";
import "./Salary.css";

const Salary = () => {
  const data = [
    { post: "Constable", pay: "21700-69100", sal: "36000-120000" },
    { post: "Head Constable", pay: "29200-92300", sal: "45000-150000" },
    { post: "Inspector", pay: "37400-112400", sal: "57000-180000" },
    {
      post: "Deputy Superintendent of Police (DSP)",
      pay: "44600-131100",
      sal: "69000-210000",
    },
    {
      post: "Assistant Commissioner of Police (ACP)",
      pay: "56100-156600",
      sal: "84000-250000",
    },
    {
      post: "Deputy Commissioner of Police (DCP)",
      pay: "67700-182200",
      sal: "101000-300000",
    },
  ];
  return (
    <>
      {" "}
      <div className="pattern_wrapper">
        <div className="patter_container">
          <h1>
            Delhi Police{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>
              Constable Salary
            </span>
          </h1>

          <div className="patter-table">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Pay Scale</th>
                  <th>In-Hand Salary(After Deductions)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.post}</td>
                    <td>{item.pay}</td>
                    <td>{item.sal}</td>
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

export default Salary;
