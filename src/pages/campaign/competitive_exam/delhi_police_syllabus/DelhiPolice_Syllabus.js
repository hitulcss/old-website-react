import React from "react";
import "./DelhiPolice_Syllabus.css";

const DelhiPolice_Syllabus = () => {
  const data = [
    {
      awareness: "Inventions",
      ability: "Logical Venn diagram",
      knowledge: "MS Excel",
      aptitude: "Time And Distance",
    },
    {
      awareness: "Famous Places in India",
      ability: "FPuzzle test",
      knowledge: "Function and Formulas",
      aptitude: "True Discount",
    },
    {
      awareness: "Technology",
      ability: "Logical sequence test",
      knowledge: "Opening and Closing Documents",
      aptitude: "Decimal Fractions",
    },
    {
      awareness: "Important Days and Years",
      ability: "Sitting arrangement",
      knowledge: "Elements of Word Processing",
      aptitude: "Mensuration",
    },
    {
      awareness: "Indian Politics",
      ability: "Blood relationse",
      knowledge: "Communication",
      aptitude: "Percentage",
    },
    {
      awareness: "Honours and Awards",
      ability: "Data Sufficiency",
      knowledge: "Elements of Spread Sheet",
      aptitude: "Ratio And Proportion",
    },
    {
      awareness: "General Science",
      ability: "Mathematical operations",
      knowledge: "Chats, Video conferen  cing, e-Banking, etc",
      aptitude: "Average",
    },
    {
      awareness: "Sports",
      ability: "Situation reaction test",
      knowledge: "WWW and Web  Browsers",
      aptitude: "Heights and Distances",
    },
    {
      awareness: "Indian Economy",
      ability: "Numbers",
      knowledge: "Services on the Internet",
      aptitude: "H.C.F. and L.C.M of Numbers",
    },
    {
      awareness: "Indian Geography",
      ability: "Ranking & time sequence test",
      knowledge: "Editing of Cells",
      aptitude: "Triangle",
    },
    {
      awareness: "Books and Authors",
      ability: "Syllogism",
      knowledge: "Formatting the text and its presentation features",
      aptitude: "Circle",
    },
    {
      awareness: "General Knowledge",
      ability: "Inserting the missing characters",
      knowledge: "Websites, Blogs",
      aptitude: "Time And Work",
    },
    {
      awareness: "Physics",
      ability: "Alpha-numerical sequence puzzle",
      knowledge: "Basics of E-mail",
      aptitude: "Area",
    },
    {
      awareness: "Famous Personalities",
      ability: "Direction sense test",
      knowledge: "Web Browsing Software",
      aptitude: "Problems On Ages",
    },
  ];
  return (
    <>
      <div className="syllabus_wrapper">
        <div className="syllabus_container">
          <h1>
            Delhi Police Constable{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>
              Syllabus 2024
            </span>
          </h1>

          <div className="syllabus_table">
            <div className="patter-table">
              <div className="syllabus_upper">
                <h2>Delhi Police Constable Syllabus</h2>
                <p>View Full Syllabus</p>
              </div>
              <table className="custom-table syllabus-table">
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
                      <td>{item.awareness}</td>
                      <td>{item.ability}</td>
                      <td>{item.knowledge}</td>
                      <td>{item.aptitude}</td>
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

export default DelhiPolice_Syllabus;
