import React from "react";
import "./USP.css";
import { FiArrowRightCircle } from "react-icons/fi";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { SlScreenSmartphone } from "react-icons/sl";
import { HiOutlineUserGroup } from "react-icons/hi2";
import circleline from "../../../assets/circleline.png";
import { useNavigate } from "react-router-dom";

const USP = () => {
  const navigate = useNavigate();
  const usp_keys = [
    "Learn With Expert Faculties & Mentors",
    "High Quality Study Material",
    "Two Way Communication Modal",
    "One-on-One Student Mentorship Program",
  ];

  return (
    <>
      <div className="usp_wrapper">
        <div className="usp_left_side" data-aos="fade-up">
          <h2>
            SD Campus{" "}
            <span style={{ color: "var(--secondaryColor)" }}>
              {" "}
              Key Features
            </span>
          </h2>
          <div className="usp-keys-container">
            {usp_keys.map((item, index) => (
              <div className="usp_keys" data-aos="fade-up">
                <FiArrowRightCircle
                  style={{ color: "var(--secondaryColor )" }}
                />
                <p key={index}>{item}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              navigate(`/school-entrance-exams`);
            }}
          >
            LEARN MORE <MdOutlineArrowRightAlt className="usp_icon" />
          </button>
        </div>
        <div className="usp_right_side" data-aos="fade-up">
          <img
            src={circleline}
            alt="circlepng"
            className="circle_line"
            loading="lazy"
          />
          <div className="circle_container">
            <h2>100%</h2>
            <p>Focus on student overall growth</p>
          </div>

          <div className="usp_right_keys">
            {" "}
            <p className="expertmentor">
              <HiOutlineUsers className="usp_right_icon" />
              Learn With Expert Faculties & Mentors
            </p>
            <p className="study_material">
              <IoLibraryOutline className="usp_right_icon" />
              High Quality Study Material
            </p>
            <p className="twoway">
              <SlScreenSmartphone className="usp_right_icon" />
              Two Way Communication Modal
            </p>
            <p className="onetoone">
              <HiOutlineUserGroup className="usp_right_icon" />
              One-on-One Student Mentorship Program
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default USP;
