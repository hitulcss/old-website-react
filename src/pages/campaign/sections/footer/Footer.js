import React from "react";
import "./Footer.css";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="footer_camp2">
        <Wrapper>
          <div className="footer_down2">
            <div className="descrip3">
              <img src={logo} alt="logo" loading="lazy" />
              <p>
                SD Campus is Student's First Choice Learning Platform in India.
                We ensures your comprehensive exam preparation for Defence,
                Sainik School, JNV School and other competitive examinations.
              </p>

              <p>
                Copyright © {new Date().getFullYear()} SD Campus EdTech Pvt.
                Ltd. All rights reserved.
              </p>
            </div>

            <div className="company2">
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
              {/* <NavLink to="/carrier_with_us">
                <p>Carrer with Us</p>
              </NavLink>
              <NavLink to="/our_initiative">
                <p>Our Initiative</p>
              </NavLink>
              <NavLink to="/exam_info">
                <p>Online Support</p>
              </NavLink> */}
            </div>
            <div className="footer_courses2">
              <h3>Products</h3>
              <NavLink to={`/login?source=${window?.location?.href}`}>
                <p>Live Classes</p>
              </NavLink>
              <NavLink to="https://exams.sdcampus.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp">
                <p>Mock Tests</p>
              </NavLink>
              {/* <NavLink to="https://store.sdcampus.com/c/stationeries">
                <p>Stationery Items</p>
              </NavLink> */}
              <NavLink to="https://store.sdcampus.com/book">
                <p>Study Material</p>
              </NavLink>
            </div>

            <div className="other_courses2">
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
              {/* <NavLink to="">
                <p>NVS Online</p>
              </NavLink> */}
            </div>
            <div className="policies2">
              <h3>Policies</h3>
              <NavLink to="/terms-and-conditions">
                <p>Terms & Conditions</p>
              </NavLink>
              <NavLink to="/privacy-policy">
                <p>Privacy Policy</p>
              </NavLink>

              {/* <img
                src={appstore}
                alt="appstore"
                width="100px"
                style={{ cursor: "pointer" }}
              /> */}
            </div>
          </div>
          <div className="upper_part2">
            <div className="upper_left2">
              <p>FOLLOW US</p>
              <div className="socials2">
                <a
                  href="https://www.linkedin.com/company/sd-campus/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className="linkedin" />
                </a>
                <a
                  href="https://twitter.com/SdCampus?t=954CVu6lwAprPboG5ca6dw&s=09"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaXTwitter className="twitter" />
                </a>
                <a
                  href="https://www.instagram.com/sd_campus/?igshid=MzRlODBiNWFlZA%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsInstagram className="instagram" />
                </a>
                <a
                  href="https://www.youtube.com/@teachingexamssdcampus"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsYoutube className="youtube" />
                </a>
                <a
                  href="https://www.facebook.com/sdcampus1?mibextid=b06tZ0"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebookF className="facebook" />
                </a>
              </div>
            </div>
            <div className="upper_right2">
              <NavLink to="https://api.whatsapp.com/send/?phone=7428394519&text&type=phone_number&app_absent=0">
                <button>
                  {" "}
                  <FaWhatsapp className="whatsapp" />
                  Instant Support
                </button>
              </NavLink>
            </div>
          </div>
          {/* <div className="copyright">
            <hr style={{ background: "rgb(150, 3, 242)" }}></hr>
            <p style={{ textAlign: "center", paddingTop: "5px" }}>
              {" "}
              Copyright &copy; {new Date().getFullYear()} SD Empire EdTech Pvt.
              Ltd. All rights reserved.{" "}
            </p>
          </div> */}
        </Wrapper>
      </footer>
    </>
  );
};

export default Footer;
