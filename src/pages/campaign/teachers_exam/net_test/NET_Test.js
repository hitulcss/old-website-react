import React from "react";
import "./NET_Test.css";

const NET_Test = () => {
  const test_ugc_net = [
    {
      id: "Educational Qualification",
      name: "Postgraduate degree with at least 55% aggregate marks (50% for Reserved Category candidates)",
    },
    {
      id: "Age Limit for Junior Research Fellowship (JRF)",
      name: "Not exceeding 30 years",
    },
    {
      id: "Age Limit for Assistant Professor Positions",
      name: "No upper age limit",
    },
    {
      id: "Recognized Institutions",
      name: "Colleges or universities recognized by the University Grants Commission (UGC)",
    },
  ];

  const test_csir_net = [
    {
      id: "Educational Qualification",
      name: "BTech, BE, BPharm, MBBS, or Integrated BS-MS/ MSc with minimum 55% score (50% for Reserved Category)",
    },
    {
      id: "Age Limit for Junior Research Fellowship JRF)",
      name: "Not exceeding 28 years (with relaxations for Reserved Category and OBC-NCL candidates)",
    },
    {
      id: "Age Limit for Assistant Professor Positions",
      name: "No upper age limit",
    },
  ];
  return (
    <>
      <div className="test_net_wrapper">
        <div className="test_net_container">
          <h1>
            National Eligibility{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>Test (NET)</span>
          </h1>
          <p>
            The National Eligibility Test (NET), commonly referred to as NET, is
            a crucial examination aimed at determining a candidate's suitability
            for the role of Assistant Professor and/or eligibility for a Junior
            Research Fellowship (JRF). Successful candidates can pursue teaching
            careers or apply for government positions in Indian educational
            institutions. Additionally, those who qualify for the Junior
            Research Fellowship can engage in research activities within Indian
            universities and colleges.
          </p>
          <p>
            In India, the National Testing Agency (NTA) oversees two major NET
            examinations:
          </p>
          <li>CSIR NET </li>

          <li>UGC NET</li>
          <p>
            These nationwide tests serve as benchmarks for assessing candidates'
            knowledge and skills
          </p>

          <div className="test_ugc_net">
            <h2>
              1. University Grants Commission National Eligibility Test (UGC
              NET)
            </h2>
            <p>
              {" "}
              The UGC National Eligibility Test (UGC NET), also known as NTA UGC
              NET, serves as a gateway for candidates aspiring for the Junior
              Research Fellowship (JRF) and Assistant Professor roles in Indian
              universities and colleges. With a broad spectrum of 83 subjects
              covered, the UGC NET encompasses a wide range of disciplines. The
              syllabus for each subject is meticulously crafted by the
              University Grants Commission, tailoring it to the specific
              requirements of the respective field.
            </p>

            <p>
              Previously under the jurisdiction of the Central Board of
              Secondary Education (CBSE) until June 2018, the administration of
              the NET exam shifted to the National Testing Agency (NTA) starting
              December 2018.
            </p>
            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th colSpan="2">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {test_ugc_net.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="test_csir_net">
            <h2>
              2. Council of Scientific and Industrial Research NET (CSIR NET)
            </h2>
            <p>
              {" "}
              The National Testing Agency (NTA) oversees the Council for
              Scientific and Industrial Research (CSIR) National Eligibility
              Test (NET), also called CSIR UGC NET. It helps decide if
              candidates are suitable for Junior Research Fellowships (JRF) and
              Lectureships (LS)/Assistant Professor roles in Indian universities
              and colleges. 
            </p>

            <p>
              Only those who clear the CSIR NET exam can become lecturers in
              science and technology faculties. CSIR NET covers subjects like
              Chemical Sciences, Earth, Atmospheric, Ocean, and Planetary
              Sciences, Life Sciences, Mathematical Sciences, and Physical
              Sciences.
            </p>
            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th colSpan="2">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {test_csir_net.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
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

export default NET_Test;
