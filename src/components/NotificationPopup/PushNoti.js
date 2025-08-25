import React from "react";
import "./PushNoti.css";
import { IoMdClose } from "react-icons/io";

const PushNoti = () => {
  return (
    <>
      <div className="push-noti-wrapper">
        {" "}
        <div className="push-noti-container">
          <div className="push-noti-upper">
            <h1>Would you like to receive push Notifications?</h1>
            <IoMdClose />
          </div>
        </div>
      </div>
    </>
  );
};

export default PushNoti;
