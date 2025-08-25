import React from "react";
import "./DelhiPolice.css";

const DelhiPolice = () => {
  return (
    <>
      <div className="delhi_police_wrapper">
        <div className="delhi_police_container">
          <h1>
            Who is a Delhi{" "}
            <span style={{ color: "rgba(228, 110, 48, 1)" }}>
              Police Constable?
            </span>
          </h1>
          <div className="dp_lower_descrip">
            <p>
              A Delhi Police Constable is a police officer whose job is to help
              keep people safe and secure in Delhi, the capital city of India.
              Their main duties include:
            </p>

            <li>
              Patrolling the streets and public areas to watch for any unlawful
              activities
            </li>
            <li>Assisting higher-ranking police officers when needed</li>
            <li>Properly collecting and handling evidence from crime scenes</li>

            <p>
              The Delhi Police Force is massive, one of the largest city police
              departments in the world. In 2024, the total number of approved
              positions for officers in the Delhi Police is 83,762. This huge
              number is needed to effectively police and protect the large
              population of the Delhi metropolitan area.
            </p>
            <p>
              Working as a Delhi Police Constable means playing an important
              frontline role in law enforcement and maintaining law and order
              for the National Capital Territory of Delhi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DelhiPolice;
