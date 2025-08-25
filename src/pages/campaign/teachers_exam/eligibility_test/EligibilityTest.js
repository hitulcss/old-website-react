import React from "react";
import "./EligibilityTest.css";

const EligibilityTest = () => {
  const data = [
    {
      id: "Paper-1",
      eligibility:
        "Candidates who have passed the 12th standard with at least 45% marks",
    },
    {
      id: "Paper-2",
      eligibility: "Candidates who have obtained 50% marks in their graduation",
    },
    {
      id: "Paper-1 & Paper-2",
      eligibility: "Candidates with a Bachelor of Education (B.Ed) degree",
    },
  ];
  return (
    <>
      <div className="teacher_eligibility_wrapper">
        <div className="teacher_eligibility_container">
          <h1>
            Central Teacher{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>
              Eligibility Test (CTET)
            </span>
          </h1>
          <p>
            The Central Teacher Eligibility Test (CTET) is conducted by the
            Central Board of Secondary Education (CBSE). It evaluates if
            candidates are eligible to teach in schools under the Central
            Government of India.
          </p>

          <p>
            Candidates with a CTET certificate can apply for teaching jobs in
            Central Government schools, such as Navodaya Vidyalayas, Kendriya
            Vidyalayas, Central Tibetan Schools, and others.
          </p>

          <p>
            Additionally, they are eligible to apply for teaching positions in
            schools under the administrative control of Union Territories,
            including Chandigarh, Daman & Diu, Dadra & Nagar Haveli, Andaman &
            Nicobar Islands, and the National Capital Territory of Delhi. The
            CTET certificate is also valid for unaided private schools.
          </p>

          <div className="eligibility_table" style={{ width: "100%" }}>
            <h2>Eligibility Criteria</h2>
            <div className="patter-table" style={{ marginTop: "-3rem" }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Paper</th>
                    <th> Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.eligibility}</td>
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

export default EligibilityTest;
