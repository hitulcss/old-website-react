import React, { useContext, useState } from "react";
import "./BookCounselling.css";
import counselling from "../../../assets/counselling.png";
import { FiPhoneCall } from "react-icons/fi";
import { CoursesData } from "../../../context/courses/Courses";
import { pushToDataLayer } from "../../../gtm/gtm";

const BookCounselling = () => {
  const [ctaNumber, setCtaNumber] = useState();
  const { postCTA } = useContext(CoursesData);
  const handleCTA = () => {
    postCTA({
      fullName: '',
      msg: '',
      utm_campaign: '',
      utm_source: '',
      utm_medium: '',
      phoneNumber: ctaNumber,

    });
    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "book_counselling",
      isLoggedIn: localStorage?.getItem('isLoggedIn'),
      counselling_number: ctaNumber,


    });

  };
  return (
    <>
      <div className="book_counselling_wrapper" data-aos="fade-left">
        <div className="counselling_leftside">
          <h1>Book Free Counselling Session with Experts</h1>
          <p>Enter your mobile number and recieve a call from our expert</p>
          <div className="book_call">
            <div className="call_input_box">
              +91{" "}
              <input
                type="number"
                placeholder="Mobile No."
                onChange={(e) => setCtaNumber(e.target.value)}
              />
            </div>

            <button onClick={handleCTA}>Book a Free Call</button>
            <p className="contact_call">
              <span className="or_contact">Or Contact</span>
              <span
                style={{ display: "flex", gap: "7px", alignItems: "center" }}
                className="phone_number"
              >
                <FiPhoneCall style={{ fontSize: "15px" }} />
                +91 7428394519
              </span>
            </p>
          </div>
        </div>
        <div className="counselling_rightside">
          <img src={counselling} alt="counselling" />
        </div>
      </div>
    </>
  );
};

export default BookCounselling;
