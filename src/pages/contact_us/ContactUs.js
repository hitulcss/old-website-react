import React from "react";
import "./Contact.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Wrapper from "../../components/Wrapper/Wrapper";
import poster1 from "../../assets/contactPoster.png";
import map from "../../assets/map.png";
import BookCounselling from "../course_details/book_counselling/BookCounselling";
import Faq from "../courses/asked_Ques/Faq";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import MyMapComponent from "./Map";
import MapContainer from "./Map";

const ContactUs = () => {
  return (
    <>

      <Navbar />
      <div className="contact_us">
        <img src={poster1} alt="contactBanner" className="contactBanner" />
        <Wrapper>
          <div className="contact_us_wrapper">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.3755278720455!2d77.35627437544399!3d28.678411181995767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb7397510b91%3A0x63e3aac142fcf376!2sSD%20CAMPUS%20Ghaziabad%20-%20Best%20Coaching%20for%20SSC%2C%20Railway%2C%20CTET%2C%20UPTET%2C%20DSSSB%2C%20UPPGT%20%26%20All%20Competitive%20Examinations!5e0!3m2!1sen!2sin!4v1716243670080!5m2!1sen!2sin"
              allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

            <div className="contact_detail">
              <div className="contact_detail_left">
                <div className="contact_detail_title">
                  <div className="detail_logo">
                    {" "}
                    {/* <MapContainer /> */}
                    <img src={icon1} alt="detailLogo" />
                  </div>

                  <p>Mail & Website</p>
                </div>
                <div className="left_contact_detail">
                  <p>
                    <span className="primary_color">Email: </span>
                    <a href="mailto:contact@sdempire.co.in">info@sdempire.co.in</a>
                  </p>
                  <p>
                    <span className="primary_color">Phone No: </span> <a href="tel: 7428394519"> +91 7428394519</a>
                  </p>
                  <p>
                    <span className="primary_color">Website: </span>
                    <a href="https://www.sdcampus.com">www.sdcampus.com</a>
                  </p>
                </div>
              </div>
              <div className="contact_detail_right">
                <div className="contact_detail_title">
                  <div className="location_logo">
                    <img src={icon2} alt="detailLogo" />
                  </div>

                  <p>Address</p>
                </div>
                <p>
                  Plot No-16, Block 7, Sector 5, Rajendra Nagar, Ghaziabad, Uttar Pradesh 201005
                </p>
              </div>
            </div>
            <div>
              <BookCounselling />
            </div>

            {/* <div className="contact_faq">
              <Faq />
            </div> */}
          </div>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
