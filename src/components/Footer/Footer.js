import React from "react";
import "./Footer.css";
import Wrapper from "../Wrapper/Wrapper";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
// import logo from "../../assets/logo_store.png";
import logo from "../../assets/logo.png";
import playstore from "../../assets/playstore.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="main-footer">
        <Wrapper>
          {/* <div className="footer_down1">
            <div className="descrip1">
              <img src={logo} alt="logo" />
              <p>
                SD Campus is Student's First Choice Learning Platform in India.
                We ensures your comprehensive exam preparation for Defence,
                Sainik School, JNV School and other competitive examinations.
              </p>
            </div>
            <div className="call_us1">
              <h3>Call us for</h3>
              <p> Support & Counseling</p>
              <NavLink to="tel:+91 7428394524">
                <p>+91 7428394524</p>
              </NavLink>
              <NavLink to="mailto:support@sdempire.co.in">
                <p>support@sdempire.co.in</p>
              </NavLink>

              <p>(Mon to Sun 9:30AM to 6:30PM)</p>
            </div>

            <div className="company1">
              <h3>Company</h3>
              <NavLink to="/">
                <p>Home</p>
              </NavLink>
              <NavLink to="/about-us">
                <p>About Us</p>
              </NavLink>
              <NavLink to="/contact-us">
                <p>Contact Us</p>
              </NavLink>
              <NavLink to="https://blog.sdcampus.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp">
                <p>Exams</p>
              </NavLink>
            </div>
            <div className="courses1">
              <h3>Products</h3>
              <NavLink to="https://www.sdcampus.com/learning">
                <p>Live Classes</p>
              </NavLink>
              <NavLink to="https://exams.sdcampus.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp">
                <p>Mock Tests</p>
              </NavLink>

              <NavLink to="https://store.sdcampus.com/book?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp">
                <p>Study Material</p>
              </NavLink>
            </div>

            <div className="other_courses1">
              <h3>Latest Online Coaching</h3>
              <NavLink to="/tet-online-coaching">
                <p>Teaching Online</p>
              </NavLink>
              <NavLink to="/school-entrance-exams">
                <p>Sainik School</p>
              </NavLink>
              <NavLink to="/school-entrance-exams">
                <p>JNV School</p>
              </NavLink>
            </div>
            <div className="policies1">
              <h3>Policies</h3>
              <NavLink to="/terms-and-conditions">
                <p>Terms & Conditions</p>
              </NavLink>
              <NavLink to="/privacy-policy">
                <p>Privacy Policy</p>
              </NavLink>

              <NavLink
                to="https://play.google.com/store/apps/details?id=com.sdcampus.app&utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                target="_blank"
              >
                <img
                  src={playstore}
                  alt="playstore"
                  width="100px"
                  style={{ cursor: "pointer" }}
                />
              </NavLink>
            </div>
          </div>
          <div className="upper_part1">
            <div className="upper_left1">
              <p>FOLLOW US</p>
              <div className="socials1">
                <a
                  href="https://www.linkedin.com/company/sd-campus/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className="linkedin" />
                </a>
                <a
                  href="https://twitter.com/SdCampus?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaXTwitter className="twitter" />
                </a>
                <a
                  href="https://www.instagram.com/sd_campus/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsInstagram className="instagram" />
                </a>
                <a
                  href="https://www.youtube.com/@teachingexamssdcampus?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsYoutube className="youtube" />
                </a>
                <a
                  href="https://www.facebook.com/sdcampus1?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebookF className="facebook" />
                </a>
              </div>
            </div>
            <div className="upper_right1">
              <p>INSTANT SUPPORT</p>

              <NavLink to="https://api.whatsapp.com/send/?phone=7428394519&text&type=phone_number&app_absent=0">
                <FaWhatsappSquare className="whatsapp" />
              </NavLink>
            </div>
          </div>
          <div className="copyright1">
            <p style={{ border: "1px solid var(--primaryColor)" }}></p>
            <p style={{ textAlign: "center", paddingTop: "5px" }}>
              {" "}
              Copyright &copy; {new Date().getFullYear()} SD EMPIRE EDTECH
              PRIVATE LIMITED All rights reserved.{" "}
            </p>
          </div> */}

          <div className="footer-container">
            <div className="footer-upper">
              {" "}
              <div className="footer-upper-left">
                <img
                  src={logo}
                  alt="logo"
                  className="footer-logo"
                  loading="lazy"
                />
                <p>
                  The mission is to provide the best, most affordable education, making learning easier and accessible for everyone.
                </p>
                <img
                  src={playstore}
                  onClick={() => {
                    window.open(
                      `https://play.google.com/store/apps/details?id=com.sdcampus.app&utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp`
                    );
                  }}
                  alt="logo"
                  className="footer-playstore"
                  loading="lazy"
                />
                <div>
                  {" "}
                  <p className="follow">FOLLOW US:</p>
                  <div className="socials1">
                    <a
                      href="https://www.linkedin.com/company/sd-campus/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaLinkedin className="linkedin" />
                    </a>
                    <a
                      href="https://twitter.com/SdCampus?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaXTwitter className="twitter" />
                    </a>
                    <a
                      href="https://www.instagram.com/sd_campus/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsInstagram className="instagram" />
                    </a>
                    <a
                      href="https://www.youtube.com/@teachingexamssdcampus?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsYoutube className="youtube" />
                    </a>
                    <a
                      href="https://www.facebook.com/sdcampus1?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebookF className="facebook" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="footer-upper-right">
                <div className="company1">
                  <h3>Company</h3>
                  <NavLink to="/">
                    <p>Home</p>
                  </NavLink>
                  <NavLink to="/about-us">
                    <p>About Us</p>
                  </NavLink>
                  <NavLink to="/contact-us">
                    <p>Contact Us</p>
                  </NavLink>
                  <NavLink to="https://blog.sdcampus.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp">
                    <p>Exams</p>
                  </NavLink>
                </div>

                <div className="other_courses1">
                  <h3>Latest Online Coaching</h3>
                  <NavLink to="/school-entrance-exams/sainik-school">
                    <p>Sainik School</p>
                  </NavLink>
                  <NavLink to="/school-entrance-exams/jnv-school">
                    <p>JNV School</p>
                  </NavLink>
                  <NavLink to="/tet-online-coaching">
                    <p>Teaching Online</p>
                  </NavLink>

                </div>

                <div className="policies1">
                  <h3>Company Policies</h3>
                  <NavLink to="/terms-and-conditions">
                    <p>Terms & Conditions</p>
                  </NavLink>
                  <NavLink to="/terms-and-conditions">
                    <p>Return & Refund Policy</p>
                  </NavLink>
                  <NavLink to="/privacy-policy">
                    <p>Privacy Policy</p>
                  </NavLink>
                </div>

                <div className="courses1 footer-courses">
                  <h3>Courses</h3>
                  <NavLink to="https://www.sdcampus.com/learning">
                    <p>Live Classes</p>
                  </NavLink>
                  <NavLink to="https://exams.sdcampus.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp">
                    <p>Mock Tests</p>
                  </NavLink>

                  <NavLink to="https://sdpublication.com/book?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp">
                    <p>Study Material</p>
                  </NavLink>
                  {/* <p>Stationery Items</p> */}
                </div>

                <div className="courses1">
                  <h3>Our Products</h3>
                  <NavLink to="https://play.google.com/store/apps/details?id=com.sdcampus.app">
                    <p>SD Campus Learning App</p>
                  </NavLink>
                  <NavLink to="https://play.google.com/store/apps/details?id=com.sdcampus.parents">
                    <p>SD Parent App</p>
                  </NavLink>
                </div>
              </div>
            </div>
            <p
              style={{
                border: "1px solid var(--primaryColor) ",
                opacity: "30%",
              }}
            ></p>
            {/* <div className="footer-lower">
              <div className="school-enterance">
                <h3>School Entrance Books</h3>
                <p> CBSE Class 10 PYQs</p>
                <p>CBSE Class 10 PYQs</p>
                <p> CBSE Class 10 PYQs</p>
                <p>CBSE Class 10 PYQs</p>
              </div>

              <div className="testing-books">
                <h3>Teaching Exam Books</h3>
                <p> DSSSB</p>
                <p>CTET</p>
                <p> UP TEACHING</p>
                <p>KVS/NVS</p>
              </div>

              <div className="defence-books">
                <h3>Defence Exam Books</h3>
                <p> Delhi Police</p>
                <p>Police MTS Books</p>
                <p> Police MTS BooksG</p>
              </div>

              <div className="railway-books">
                <h3>Railway Exam Books</h3>
                <p> Blogs</p>
                <p>About us</p>
                <p> Contact Us</p>
              </div>

              <div className="civil-books">
                <h3>Civil Exam Books</h3>
                <p> DSSSB</p>
                <p>CTET</p>
                <p> UP TEACHING</p>
                <p>KVS/NVS</p>
              </div>
            </div>
            <p
              style={{
                border: "1px solid var(--primaryColor) ",
                opacity: "30%",
              }}
            ></p> */}
            <div className="copy-right">
              <p style={{ textAlign: "center", paddingTop: "5px" }}>
                {" "}
                Copyright &copy; {new Date().getFullYear()} SD EMPIRE EDTECH
                PRIVATE LIMITED All rights reserved.{" "}
              </p>
            </div>
          </div>
        </Wrapper>
      </footer>
    </>
  );
};

export default Footer;
