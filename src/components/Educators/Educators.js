import React, { useContext, useEffect, useState } from "react";
import { CoursesData } from "../../context/courses/Courses";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import TeacherPopup from "../Teacher_Popup/TeacherPopup";

const Educators = ({ from, list }) => {
  const { staff, getAllStaff } = useContext(CoursesData);

  const [size, setSize] = useState(0);
  const [count, setCount] = useState(6);

  const [showPopup, setShowPopup] = useState(false);
  const [staffData, setstaffData] = useState(null);

  const handleClick = (to) => {
    if (to == "forward" && count <= staff?.data?.length) {
      setSize(size - 150);
      setCount(count + 1);
    } else if (to == "backward" && count > 6) {
      setSize(size + 150);
      setCount(count - 1);
    }
  };

  useEffect(() => {
    getAllStaff();
  }, []);
  return (
    <>
      <div>
        <div className="">
          <KeyboardArrowLeftIcon
            fontSize="large"
            onClick={() => handleClick("backward")}
            className="explore_left_icon"
          />

          <KeyboardArrowRightIcon
            fontSize="large"
            className="explore_right_icon"
            onClick={() => handleClick("forward")}
          />
        </div>

        <div className="educators" style={{ marginTop: "3rem" }}>
          {from !== "Course Details"
            ? staff?.data?.map((item, index) => (
                <div
                  className="educator_profile"
                  key={index}
                  style={{
                    translate: `${size}px 0px`,
                    transition: "all 1s",
                  }}
                >
                  <img src={item.profilePhoto} alt="profile" loading="lazy" />
                  <div className="details">
                    <p className="name">
                      {item.name ? item?.name : item?.FullName}
                    </p>

                    <button
                      onClick={() => {
                        setstaffData(item);
                        setShowPopup(true);
                      }}
                    >
                      View Details
                    </button>
                    {/* <p className="std_count">10 Selections</p>
                <p className="sub">
                  {item.subject.toString().slice(0, 29)}{" "}
                  {item.subject.toString()?.length > 30 ? "..." : ""}
                </p> */}
                  </div>
                </div>
              ))
            : list?.map((item, index) => (
                <div
                  className="educator_profile"
                  key={index}
                  style={{
                    translate: `${size}px 0px`,
                    transition: "all 1s",
                  }}
                >
                  <img
                    src={item.profilePhoto}
                    alt="profile"
                    style={{ height: "10rem" }}
                    loading="lazy"
                  />
                  <div className="details">
                    <p className="name">
                      {item.name ? item?.name : item?.FullName}
                    </p>

                    <button
                      onClick={() => {
                        setstaffData(item);
                        setShowPopup(true);
                      }}
                    >
                      View Details
                    </button>
                    {/* <p className="std_count">10 Selections</p>
                <p className="sub">
                  {item.subject.toString().slice(0, 29)}{" "}
                  {item.subject.toString()?.length > 30 ? "..." : ""}
                </p> */}
                  </div>
                </div>
              ))}
        </div>
      </div>

      {showPopup && (
        <TeacherPopup data={staffData} setShowPopup={setShowPopup} />
      )}
    </>
  );
};

export default Educators;
