import React, { useContext, useEffect, useState } from "react";
import "./TopEducators.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { CoursesData } from "../../../context/courses/Courses";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import TeacherPopup from "../../../components/Teacher_Popup/TeacherPopup";
import { pushToDataLayer } from "../../../gtm/gtm";

const TopEducators = ({ from, list }) => {
  const { staff, getAllStaff } = useContext(CoursesData);

  const [showPopup, setShowPopup] = useState(false);

  const [size, setSize] = useState(0);
  const [count, setCount] = useState(6);
  const [staffData, setstaffData] = useState(null);
  // console.log("StateData", staffData)
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
  // console.log('list', list)
  // console.log('stafdf', staff)
  return (
    <>
      <div
        className="top_educators_wrapper"
        style={{ background: from === "campaign2" ? "var(--campPrimary)" : "" }}
      >
        {from == "Course Details" && (
          <>
            {" "}
            <h1 data-aos="fade-up">
              {" "}
              India's Top{" "}
              <span
                style={{
                  color:
                    from === "campaign2"
                      ? "var(--campSecondary)"
                      : "var(--primaryColor)",
                }}
              >
                Educators
              </span>{" "}
              To Learn From
            </h1>
          </>
        )}
        {from !== "Course Details" && (
          <>
            {" "}
            <div
              className="top-educator-icon"
              style={{
                color: from === "campaign2" ? "#fff" : "#000",
              }}
            >
              <h1 style={{ paddingTop: "1rem", marginTop: "2rem" }}>
                {" "}
                India's Top{" "}
                <span
                  style={{
                    color:
                      from === "campaign2"
                        ? "var(--campSecondary)"
                        : "var(--primaryColor)",
                  }}
                >
                  Educators
                </span>{" "}
                To Learn From{" "}
              </h1>
              <div className="top-educator-icon-btn">
                <KeyboardArrowLeftIcon
                  fontSize="large"
                  onClick={() => handleClick("backward")}
                  className="explore_left_icon"
                  style={{
                    color:
                      from === "campaign2" ? "var(--campSecondary)" : "#9603f2",
                    borderColor:
                      from === "campaign2" ? "var(--campSecondary)" : "#9603f2",
                  }}
                />

                <KeyboardArrowRightIcon
                  fontSize="large"
                  className="explore_right_icon"
                  onClick={() => handleClick("forward")}
                  style={{
                    color:
                      from === "campaign2" ? "var(--campSecondary)" : "#9603f2",
                    borderColor:
                      from === "campaign2" ? "var(--campSecondary)" : "#9603f2",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <div
                className="keys"
                data-aos="fade-up"
                style={{
                  color: from === "campaign2" ? "#fff" : "#000",
                }}
              >
                <p>
                  <TaskAltIcon
                    style={{
                      color:
                        from === "campaign2"
                          ? "var(--campSecondary)"
                          : "#9603f2",
                    }}
                  />
                  Result Driven Faculties
                </p>
                <p>
                  <TaskAltIcon
                    style={{
                      color:
                        from === "campaign2"
                          ? "var(--campSecondary)"
                          : "#9603f2",
                    }}
                  />
                  Vast Experience of Teaching
                </p>
                <p>
                  <TaskAltIcon
                    style={{
                      color:
                        from === "campaign2"
                          ? "var(--campSecondary)"
                          : "#9603f2",
                    }}
                  />
                  Magical Style of Teaching
                </p>
              </div>
            </div>
          </>
        )}

        {/* <div className="educators_container"> */}
        <div className="educators" data-aos="fade-up">
          {from !== "Course Details"
            ? staff?.data?.map((item, index) => (
                <div
                  className="educator_profile"
                  key={index}
                  style={{
                    translate: `${size}px 0px`,
                    transition: "all 0.5s",
                  }}
                >
                  <img src={item?.profilePhoto} alt="profile" loading="lazy" />
                  <div
                    className="details"
                    style={{
                      background:
                        from === "campaign2"
                          ? "var(--campSecondary)"
                          : "#9603f2",
                    }}
                  >
                    <p className="name">{item?.FullName}</p>
                    {/* <p className="std_count">10 Selections</p> */}
                    <p className="sub">
                      {item?.subject.toString().split(",")[0]}
                    </p>

                    <button
                      onClick={() => {
                        pushToDataLayer({
                          ecommerce: null, // Clear the previous ecommerce object.
                        });
                        pushToDataLayer({
                          event: "view_faculty",
                          isLoggedIn: localStorage?.getItem("isLoggedIn"),
                          faculty_name: item?.FullName,
                          faculty_subject: item?.subject,
                        });
                        setstaffData(item);
                        setShowPopup(true);
                      }}
                    >
                      View Details
                    </button>
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
                  <div>
                    {/* {item?.qualification} */}
                    <img
                      src={item?.profilePhoto}
                      alt="profile"
                      loading="lazy"
                    />
                  </div>

                  <div className="details">
                    <p className="name">
                      {item?.name ? item?.name : item?.FullName}
                    </p>
                    <p className="sub">
                      {item?.subject.toString().split(",")[0]}
                    </p>

                    <button
                      onClick={() => {
                        pushToDataLayer({
                          ecommerce: null, // Clear the previous ecommerce object.
                        });
                        pushToDataLayer({
                          event: "view_faculty",
                          isLoggedIn: localStorage?.getItem("isLoggedIn"),
                          faculty_name: item?.name
                            ? item?.name
                            : item?.FullName,
                          faculty_subject: item?.subject,
                        });
                        setstaffData(item);
                        setShowPopup(true);
                      }}
                    >
                      View Details
                    </button>
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

export default TopEducators;
