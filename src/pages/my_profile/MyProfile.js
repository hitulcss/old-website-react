import React, { useContext, useEffect, useState } from "react";
import "./MyProfile.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdAutoStories } from "react-icons/md";
import { MdOutlineCardTravel } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { HiChevronRight } from "react-icons/hi2";
import { CoursesData } from "../../context/courses/Courses";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import UpdateUserProfile from "./UpdateUserProfile/UpdateUserProfile";

const style = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "60vh",
  bgcolor: "white",
  // border: '3px solid lightgray',
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};
const MyProfile = ({ from }) => {
  const { myProfile, myProfileData } = useContext(CoursesData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn) {
      myProfile();
    } else {
      navigate(`/login?source=${window?.location?.href}`);
    }
  }, []);

  // useEffect(() => { myProfile() }, [])
  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("userDetails");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    // window.location.reload();
    toast.success("Logged Out");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      {from !== "after-login" && <Navbar />}
      <Toaster />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: '500' }}>
            Update Your Name
          </Typography> */}
          <UpdateUserProfile
            userData={myProfileData}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
      <div className="my_profile_wrapper">
        <Wrapper>
          <p style={{ fontWeight: "500" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (from == "after-login") {
                  navigate("/learning");
                } else {
                  navigate("/");
                }
              }}
            >
              Home
            </span>{" "}
            <svg
              width="12"
              height="12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#arrow_svg__a)">
                <path
                  d="M6.586 6.001 4.111 3.526l.707-.707L8 6.001 4.818 9.183l-.707-.707 2.475-2.475Z"
                  fill="#757575"
                ></path>
              </g>
              <defs>
                <clipPath id="arrow_svg__a">
                  <path fill="#fff" d="M0 0h12v12H0z"></path>
                </clipPath>
              </defs>
            </svg>{" "}
            <span className="primary_color">My Profile</span>
          </p>
          <div className="my_profile_container">
            <div className="profile_upper">
              <div className="profile_upload">
                <img
                  src={myProfileData?.profilePhoto}
                  alt="profile"
                  className="profile_upload_icon"
                  loading="lazy"
                />
              </div>

              <h3>{myProfileData?.FullName}</h3>
              <p
                style={{
                  fontWeight: "500",
                  color: "var(--textGray)",
                  marginTop: "3px",
                }}
              >
                <strong>Enroll Id:</strong> {myProfileData?.enrollId}
              </p>
            </div>
            <div className="profile_lower" onClick={() => handleOpen()}>
              <div className="lower_profile_box">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div className="lower_profile_left">
                    <FaRegCircleUser className="profile_icon" />
                  </div>
                  <div className="lower_profile_mid">
                    <p>Personal Information</p>
                    <p className="lower_descrip">
                      Edit Phone, Email, Profile Name, Address
                    </p>
                  </div>
                </div>

                <div className="lower_profile_right">
                  <HiChevronRight className="profile_icon" />
                </div>
              </div>
              <div
                className="lower_profile_box"
                onClick={() => {
                  if (from == "after-login") {
                    localStorage.setItem("index", 1);
                    navigate("/learning/my-courses");
                  } else {
                    navigate("/my-courses");
                  }
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  {" "}
                  <div className="lower_profile_left">
                    <MdAutoStories className="profile_icon" />
                  </div>
                  <div className="lower_profile_mid">
                    <p>Courses</p>
                    <p className="lower_descrip">See your enrolled courses</p>
                  </div>
                </div>{" "}
                <div className="lower_profile_right">
                  <HiChevronRight className="profile_icon" />
                </div>
              </div>
              <div
                className="lower_profile_box"
                onClick={() => {
                  if (from == "after-login") {
                    navigate("/learning/my-purchase");
                  } else {
                    navigate("/my-purchase");
                  }
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  {" "}
                  <div className="lower_profile_left">
                    <MdOutlineCardTravel className="profile_icon" />
                  </div>
                  <div className="lower_profile_mid">
                    <p>My Purchase</p>
                    <p className="lower_descrip">See your purchases courses</p>
                  </div>
                </div>{" "}
                <div className="lower_profile_right">
                  <HiChevronRight className="profile_icon" />
                </div>
              </div>
              <div className="lower_profile_box" onClick={handleLogout}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div className="lower_profile_left">
                    <MdLogout className="profile_icon" />
                  </div>
                  <div className="lower_profile_mid">
                    <p>Logout</p>
                  </div>{" "}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>

      {from !== "after-login" && <Footer />}
    </>
  );
};

export default MyProfile;
