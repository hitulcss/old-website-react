import React, { useContext, useEffect, useState } from "react";
// import "./CoursesDescription.css";
import { BsArrowRight } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { CoursesData } from "../../../../context/courses/Courses";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import { pushToDataLayer } from "../../../../gtm/gtm";

const Counselling = ({ course, from, setOpen, title }) => {
  const strippedString = course?.description.replace(/(<([^>]+)>)/gi, "");
  const { postCTA, getAllCategory, category } = useContext(CoursesData);

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
      Cookies.set("utm_campaign", Cookies.get('utm_campaign'), { expires: 7 });
    }
    if (utm_source) {
      Cookies.set("utm_source", utm_source, { expires: 7 });
    } else {
      Cookies.set("utm_source", Cookies.get('utm_source'), { expires: 7 });
    }
    if (utm_medium) {
      Cookies.set("utm_medium", utm_medium, { expires: 7 });
    } else {
      Cookies.set("utm_medium", Cookies.get('utm_medium'), { expires: 7 });
    }
  }, [utm_campaign, utm_source, utm_medium]);

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    setUserDetails((prev) => ({
      ...prev,
      utm_campaign: course?.batchName || title,
      utm_source: course?.batchName || utm_source,
      utm_medium: utm_medium,
    }));
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

      pushToDataLayer({
        ecommerce: null, // Clear the previous ecommerce object.
      });
      pushToDataLayer({
        event: "book_counselling",
        isLoggedIn: localStorage?.getItem('isLoggedIn'),
        counselling_number: phoneNumber,
        name: fullName,


      });
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
      toast.dismiss()
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
      <div className="free_counselling">
        <div
          className="free_counselling_box"
          style={{
            backgroundColor: from == "campaign" ? "rgba(10, 75, 122, 1)" : "",
          }}
        >
          <div className="free_counselling_up">
            <h2>Get Free Counselling</h2>
            <p>
              Please fill up the below form and we will contact you in next 24
              hours!
            </p>
          </div>
          <p style={{ border: "1px solid #efefef" }}></p>
          <div className="free_counselling_down">
            <input
              placeholder="Enter Full Name Here*"
              value={userDetails.fullName}
              name="fullName"
              onChange={handleChange}
            />
            <input
              placeholder="Enter Your Mobile No.*"
              type="number"
              value={userDetails.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
            />

            {from == "campaign" && (
              <select
                id="selectBox"
                name="class"
                className="custom_select"
                value={userDetails.class}
                onChange={handleChange}
              >
                <option value="">Select Exams</option>
                {classData?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
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
            {/* <div className="custom-arrow "></div>t */}
            <input
              placeholder="Tell Us what you Need..."
              name="msg"
              className="input_description"
              value={userDetails.msg}
              onChange={handleChange}
            />
          </div>
          {/* <button className="try_free_classes" onClick={sendCTA}>Try Free Classes <BsArrowRight /></button> */}
          <p
            className="try_free_classes"
            style={{
              fontSize:
                from == "home-page" || from == "campaign" ? "1.5rem" : "",
              color: from == "campaign" ? "rgba(10, 75, 122, 1)" : "",
            }}
            onClick={sendCTA}
          >
            {from == "home-page" ? "Talk to Counsellor " : "Book free Demo"}{" "}
            <BsArrowRight />
          </p>
        </div>
      </div>
    </>
  );
};

export default Counselling;
