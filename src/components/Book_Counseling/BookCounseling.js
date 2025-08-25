import React, { useContext, useState } from "react";
import "./BookCounseling.css";
import counselling from "../../assets/counselling.png";
import { FiPhoneCall } from "react-icons/fi";
import { CoursesData } from "../../context/courses/Courses";

const BookCounseling = () => {
  const [ctaNumber, setCtaNumber] = useState();
  const { postCTA } = useContext(CoursesData);
  const handleCTA = () => {
    postCTA({ fullName: "", msg: "", phoneNumber: ctaNumber });
  };
  return (
    <>
      <div
        className="book_counselling_wrapper counseling-wrapper"
        data-aos="fade-right"
      >
        <div className="counselling_leftside counseling-left">
          <h1>Book Free Counselling Session with Experts</h1>
          <p>Enter your mobile number and recieve a call from our expert</p>
          <div className="book_call counseling-call">
            <div className="call_input_box counseling-input-box">
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
                className="phone_number counseling-phone"
              >
                <FiPhoneCall style={{ fontSize: "15px" }} />
                +91 7428394519
              </span>
            </p>
          </div>
        </div>
        <div className="counselling_rightside counseling-right">
          <img src={counselling} alt="counselling" loading="lazy" />
        </div>
      </div>
    </>
  );
};

export default BookCounseling;
