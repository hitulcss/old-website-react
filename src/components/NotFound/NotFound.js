import React from "react";
import "./NotFound.css";
import notfoundimg from "../../assets/nocourses.svg";
import { NavLink } from "react-router-dom";

const style1 = {
  color: "var(--campSecondary)",
  borderColor: "var(--campSecondary)",
};
const style2 = {
  color: "var(--primaryColor)",
  borderColor: "var(--primaryColor)",
};

const NotFound = ({ title, from }) => {
  return (
    <>
      <div className="not_found_wrapper">
        <div className="not-found-container">
          {" "}
          <img src={notfoundimg} alt="notfound" loading="lazy"></img>
          <p className="notfound_text">No {title} Found!</p>
          <NavLink to="/">
            <button
              // className="notfound_explore"
              style={from == "campaign2" ? style1 : style2}
            >
              Explore Now
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NotFound;
