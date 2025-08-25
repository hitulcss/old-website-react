import React, { useContext, useState } from "react";
import "./LoginDrawer.css";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TagManager from "react-gtm-module";
import { HeadProvider, Title, Link, Meta } from "react-head";
import slideImg from "../../../assets/slide.png";
//
import { Drawer, TextField, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AiOutlineEdit } from "react-icons/ai";
import { CoursesData } from "../../../context/courses/Courses";

const LoginDrawer = () => {
  const { signup, isDrawerOpen, setDrawerOpen } = useContext(CoursesData);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  const [userDetails, setUserDetails] = useState({
    FullName: "",
    email: "",
    password: "",
    user_phone: "",
    // mobileNumber: "",
    // deviceName: "POCO",
    // deviceConfig: "ABC123",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const numberRegex = /^\d{10}$/;

    if (numberRegex.test(userDetails?.user_phone)) {
      signup(userDetails, "sidebar", ref, "login-drawer");
      setView("otp");
    } else {
      toast.error("Enter a Valid 10 digit number!");
    }
  };
  // console.log("User", userDetails)
  const tagManagerArgs = {
    dataLayer: {
      userId: userDetails,
      userProject: "project",
      page: "login",
    },
    dataLayerName: "PageDataLayer",
  };
  // console.log("Aftertri", tagManagerArgs)
  TagManager.dataLayer(tagManagerArgs);

  const [view, setView] = useState("login");

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
    if (!open) setView("login");
  };

  // const handleLogin = () => {
  //   handleSubmit()
  //   setView("otp");

  // };

  const handleOtpSubmit = () => {
    handleVerify();
    // setView("name");
  };

  //handling otp

  // const [searchParams, setSearchParams] = useSearchParams();
  // const ref = searchParams.get("ref");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [counter, setCounter] = React.useState(5);

  // Third Attempts
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  function handleChangeOtp(e) {
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

  const { verifyOtp, resendOtp } = useContext(CoursesData);

  const handleVerify = () => {
    if (otp.toString().length == 6) {
      verifyOtp(otp, window.location.origin, "sidebar");
    } else {
      toast.error("Enter 6 digit otp");
    }
  };
  const handleResend = () => {
    resendOtp(userDetails?.user_phone, ref, "sidebar");
    setCounter(30);
  };

  const navigate = useNavigate();

  //opening sidebar drawer

  let isLoggedIn = localStorage.getItem("isLoggedIn");

  // useEffect(() => {
  //   if (!isLoggedIn) { setTimeout(() => { setDrawerOpen(true) }, 4000) }
  // }, [isLoggedIn])

  return (
    <>
      <Toaster />

      <HeadProvider>
        <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
        <Meta name="viewport" content="width=device-width,initial-scale=1" />
        <Link rel="apple-touch-icon" href="https://www.sdcampus.com/logo.png" />
        <Link rel="manifest" href="./site.webmanifest" />
        <Title>
          SD Campus: India’s Most Affordable Ed-tech Platform for School and
          Government Entrance Examinations
        </Title>
        <Meta
          name="description"
          content="SD Campus is India’s premier online learning platform. Trusted by thousands of students, SD Campus provides quality learning programs for school students for JNV and Sainik School admission tests. Apart from that we also provide Online Coaching for various government competitive exams including SSC, Defence, Teaching, Railway, Police, etc."
        />
        <Meta
          name="keywords"
          content="SD, SD Campus, sdcampus, sd campus website, student's dream campus"
        />
        <Meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
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

      {/* {loading && <div style={{ position: 'absolute', width: '100%', background: 'rgba(236,236,236,0.5)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </div>} */}
      {/* <Loader /> */}
      {/* <div className="login_wrapper">
        <div className="login_main_container">
          <div className="login_left">
            <img src={login_bg} alt="login_pic.png" />
          </div>
          <div className="login_right">
            <div className="login_right_img">
              <img src={logo} alt="logo" />
            </div>
            <Typography className="login_right_title">
              {" "}
              <span style={{ color: "#6e6e6e", fontSize: "25px" }}>
                Welcome To
              </span>{" "}
              <br />
              <span>Sd Campus</span>
            </Typography>
            <div className="login_right_input_container">
              <p>Please enter your mobile number to Login </p>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Phone
                </InputLabel>
                <OutlinedInput
                  className="login_input_email"
                  id="outlined-adornment-password"
                  name="user_phone"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  label="Password"
                />
              </FormControl>
            </div>

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
                href={`${process.env.REACT_APP_URL}/privacy-policy`}
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                style={{ color: "#9603f2" }}
                href={`${process.env.REACT_APP_URL}/terms-and-conditions`}
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div> */}

      <div>
        {/* <Button variant="contained" onClick={toggleDrawer(true)}>
          Login
        </Button> */}
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          // open={true}
          onClose={toggleDrawer(false)}
          transitionDuration={{ enter: 300, exit: 300 }}
        >
          <Box
            sx={{
              width: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="login-drawwer-upper">
              {/* <img src={logo} alt="logo" width="50px" height="50px" /> */}
              <IconButton
                sx={{ alignSelf: "flex-end" }}
                onClick={toggleDrawer(false)}
              >
                <CloseIcon style={{ cursor: "pointer" }} />
              </IconButton>
            </div>

            <p style={{ border: "1px solid #000" }}></p>
            <div className="login-drawer">
              {" "}
              {view === "login" && (
                <>
                  <img src={slideImg} alt="img" />
                  {/* <img src='' alt="img" /> */}

                  <div className="login-wrapper-lower">
                    {" "}
                    <h1>
                      Welcome To{" "}
                      <span
                        style={{
                          color: "var(--primaryColor)",
                          textTransform: "uppercase",
                        }}
                      >
                        SD Campus!
                      </span>{" "}
                    </h1>
                    <p>Please enter your mobile number to Login </p>
                    <TextField
                      label="Enter Mobile Number"
                      type="number"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="outlined-adornment-password"
                      name="user_phone"
                      onChange={(e) => handleChange(e)}
                    />
                    <button className="send-otp-btn" onClick={handleSubmit}>
                      Send OTP
                    </button>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={handleLogin}
                      sx={{ marginTop: 2 }}
                    >
                      Submit OTP
                    </Button> */}
                  </div>

                  <p
                    style={{ paddingTop: "10px", margin: "0px 10px 0px 10px" }}
                    className="login_bottom_text"
                  >
                    By signing up, you agree to our{" "}
                    <a
                      style={{ color: "#9603f2" }}
                      href={`${process.env.REACT_APP_URL}/privacy-policy`}
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      style={{ color: "#9603f2" }}
                      href={`${process.env.REACT_APP_URL}/terms-and-conditions`}
                    >
                      Terms of Service
                    </a>
                  </p>
                </>
              )}
            </div>

            <div className="otp-drawer">
              {" "}
              {view === "otp" && (
                <>
                  <div className="otp-drawer-lower">
                    <img src={slideImg} alt="img" />
                    {/* <img src='' alt="img" /> */}
                    <Typography variant="h5" gutterBottom>
                      Enter OTP
                    </Typography>
                    <TextField
                      label="OTP"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      onChange={(e) => handleChangeOtp(e)}
                      onKeyUp={(e) => handleBackspaceAndEnter(e)}
                    />
                    <div
                      className="otp_right_register"
                      style={{
                        // marginBottom: "1rem",
                        marginTop: "0",
                        textAlign: "center",
                      }}
                    >
                      <p>
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: "13px",
                            color: "var(--textGray)",
                          }}
                        >
                          {" "}
                          {userDetails?.user_phone}
                          {location?.state?.otp}{" "}
                        </span>
                        <span
                          style={{ cursor: "pointer", fontSize: "12px" }}
                          onClick={() => {
                            setView("login");
                            // navigate(`/login?ref=${ref}`);
                          }}
                        >
                          Edit
                          <AiOutlineEdit />
                        </span>
                      </p>
                    </div>

                    {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOtpSubmit}
                    sx={{ marginTop: 2 }}
                  >
                    Submit OTP
                  </Button> */}

                    <button className="send-otp-btn" onClick={handleOtpSubmit}>
                      VERIFY
                    </button>
                    <div
                      className="otp_right_register"
                      style={{
                        textAlign: "center",
                        marginTop: "0px",
                        fontSize: "0.9rem",
                      }}
                    >
                      <p>
                        Did not recieve the code?{" "}
                        <span
                          style={{
                            cursor: "pointer",
                            color: counter !== 0 ? "gray" : "",
                            fontSize: "0.9rem",
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

                    <p
                      style={{
                        paddingTop: "10px",
                        margin: "0px 10px 0px 10px",
                      }}
                      className="login_bottom_text"
                    >
                      By signing up, you agree to our{" "}
                      <a
                        style={{ color: "#9603f2" }}
                        href={`${process.env.REACT_APP_URL}/privacy-policy`}
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        style={{ color: "#9603f2" }}
                        href={`${process.env.REACT_APP_URL}/terms-and-conditions`}
                      >
                        Terms of Service
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="name-drawer">
              {" "}
              {view === "name" && (
                <>
                  <div className="name-drawer-lower">
                    <img src={slideImg} alt="img" />{" "}
                    {/* <img src='' alt="img" />{" "} */}
                    <Typography variant="h5" gutterBottom>
                      Enter Your Name
                    </Typography>
                    <TextField
                      label="Name"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                    {/* <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 2 }}
                    >
                      Submit
                    </Button> */}
                    <button className="send-otp-btn">UPDATE</button>
                  </div>
                  <p
                    style={{ paddingTop: "10px", margin: "0px 10px 0px 10px" }}
                    className="login_bottom_text"
                  >
                    By signing up, you agree to our{" "}
                    <a
                      style={{ color: "#9603f2" }}
                      href={`${process.env.REACT_APP_URL}/privacy-policy`}
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      style={{ color: "#9603f2" }}
                      href={`${process.env.REACT_APP_URL}/terms-and-conditions`}
                    >
                      Terms of Service
                    </a>
                  </p>
                </>
              )}
            </div>
          </Box>
        </Drawer>
      </div>
    </>
  );
};

export default LoginDrawer;
