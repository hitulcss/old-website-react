import React, { useContext, useState } from "react";
import login_bg from "../../../assets/login/login_pic.png";
import "./Signup.css";
import { Button, Typography } from "@mui/material";
import logo from "../../../assets/login/logo.png";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { createBrowserHistory } from "history";
import { Toaster } from "react-hot-toast";
import { CoursesData } from "../../../context/courses/Courses";

const history = createBrowserHistory();
const Signup = () => {
  const navigate = useNavigate();
  const { register, signup } = useContext(CoursesData);
  const location = useLocation();
  const [userDetails, setUserDetails] = useState({
    // FullName: "",
    // email: "",
    // password: "",
    user_phone: "",
    // mobileNumber: "",
    // deviceName: "POCO",
    // deviceConfig: "ABC123",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    signup(userDetails, location?.state?.from);
  };

  const handleGoogleSignIn = (token) => {
    // const token = localStorage.getItem("token");
    // const authToken = token;
    const config = {
      headers: {
        "content-type": "application/json",
        // Authorization: `Bearer ${authToken}`,
      },
    };
    const data = {
      FullName: token?.name,
      email: token?.email,
      fcmToken: "",
      profile: token?.picture,
    };
    // console.log(token)
    // console.log(data)
    axios
      .post(
        // `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/googleSign`,
        `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/webContains/googleSign`,
        data,
        config
      )
      .then((res) => {
        // console.log(res)
        if (res?.data?.status) {
          localStorage.setItem("token", res?.data?.data?.accessToken);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userDetails", JSON.stringify(res?.data?.data));

          var previousPageURL = document.referrer;
          if (previousPageURL && previousPageURL.indexOf("/login") === -1) {
            history("/");
          } else {
            history.go(-1);
          }

          // navigate('/')
        }
      })
      .catch((e) => console.log(e));
  };

  // console.log(userDetails)
  return (
    <>
      <Toaster />
      {/* <ToastContainer /> */}
      <div className="login_container">
        <div className="login_left">
          <img
            src={login_bg}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>
        <div className="login_right">
          <img src={logo} alt="logo" />
          <Typography className="login_right_title">
            <span style={{ color: "#6e6e6e", fontSize: "25px" }}>
              Welcome to
            </span>{" "}
            <br />
            <span>SD Campus</span>
          </Typography>
          <div className="login_right_input_container">
            {/* <FormControl variant="outlined">
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                className="input_email"
                // id="outlined-adornment-password"
                // type={showPassword ? 'text' : 'password'}
                onChange={(e) => handleChange(e)}
                name="FullName"
                type="text"
                endAdornment={
                  <InputAdornment position="end">

                  </InputAdornment>
                }
                label="Email"
              />
            </FormControl> */}
            {/* <FormControl variant="outlined">
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                className="input_email"
                // id="outlined-adornment-password"
                // type={showPassword ? 'text' : 'password'}
                name="email"
                type="email"
                onChange={(e) => handleChange(e)}
                endAdornment={
                  <InputAdornment position="end">

                  </InputAdornment>
                }
                label="Email"
              />
            </FormControl> */}
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Phone
              </InputLabel>
              <OutlinedInput
                className="input_email"
                id="outlined-adornment-password"
                name="user_phone"
                // name="mobileNumber"
                onChange={(e) => handleChange(e)}
                type="text"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {/* <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                className="input_email"
                id="outlined-adornment-password"
                name="password"
                onChange={(e) => handleChange(e)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl> */}
          </div>
          <p className="login_forgetPassword">
            {/* <Link to  Forget Password */}
          </p>
          <div className="login_right_button_cont">
            <Button className="login_right_button" onClick={handleSubmit}>
              Sign Up
            </Button>
          </div>

          {/* <div className="login_right_sign_in_with">
            <p>───── Or Register with ─────</p>
          </div>
          <div className="login_right_google">

            <GoogleLogin
              onSuccess={credentialResponse => {

                const decoded = jwtDecode(credentialResponse?.credential)
                handleGoogleSignIn(decoded)

              }}

              onError={() => {
                console.log('Login Failed');
              }}

            />
          </div> */}
          {/* <div className="login_right_register">
            <p>
              I have an account.&nbsp;
              <span
                onClick={() => navigate("/login", {
                  state: {
                    from: 's'
                  }
                })}
                style={{ cursor: "pointer" }}
              >
                Login{" "}
              </span>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Signup;
