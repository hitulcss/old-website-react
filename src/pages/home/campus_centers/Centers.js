import React, { useEffect } from "react";
import "./Centers.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { MdArrowRightAlt } from "react-icons/md";
import { NavLink } from "react-router-dom";
import center from "../../../assets/centers/center.png";

const Centers = () => {
  return (
    <>
      <div className="center_container">
        <div className="center-img">
          <img alt="center" src={center} loading="lazy" />
          <div className="center_upper">
            <h1>
              Explore SD <span>Campus Offline Centers</span>
            </h1>
            <div className="center_keys">
              <p>
                <TaskAltIcon className="task-icon" />
                In-person classes & doubt solving
              </p>
              <p>
                <TaskAltIcon className="task-icon" />
                Exclusive quiet spaces for your self-study
              </p>
              <p>
                <TaskAltIcon className="task-icon" />
                Bonus access to online learning
              </p>
            </div>
            <NavLink to="/center-details">
              <button className="center-btn">
                Explore <MdArrowRightAlt className="explore_center_icon" />
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Centers;
