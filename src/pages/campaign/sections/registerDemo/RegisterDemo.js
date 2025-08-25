import React, { useContext, useEffect, useState } from "react";
import "./RegisterDemo.css";
import registerDemo from "../../../../assets/campaign/demoRegister.png";
import { CoursesData } from "../../../../context/courses/Courses";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";

const RegisterDemo = ({ title }) => {
  // api function
  const { postCTA } = useContext(CoursesData);

  //utm
  const [searchParams, setSearchParams] = useSearchParams();
  let utm_campaign = searchParams.get("utm_campaign");
  let utm_source = searchParams.get("utm_source");
  let utm_medium = searchParams.get("utm_medium");

  // const { token } = useParams();
  // console.log('TOKEN', token)
  useEffect(() => {
    if (utm_campaign) {
      Cookies.set("utm_campaign", utm_campaign, { expires: 7 });
    } else {
      Cookies.set("utm_campaign", "", { expires: 7 });
    }
    if (utm_source) {
      Cookies.set("utm_source", utm_source, { expires: 7 });
    } else {
      Cookies.set("utm_source", "", { expires: 7 });
    }
    if (utm_medium) {
      Cookies.set("utm_medium", utm_medium, { expires: 7 });
    } else {
      Cookies.set("utm_medium", "", { expires: 7 });
    }

  }, [utm_campaign, utm_source, utm_medium]);

  //cta details
  const urlSearchString = window.location.search;

  const params = new URLSearchParams(urlSearchString);
  const [demoDetails, setDemoDetails] = useState({
    fullName: "",
    phoneNumber: "",
    msg: "",
    standard: "",
    category: "6516a1a4955b5c9f71c9925d",
    utm_campaign: params.get("utm_source")
      ? params.get("utm_source")
      : title,
    utm_source: params.get("utm_source")
      ? params.get("utm_source")
      : "direct_search",
    utm_medium: params.get("utm_medium")
      ? params.get("utm_medium")
      : "sdcampuswebsite",
  });

  //posting cta
  const handleSendCTA = () => {
    const { fullName, phoneNumber } = demoDetails;

    if (
      fullName.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      demoDetails?.class?.trim() !== ""
    ) {

      postCTA(demoDetails);
      setDemoDetails({
        fullName: "",
        phoneNumber: "",
        msg: "",
        standard: "",
        utm_campaign: params.get("utm_source")
          ? params.get("utm_source")
          : title,
        utm_source: params.get("utm_source")
          ? params.get("utm_source")
          : "direct_search",
        utm_medium: params.get("utm_medium")
          ? params.get("utm_medium")
          : "sdcampuswebsite",
      });
    } else {
      toast.dismiss()
      toast.error("Fill all the required details");
    }
  };

  //getting input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDemoDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Toaster />
      <div className="register_demo">
        <div className="register_demo_left">
          {/* <img src={registerDemo} alt="" /> */}
          <iframe src="https://www.youtube.com/embed/rnh0961GmJM"></iframe>
          {/* <button>Download JNV Brochure</button> */}
        </div>
        <div className="register_demo_right">
          <div className="register_right_input_container">
            <h3>Register For A FREE Demo Class</h3>
            <input
              type="text"
              placeholder="Enter Full Name Here"
              value={demoDetails?.fullName}
              name="fullName"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Enter Your Mobile No."
              value={demoDetails?.phoneNumber}
              name="phoneNumber"
              required
              onChange={handleChange}
            />
            {/* <div> */}

            <select
              name="standard"
              id="standard"
              className="select-input"
              value={demoDetails?.class}
              required
              onChange={handleChange}
            >
              <option value="" disabled selected style={{ cursor: "pointer" }}>
                Select Your Class
              </option>
              <option value="4" defaultValue="4">
                4
              </option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            {/* <input type="text" placeholder="Class" /> */}
            {/* &nbsp; */}
            {/* <input type="text" placeholder="State" /> */}
            {/* </div> */}
            <button onClick={handleSendCTA}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterDemo;
