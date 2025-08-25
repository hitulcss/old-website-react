import React, { useContext, useEffect, useState } from "react";
import "./CoursesDescription.css";
import { CoursesData } from "../../../context/courses/Courses";
import toast, { Toaster } from "react-hot-toast";
import Counselling from "../components/counselling/Counselling";

const CoursesDescription = ({ course }) => {
  const strippedString = course?.description.replace(/(<([^>]+)>)/gi, "");
  const { postCTA, getAllCategory, category } = useContext(CoursesData);

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    setUserDetails((prev) => ({
      ...prev,
      utm_campaign: course?.batchName || "direct_search",
      utm_source: course?.batchName || "sdcampus_website",
      utm_medium: "sdcampus_website",
    }));
  }, []);

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phoneNumber: "",
    msg: "",
    category: "",
    utm_campaign: "",
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
    // console.log("UU", userDetails, course,)
    if (
      fullName.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      msg.trim() !== "" &&
      category &&
      utm_campaign.trim() !== "" &&
      utm_medium.trim() !== "" &&
      utm_source.trim() !== ""
    ) {
      postCTA(userDetails);
      setUserDetails({
        fullName: "",
        phoneNumber: "",
        msg: "",
        category: "",
        utm_campaign: course?.batchName || "direct",
        utm_source: course?.batchName || "sdcampus_website",
        utm_medium: "sdcampus_website",
      });
    } else {
      toast.error("Fill all the required details");
    }
  };

  return (
    <>
      <Toaster />
      <div className="courses_description_wrapper" data-aos="fade-right">
        <div className="courses_description_container">
          <div className="course_description_left">
            <div className="course_description">
              <h1>Course Details</h1>
              <p style={{ border: "1px solid #dfdfdf", marginTop: "1rem" }}></p>
              <p dangerouslySetInnerHTML={{ __html: course?.description }}></p>
            </div>
          </div>
          <div className="course_description_right">
            <Counselling course={course} />
            {/* <div className="free_counselling">
              <div className="free_counselling_box">
                <div className="free_counselling_up">
                  <h2>Get Free Counselling</h2>
                  <p>
                    Please fill up the below form and we will contact you in
                    next 24 hours!
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

                  {category && category.data.length > 0 && (
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
                    placeholder="Tell Us what you Need..."
                    name="msg"
                    className="input_description"
                    value={userDetails.msg}
                    onChange={handleChange}
                  />
                </div>

                <p className="try_free_classes" onClick={sendCTA}>
                  Book free Demo <BsArrowRight />
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesDescription;
