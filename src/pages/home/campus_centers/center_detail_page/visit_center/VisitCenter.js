import React from "react";
import "./VisitCenter.css";
import visitCenter from "../../../../../assets/centers/visitcenter.png";
import visit1 from "../../../../../assets/visit1.png";
import visit2 from "../../../../../assets/visit2.png";
import visit3 from "../../../../../assets/visit3.png";
import visit4 from "../../../../../assets/visit4.png";

const VisitCenter = () => {
  return (
    <>
      <div className="visitcenter_container">
        <div className="visit_left">
          <h1>Visit the centre for a personalized experience</h1>
          <div className="center_benifit_container">
            <div className="center_benifits">
              <img src={visit1} alt="visit1" loading="lazy" />
              <p>Get exclusive SD Campus goodies and swag</p>
            </div>
            <div className="center_benifits">
              <img src={visit3} alt="visit1" loading="lazy" />
              <p>Avail personal priority counseling session</p>
            </div>
            <div className="center_benifits">
              <img src={visit2} alt="visit1" loading="lazy" />
              <p>Take a tour of our tech enabled classes and library</p>
            </div>
            <div className="center_benifits">
              <img src={visit4} alt="visit1" loading="lazy" />
              <p>Attend free special classes by top mentors</p>
            </div>

            <button>Book A Counselling</button>
          </div>
        </div>
        <div className="visit_right">
          <img src={visitCenter} alt="visitcenter" loading="lazy" />
        </div>
      </div>
    </>
  );
};

export default VisitCenter;
