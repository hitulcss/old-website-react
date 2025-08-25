import React, { useEffect } from "react";
import "./CenterDetail.css";
import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import VisitCenter from "./visit_center/VisitCenter";
import Result from "../../results/Result";
import Testimonial from "../../testimonial/Testimonial";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import facility1 from "../../../../assets/centers/facility1.png";
import facility2 from "../../../../assets/centers/facility2.png";
import facility3 from "../../../../assets/centers/facility3.png";
import facility4 from "../../../../assets/centers/facility4.png";
import facility5 from "../../../../assets/centers/facility5.png";
import facility6 from "../../../../assets/centers/facility6.png";
import { Parents } from "./parents/Parents";
import BookCounselling from "../../../course_details/book_counselling/BookCounselling";
import header1 from "../../../../assets/centers/header1.png";
import header2 from "../../../../assets/centers/header2.png";
import header3 from "../../../../assets/centers/header3.png";
import header4 from "../../../../assets/centers/header4.png";
import Address from "./address/Address";
import { IoIosPlayCircle } from "react-icons/io";
import { pushToDataLayer } from "../../../../gtm/gtm";

const CenterDetail = () => {
  let first = false;
  useEffect(() => {
    if (!first) {
      pushToDataLayer({
        ecommerce: null, // Clear the previous ecommerce object.
      });
      pushToDataLayer({
        event: "view_page",
        page: "Offline Center",
        isLoggedIn: localStorage?.getItem("isLoggedIn"),
        // current_stream_id: item?.id,

        ecommerce: {},
      });

      pushToDataLayer({
        ecommerce: null, // Clear the previous ecommerce object.
      });
      pushToDataLayer({
        event: "view_offline_centres",
        page: "Home Page",
        isLoggedIn: localStorage?.getItem("isLoggedIn"),
        // current_stream_id: item?.id,
      });
    }
  }, []);
  const whySD = [
    {
      title: "Top Educator From The India ",
      img: facility1,
    },
    {
      title: "Best In Class Study material",
      img: facility2,
    },
    {
      title: "Added Benefits of Online Leaning",
      img: facility4,
    },
    {
      title: "High Tech And Equipped Library",
      img: facility3,
    },
    {
      title: "User-Friendly & Easy to use Digital Experience",
      img: facility5,
    },
    {
      title: "Regular attendance updates",
      img: facility6,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="center_detail_wrapper">
        <div className="center_details_header">
          <Wrapper>
            <div className="course_header_upper">
              <h1>
                SD CAMPUS -{" "}
                <span style={{ color: "var(--primaryColor)" }}>Ghaziabad</span>
              </h1>
              <p>
                <CiLocationOn className="header_icon" />
                Plot No-16, Block 7, Sector 5, Rajendra Nagar, Ghaziabad, Uttar
                Pradesh 201005
              </p>
              <p>
                <MdOutlineLocalPhone className="header_icon" />{" "}
                <a href="tel:+917428186291">+917428186291</a>
              </p>
            </div>
            <div className="center_header_lower">
              <div className="center_header_left">
                <div className="left_img_container">
                  <div className="header_img_wrapper">
                    {" "}
                    <img src={header1} alt="header1" loading="lazy" />
                    <div className="header_img_info">
                      <p>Experience SD Campus Center</p>
                      <button>
                        <IoIosPlayCircle className="watch_video_icon" /> Watch
                        Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="center_header_right">
                <div className="right_img_container">
                  <img src={header2} alt="img" loading="lazy" />
                  <img src={header3} alt="img" loading="lazy" />
                  <img src={header2} alt="img" loading="lazy" />
                  <img src={header4} alt="img" loading="lazy" />
                </div>
              </div>
            </div>
          </Wrapper>
        </div>

        <Wrapper>
          <div className="center_why_sd">
            <h1>
              Why{" "}
              <span style={{ color: "var(--primaryColor)" }}>SD Campus?</span>
            </h1>
            <p>
              SD Campus is India’s premier learning platform for students in
              classes 6 to 12. We provide affordable access to education with a
              commitment to excellence. At SD Campus, we take pride in being
              more than just an edtech company.
            </p>

            <div className="why_sd_container">
              {whySD.map((item, index) => (
                <div className="sd_container_box" key={index}>
                  <img src={item.img} alt="img" loading="lazy" />
                  <h2>{item.title}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <VisitCenter />
          </div>

          <div>
            <Result />
          </div>

          <div>
            <Parents />
          </div>

          <div>
            <BookCounselling />
          </div>

          <div>
            <Testimonial />
          </div>

          <div>
            <Address />
          </div>

          {/* <div>
            <Faq />
          </div> */}
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default CenterDetail;
