import React from "react";
import "./Vacancy.css";

const Vacancy = () => {
  const data = [
    { post: "Non-Teaching", vacancy: "2354" },
    { post: "Post Graduate Teachers (PGT)", vacancy: "297" },
    { post: "Assistant Teacher (Nursery)", vacancy: "1455" },
    { post: "Section Officer (Horticulture)", vacancy: "108" },
    { post: "Multi Tasking Staff (MTS)", vacancy: "567" },
    { post: "Trained Graduate Teacher", vacancy: "4591" },
    { post: "Drawing Teacher", vacancy: "527" },
    { post: "Pharmacist, Nursing Officer, Cook & Other", vacancy: "1896" },
    {
      post: "Senior Personal Assistant (SPA), Personal Assistant (PA), Junior Judicial Assistant (JJA)",
      vacancy: "990",
    },
    { post: "Total", vacancy: "12785" },
  ];
  return (
    <>
      <div className="vacancy_wrapper">
        <div className="vacancy_container">
          <h1>
            DSSSB Vacancy{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>2024</span>
          </h1>

          <div className="vacancy-table">
            <table className="vacancy-table-container">
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Vacancies</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.post}</td>
                    <td>{item.vacancy}</td>
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

export default Vacancy;
