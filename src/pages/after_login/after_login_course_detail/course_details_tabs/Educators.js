import React from "react";

const Educators = ({ course, setShowPopup, setstaffData, size, setSize }) => {
  return (
    <>
      <div>
        <div
          id="educators-course-details"
          className="course_details_educators"
          style={{ background: "white" }}
        >
          <h2
            style={{
              borderBottom: "3px solid var(--primaryColor)",
              display: "table",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            Top Educators
          </h2>

          {/* <div className="explore_heading_arrow_box">
                <div>
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
              </div> */}

          <div className="educators afterlogin-educators">
            {course?.data?.teachers?.map((item, index) => (
              <div
                className="educator_profile"
                key={index}
                style={{
                  translate: `${size}px 0px`,
                  transition: "all 0.5s",
                }}
              >
                <img src={item?.profilePhoto} alt="profile" />
                <div className="details">
                  <p className="name">{item?.name}</p>
                  {/* <p className="std_count">10 Selections</p> */}
                  <p className="sub">
                    {item?.subject.toString().split(",")[0]}
                  </p>

                  <button
                    onClick={() => {
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
      </div>
    </>
  );
};

export default Educators;
