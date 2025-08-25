import React, { useContext } from "react";
import "./UpcomingClasses.css";
import { IoMdTime } from "react-icons/io";
import notfoundimg from "../../../../assets/noclassicon.png";

const UpcomingClasses = ({ upcomingClasses }) => {
  // const { todayClasses } = useContext(CoursesData)
  return (
    <>
      <div className="today_classes_wrapper" data-aos="fade-left">
        <div className="today_classes">
          <h1>Upcoming Classes</h1>
          <p style={{ border: "1px solid #dfdfdf" }}></p>

          <div className="today_classes_container">
            {upcomingClasses?.length > 0 ? (
              upcomingClasses?.map((item, index) => (
                <div className="today_class_box" key={index}>
                  {/* <div>
                  <img
                    src={item.banner}
                    style={{ width: "150px", height: "100%" }}
                    alt="img"
                  />
                </div> */}
                  <div className="class_descrip">
                    <h2>
                      {item.lecture_title
                        ? item?.lecture_title
                        : item?.lectureTitle}
                    </h2>
                    <p>
                      <IoMdTime className="class_timimg_icon" />
                      {item.starting_date?.split(" ")[1]} to{" "}
                      {item?.ending_date?.split(" ")[1]}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="today_class_box"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  background: "#fff",
                }}
              >
                <div>
                  <img
                    src={notfoundimg}
                    style={{ width: "80px", height: "50%" }}
                    alt="img"
                  />
                </div>
                <div
                  className="class_descrip"
                  style={{ fontSize: "15px", fontWeight: "700" }}
                >
                  No Upcoming Classes
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingClasses;
