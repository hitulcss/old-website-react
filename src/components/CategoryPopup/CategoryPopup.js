import React, { useContext, useEffect, useState } from "react";
import "../EmailPopup/EmailPopup.css";
import { IoMdClose } from "react-icons/io";
import "../CategoryPopup/CategoryPopup.css";
import { CoursesData } from "../../context/courses/Courses";

const CategoryPopup = ({ setShowPopups }) => {
  //context data
  const { getAllCategory, category, updateUserStream } =
    useContext(CoursesData);

  //selected category stream
  const [selectedStream, setSelectedStream] = useState();

  //api call
  useEffect(() => {
    getAllCategory();
  }, []);

  //setting category
  const handleStreamList = (data) => {
    setSelectedStream(data?.name);
  };

  //handle confirm
  const handleConfirm = () => {
    updateUserStream(selectedStream);
  };
  return (
    <>
      {" "}
      <div
        className="emailnoti-wrapper "
        data-aos="fade-left"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        <div className="emailnoti-container">
          <div className="emailnoti-upper">
            <h1>Choose Your Category</h1>
            <IoMdClose
              className="noti-close-icon"
              //   onClick={() =>
              //     setShowPopups({
              //       email: false,
              //       addEmail: false,
              //       name: false,
              //       pushNotification: false,
              //     })
              //   }
            />
          </div>
          <div className="emailnoti-lower">
            {/* <img src={emailIcon} alt="icon" loading="lazy"/> */}
            <div className="category-list">
              {category?.data?.map((item, index) => {
                // console.log(selectedStream);
                // console.log(item?.name);
                // console.log(item?.name == selectedStream);
                return (
                  <p
                    onClick={() => {
                      handleStreamList(item);
                    }}
                    key={index}
                    className={`${
                      item?.name == selectedStream ? "selected-stream" : ""
                    }`}
                  >
                    {item?.name}
                  </p>
                );
              })}
            </div>
            <button
              className="addemail-btn"
              onClick={() => {
                handleConfirm();
                setShowPopups({
                  category: false,
                  email: false,
                  addEmail: true,
                  name: false,
                  pushNotification: false,
                });
              }}
              //   onClick={() =>
              //     setShowPopups({
              //       email: false,
              //       addEmail: true,
              //       name: false,
              //       pushNotification: false,
              //     })
              //   }
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPopup;
