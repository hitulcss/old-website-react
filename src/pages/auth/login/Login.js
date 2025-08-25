import React, { useContext, useState } from "react";
import login_bg from "../../../assets/login/login_pic.png";
// import logo from "../../../assets/login/logo.png";
import "./Login.css";
import { Button, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { CoursesData } from "../../../context/courses/Courses";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HeadProvider, Title, Link, Meta } from "react-head";
import logo from "../../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  var previousPageURL = document.referrer;

  const [searchParams, setSearchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  const source = searchParams.get("source");

  const { login, signup } = useContext(CoursesData);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [userDetails, setUserDetails] = useState({
    // email_phoneNumber: "",
    // password: "",
    user_phone: "",
    // deviceName: "POCO",
    // deviceConfig: "ABC123",
    // fcmtoken: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    signup(userDetails, location?.state?.from, ref, source);
  };
  // console.log(userDetails)

  return (
    <div className="login_wrapper">
      <div className="login_main_container">
        <HeadProvider>
          <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
          <Meta name="viewport" content="width=device-width,initial-scale=1" />
          <Link
            rel="apple-touch-icon"
            href="https://www.sdcampus.com/logo.png"
          />
          <Link rel="manifest" href="./site.webmanifest" />
          <Title>
            SD Campus: India’s Most Affordable Ed-tech Platform for School and
            Government Entrance Examinations
          </Title>
          <Meta
            name="description"
            content="SD Campus is India’s premier online learning platform. Trusted by thousands of students, SD Campus provides quality learning programs for school students for JNV and Sainik School admission tests. Apart from that we also provide Online Coaching for various government competitive exams including SSC, Defence, Teaching, Railway, Police, etc."
          />
          <Meta name="robots" content="max-image-preview:large" />
          <Link rel="canonical" href={window.location.href} />
          <Meta property="og:locale" content="en_US" />
          <Meta property="og:site_name" content="SD Campus" />
          <Meta property="og:type" content="website" />
          <Meta
            property="og:title"
            content="SD Campus:India’s Most Affordable Ed-tech Platform for School and Government Entrance
    Examinations"
          />
          <Meta
            property="og:description"
            content="SD Campus is India’s premier online learning platform. Trusted by thousands of students, SD Campus provides quality learning programs for school students for JNV and Sainik School admission tests. Apart from that we also provide Online Coaching for various government competitive exams including SSC, Defence, Teaching, Railway, Police, etc."
          />
          <Meta
            property="og:image"
            content="https://static.sdcampus.com/assets/app_download_1732957227.png"
          />
          <Meta property="og:image:width" content="560" />
          <Meta property="og:image:height" content="292" />
          <Meta property="og:url" content={window.location.href} />
          <Meta name="twitter:card" content="summary_large_image" />
          <Meta
            name="twitter:title"
            content="SD Campus:India’s Most Affordable Ed-tech Platform for School and Government
    Entrance Examinations"
          />
          <Meta
            name="twitter:description"
            content="SD Campus is India’s premier online learning platform. Trusted by thousands of students, SD Campus provides quality learning programs for school students for JNV and Sainik School admission tests. Apart from that we also provide Online Coaching for various government competitive exams including SSC, Defence, Teaching, Railway, Police, etc."
          />
          <Meta
            name="twitter:image"
            content="https://static.sdcampus.com/assets/app_download_1732957227.png"
          />
        </HeadProvider>
        <div className="login_left">
          <img
            src={login_bg}
            alt="login_pic.png"
            onClick={() => navigate("/")}
          />
        </div>
        <Toaster />
        <div className="login_right">
          <div className="login_right_img">
            <img src={logo} alt="logo.png" />
          </div>

          <Typography className="login_right_title">
            <span style={{ color: "#6e6e6e", fontSize: "25px" }}>
              Welcome To
            </span>{" "}
            <br />
            <span>SD Campus</span>
          </Typography>
          <div className="login_right_input_container">
            <p>Please enter your mobile number to Login </p>
            <FormControl variant="outlined" className="email_input_conatiner">
              <InputLabel style={{ width: "20rem" }}>Phone</InputLabel>
              <OutlinedInput
                className="login_input_email"
                type="number"
                name="user_phone"
                onChange={(e) => handleChange(e)}
                label="number"
              />
            </FormControl>
          </div>
          {/* <p className="login_forgetPassword">Forgot Password?</p> */}
          <div className="login_right_button_cont">
            <Button className=" login_right_btn" onClick={handleSubmit}>
              Send OTP
            </Button>
          </div>
          <p
            style={{ paddingTop: "10px", margin: "0px 10px 0px 10px" }}
            className="login_bottom_text"
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
      </div>
    </div>
  );
};

export default Login;
