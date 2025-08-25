import React, { useContext, useState } from "react";
import "../EmailPopup/EmailPopup.css";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { CoursesData } from "../../context/courses/Courses";

const NamePopup = ({ setShowPopups }) => {
  //context
  const { updateUserName } = useContext(CoursesData);

  //email state
  const [name, setName] = useState({ name: "" });

  //taking input
  const handleChange = (e) => {
    const { value } = e.target;
    setName({ name: value });
  };

  const handleKeyDown = (e) => {
    //handling enter

    if (e.key === "Enter") {
      if (name?.name !== "") {
        updateUserName(name?.name, "");
      } else {
        toast.dismiss()
        toast.error("Name can't be empty.");
      }
    }
  };

  //saving mail
  const handleSubmit = () => {
    if (name?.name !== "") {
      updateUserName(name?.name, "");
    } else {
      toast.dismiss()
      toast.error("Name can't be empty");
    }
  };
  return (
    <>
      <div
        className="addemail-popup-wrapper"
        data-aos="fade-left"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        <div className="addemail-popup-container">
          <div className="addemail-popup-upper">
            <h1>Add Your Name</h1>
            <IoMdClose
              className="noti-close-icon"
              onClick={() =>
                setShowPopups({
                  email: false,
                  addEmail: false,
                  name: false,
                  pushNotification: false,
                })
              }
            />
          </div>
          <div className="addemail-popup-lower">
            <input
              placeholder="Enter Your Name"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button className="addemail-btn" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NamePopup;
