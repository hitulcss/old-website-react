import React from "react";
import "./Footer.css";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import logo from "../../../../assets/logo.png";
import playstore from "../../../../assets/playstore.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <Wrapper>
          <div className="footer_down">
            <div className="descrip">
              <img src={logo} alt="logo" />
              <p>
                SD Campus is Student's First Choice Learning Platform in India.
                We ensures your comprehensive exam preparation for Defence,
                Sainik School, JNV School and other competitive examinations.
              </p>
            </div>
            {/* <div className="call_us">
              <h3>Call us for</h3>
              <p> Support & Counseling</p>
              <NavLink to="tel:+917428394524">
                <p style={{ color: "#fff" }}>+91 7428394524</p>
              </NavLink>
              <NavLink to="mailto:info@sdempire.co.in">
                <p style={{ color: "#fff" }}>info@sdempire.co.in</p>
              </NavLink>

              <p>(Mon to Sun 9:30AM to 6:30PM)</p>
            </div> */}

            <div className="company">
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
            <div className="courses-footer">
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

            <div className="other_courses">
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
            <div className="policies">
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
          <div className="upper_part">
            <div className="upper_left">
              <p>FOLLOW US</p>
              <div className="socials">
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
            <div className="upper_right">
              <p>INSTANT SUPPORT</p>

              <NavLink to="https://api.whatsapp.com/send/?phone=7428394519&text&type=phone_number&app_absent=0">
                <FaWhatsappSquare className="whatsapp" />
              </NavLink>
            </div>
          </div>
          <div className="copyright">
            <p style={{ border: "1px solid #fff" }}></p>
            <p style={{ textAlign: "center", paddingTop: "5px" }}>
              {" "}
              Copyright &copy; {new Date().getFullYear()} SD EMPIRE EDTECH
              PRIVATE LIMITED All rights reserved.{" "}
            </p>
          </div>
        </Wrapper>
      </footer>
    </>
  );
};

export default Footer;
