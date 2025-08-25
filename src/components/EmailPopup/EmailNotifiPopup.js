import React from "react";
import "./EmailPopup.css";
import emailIcon from "../../assets/emailpopup.png";
import { IoMdClose } from "react-icons/io";

const EmailNotifiPopup = ({ setShowPopups }) => {
  return (
    <>
      <div
        className="emailnoti-wrapper"
        data-aos="fade-left"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        <div className="emailnoti-container">
          <div className="emailnoti-upper">
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
          <div className="emailnoti-lower">
            <img src={emailIcon} alt="icon" loading="lazy" />
            <p>
              Help keep your account secure and you can reset your password if
              you ever need to. Only you will see your number.
            </p>
            <button
              className="addemail-btn"
              onClick={() =>
                setShowPopups({
                  email: false,
                  addEmail: true,
                  name: false,
                  pushNotification: false,
                })
              }
            >
              ADD E-MAIL
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailNotifiPopup;
