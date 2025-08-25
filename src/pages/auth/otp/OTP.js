import React, { useContext, useEffect, useRef, useState } from "react";
import login_bg from "../../../assets/login/login_pic.png";
import otp_img from "../../../assets/login/otp_img.png";
import "./OTP.css";
import { Button, CircularProgress, Typography } from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { CoursesData } from "../../../context/courses/Courses";
import Loader from "../../../components/Loader/Loader";


const OTP = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = searchParams.get("ref");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [counter, setCounter] = React.useState(5);

  // Third Attempts
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  // const [otpError, setOtpError] = useState(null);
  // const otpBoxReference = useRef([]);

  function handleChange(e) {
    setOtp(e.target.value);
  }

  function handleBackspaceAndEnter(e) {
    if (e.key === "Enter") {
      if (otp.toString().length == 6) {
        handleVerify();
      } else {
        toast.error("Enter 6 digit otp");
      }
    }
  }

  useEffect(() => {
    if (location?.state?.from !== "login") {
      navigate("/404");
    }
  }, []);



  const { verifyOtp, resendOtp } = useContext(CoursesData);

  const location = useLocation();

  const handleVerify = () => {
    if (otp.toString().length == 6) {
      verifyOtp(otp, ref);
    } else {
      toast.error("Enter 6 digit otp");
    }
  };
  const handleResend = () => {
    resendOtp(location?.state?.phone, ref);
    setCounter(30);
  };

  const navigate = useNavigate();
  return (
    <div className="otp_wrapper">
      <div className="otp_container">
        {/* {loading && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              background: "rgba(236,236,236,0.5)",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        )} */}
        <Toaster />
        <div className="otp_left">
          <img src={login_bg} />
        </div>
        <div className="otp_right">
          <div className="otp_right_img">
            <img
              src={otp_img}
              alt="otp"
              style={{
                objectFit: "cover",

                marginTop: "20px",
              }}
            />
          </div>
          <Typography
            className="otp_right_title"
            mb={4}
            sx={{ fontWeight: "600", fontSize: "28px" }}
          >
            Enter OTP
          </Typography>
          <div className="otp_right_input_container">
            <input
              type="number"
              className="otp_input_box"
              placeholder="Enter OTP..."
              onChange={(e) => handleChange(e)}
              onKeyUp={(e) => handleBackspaceAndEnter(e)}
            />
            {/*  */}
            {/* {otp.map((digit, index) => (
              <input
                key={index}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                ref={(reference) =>
                  (otpBoxReference.current[index] = reference)
                }
                className="otp_input"
              />
            ))} */}

            {/* <OutlinedInput className='otp_input' placeholder="" onChange={(e) => setOtp(prev => ({ ...prev, hundredthousands: e.target.value }))} />
                    <OutlinedInput className='otp_input' placeholder="" onChange={(e) => setOtp(prev => ({ ...prev, tenthousands: e.target.value }))} />
                    <OutlinedInput className='otp_input' placeholder="" onChange={(e) => setOtp(prev => ({ ...prev, thousands: e.target.value }))} />
                    <OutlinedInput className='otp_input' placeholder="" onChange={(e) => setOtp(prev => ({ ...prev, hundreds: e.target.value }))} />
                    <OutlinedInput className='otp_input' placeholder="" onChange={(e) => setOtp(prev => ({ ...prev, tens: e.target.value }))} />
                    <OutlinedInput className='otp_input' placeholder="" onChange={(e) => setOtp(prev => ({ ...prev, ones: e.target.value }))} /> */}
          </div>
          <div className="otp_right_register">
            <p>
              <span2 style={{ fontWeight: "500", fontSize: "12px" }}>
                {" "}
                {location?.state?.otp}{" "}
              </span2>
              <span
                style={{ cursor: "pointer", fontSize: "12px" }}
                onClick={() => {
                  navigate(`/login?ref=${ref}`);
                }}
              >
                Edit
                <AiOutlineEdit />
              </span>
            </p>
          </div>
          <div className="otp_right_button_cont">
            <Button className="otp_right_button" onClick={handleVerify}>
              Verify
            </Button>
          </div>
          <div className="otp_right_register">
            <p>
              Did not recieve the code?{" "}
              <span
                style={{
                  cursor: "pointer",
                  color: counter !== 0 ? "gray" : "",
                }}
                onClick={() => {
                  if (counter == 0) {
                    handleResend();
                  } else {
                    toast.error(`Wait ${counter} sec for resend otp`);
                  }
                }}
              >
                {" "}
                Resend OTP {counter !== 0 ? `(${counter}) ` : ""}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
