import React, { useContext, useEffect, useState } from "react";
import login_bg from "../../../assets/login/login_pic.png";
// import logo from "../../../assets/login/logo.png";
import "./NameUpdate.css";
import { Button, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { CoursesData } from "../../../context/courses/Courses";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import logo from "../../../assets/logo.png";

const NameUpdate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const { updateUserName } = useContext(CoursesData);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [userDetails, setUserDetails] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(value);
    // setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    updateUserName(userDetails, ref);
  };
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/login?source=${window?.location?.href}`);
    }
  });
  // console.log(userDetails)

  return (
    <div className="nameupdate_wrapper">
      <div className="nameupdate_container">
        <div className="nameupdate_left">
          <img src={login_bg} alt="logo" />
        </div>
        <Toaster />
        <div className="nameupdate_right">
          <div className="nameupdate_right_img">
            <img src={logo} alt="logo" />
          </div>
          <div className="nameupdate-lower-container">
            <Typography className="nameupdate_right_title">
              <span style={{ color: "#6e6e6e", fontSize: "25px" }}>
                Welcome to
              </span>{" "}
              <br />
              <span>SD Campus</span>
            </Typography>
            <div className="nameupdate_right_input_container">
              <p>Please enter your name </p>
              <FormControl variant="outlined" className="email_input_conatiner">
                <InputLabel style={{ width: "20rem" }}>Name</InputLabel>
                <OutlinedInput
                  className="nameupdate_input_email"
                  type="text"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  // label="number"
                />
              </FormControl>
            </div>
            {/* <p className="nameupdate_forgetPassword">Forgot Password?</p> */}
            <div className="nameupdate_right_button_cont">
              <Button className="nameupdate_right_btn" onClick={handleSubmit}>
                Update
              </Button>
            </div>
            <p
              style={{ paddingTop: "10px", margin: "0px 10px 0px 10px" }}
              className="nameupdate_bottom_text"
            >
              By signing up, you agree to our{" "}
              <a
                style={{ color: "#9603f2" }}
                href="https://www.sdcampus.com/privacy-policy"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                style={{ color: "#9603f2" }}
                href="https://www.sdcampus.com/terms-and-conditions"
              >
                Terms of Service
              </a>
            </p>
          </div>

          {/* <div className="login_right_sign_in_with">
          <p>───── or sign in with ─────</p>
        </div>
        <div className="login_right_google">
          <img src={googleIcon} alt="google" />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default NameUpdate;
