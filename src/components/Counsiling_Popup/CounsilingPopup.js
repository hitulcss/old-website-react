import React, { useContext, useEffect, useState } from "react";
import "./Counsiling_Popup.css";
import counsiling from "../../assets/counpopup.png";
import { FaArrowRightLong } from "react-icons/fa6";
import starImg from "../../assets/star.png";
import { CoursesData } from "../../context/courses/Courses";
import { NavLink, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const CounsilingPopup = ({ course, from, setOpen, title }) => {
  const { postCTA, getAllCategory, category } = useContext(CoursesData);

  const [searchParams, setSearchParams] = useSearchParams();
  let utm_campaign = searchParams.get("utm_campaign");
  let utm_source = searchParams.get("utm_source");
  let utm_medium = searchParams.get("utm_medium");

  useEffect(() => {
    if (utm_campaign) {
      Cookies.set("utm_campaign", utm_campaign, { expires: 7 });
    } else {
      Cookies.set("utm_campaign", "cta_form", { expires: 7 });
    }
    if (utm_source) {
      Cookies.set("utm_source", utm_source, { expires: 7 });
    } else {
      Cookies.set("utm_source", "sdcampusweb", { expires: 7 });
    }
    if (utm_medium) {
      Cookies.set("utm_medium", utm_medium, { expires: 7 });
    } else {
      Cookies.set("utm_medium", "cta_form", { expires: 7 });
    }
  }, [utm_campaign, utm_source, utm_medium]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phoneNumber: "",
    msg: "",
    category: null,
    utm_campaign: title,
    standard: "",
    utm_source: "",
    utm_medium: "",
  });

  useEffect(() => {
    setUserDetails((prev) => ({
      ...prev,
      utm_campaign: course?.batchName || title || Cookies.get("utm_campaign"),
      utm_source: course?.batchName || Cookies.get("utm_source"),
      utm_medium: Cookies.get("utm_medium"),
    }));
  }, [utm_campaign, utm_source, utm_medium]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const sendCTA = () => {
    const {
      fullName,
      phoneNumber,
      msg,
      category,

      utm_campaign,
      utm_source,
      utm_medium,
    } = userDetails;

    if (
      fullName.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      msg.trim() !== "" &&
      utm_campaign?.trim() !== "" &&
      utm_medium?.trim() !== "" &&
      utm_source?.trim() !== ""
    ) {
      if (from == "home-page" || from == "campaign") {
        localStorage.setItem("counsellingFormSubmitted", true);
        setOpen(false);
      }

      postCTA(userDetails);
      setUserDetails({
        fullName: "",
        phoneNumber: "",
        msg: "",
        category: null,
        standard: "",
        utm_campaign: title,
        utm_source: utm_source,
        utm_medium: utm_medium,
      });
    } else {
      toast.error("Fill all the required details");
    }
  };

  const classData = [
    { id: 1, name: "Sainik School" },
    { id: 2, name: "JNV School" },
    { id: 3, name: "RMC" },
    { id: 4, name: "RIMC" },
  ];

  return (
    <>
      <div className="coun-popup_wrapper">
        <div className="coun-popup_container">
          <div className="coun-popup-left">
            <div className="coun-popup-upper">
              {" "}
              <h1>Sign up for Free to</h1>
              <h2>“Aapka Selection Humari Zimmedari”</h2>
            </div>
            <div className="coun-popup-lower">
              <input
                type="text"
                placeholder="Enter Full Name Here*"
                value={userDetails.fullName}
                name="fullName"
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="Enter Your Mobile No.*"
                value={userDetails.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
              />
              {/* <select>
                <option>Select Course</option>
                <option>POLICE</option>
                <option>SSC</option>
                <option>BPSC</option>
              </select> */}
              {from !== "campaign" && category && category.data.length > 0 && (
                <select
                  id="selectBox"
                  name="category"
                  className="custom_select"
                  value={userDetails.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {category.data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              )}
              <input
                className="input_description"
                placeholder="Tell Us what you Need..."
                name="msg"
                value={userDetails.msg}
                onChange={handleChange}
              />

              <button onClick={sendCTA}>
                Try Free Classes <FaArrowRightLong />
              </button>

              <p className="tnc">
                By continuing , you agree to our
                <span className="primary_color">
                  {" "}
                  &nbsp;
                  <NavLink to="/terms-and-conditions">
                    <u className="primary_color">Terms of service</u>
                  </NavLink>
                </span>{" "}
                and
                <NavLink to="/privacy-policy">
                  <span className="primary_color">
                    &nbsp; <u>Privacy policy</u>
                  </span>
                </NavLink>
              </p>
            </div>
          </div>
          <div className="coun-popup-right">
            <img src={counsiling} alt="img" loading="lazy" />
            {/* <IoMdClose className="coun-close-icon" /> */}
          </div>
          <img
            src={starImg}
            alt="starImg"
            className="star-img"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default CounsilingPopup;
