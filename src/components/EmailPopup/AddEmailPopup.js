import React, { useContext, useState } from "react";
import "./EmailPopup.css";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { ElectricScooterTwoTone } from "@mui/icons-material";
import { CoursesData } from "../../context/courses/Courses";

const AddEmailPopup = ({ setShowPopups }) => {
  //context
  const { updateUserProfile } = useContext(CoursesData);

  //email state
  const [email, setEmail] = useState({ email: "" });

  //cheking mail
  function checkEmail(mail) {

    var filter =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(mail)) {
      // alert('Please provide a valid email address');

      return false;
    } else {
      return true;
    }
  }

  //taking input
  const handleChange = (e) => {
    const { value } = e.target;
    setEmail({ email: value });
  };

  const handleKeyDown = (e) => {
    //handling enter

    if (e.key === "Enter") {
      if (email?.email !== "") {
        if (checkEmail(email.email)) {
          updateUserProfile(email);
        } else {
          toast.error("Enter a valid Mail");
        }
      } else {
        toast.error("Email can't be a empty string");
      }
    }
  };

  //saving mail
  const handleSubmit = () => {
    if (email?.email !== "") {
      if (checkEmail(email.email)) {
        updateUserProfile(email);
        setShowPopups({
          email: false,
          addEmail: false,
          name: false,
          pushNotification: false,
        })
      } else {
        toast.error("Enter a valid Mail");
      }
    } else {
      toast.error("Email can't be a empty string");
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
            <h1>Add Your E-mail</h1>
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
              placeholder="Enter Your E-mail"
              type="email"
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

export default AddEmailPopup;
