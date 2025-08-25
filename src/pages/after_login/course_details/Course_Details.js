import React from "react";
import "./Course_Details.css";
import { IoCalendarOutline, IoTimer } from "react-icons/io5";
import banner from "../../../assets/poster1.png";
import TopEducators from "../../home/topEducators/TopEducators";
import Testimonial from "../../home/testimonial/Testimonial";
import NewAccordian from "../../../components/Accordian/NewAccordian";

const Course_Details = () => {
  return (
    <>
      <div className="afterlogin_course_details_wrapper">
        <div className="afterlogin_coursedetails_upper">
          <div className="afterlogin_coursedetails_left">
            <h1>Courses Description</h1>
            <p style={{ border: "1px solid #dfdfdf" }}></p>
            <p className="courses_description">
              <ul>
                <li>
                  {" "}
                  Offline Classes held at Student's Dream Campus, Ghaziabad
                  Classes Offline Classes held at
                </li>
                <li>
                  will be taught in Hinglish medium Study Material will be
                  provided Offline Classes held at
                </li>
                <li>
                  {" "}
                  with the course Doubt will be resolved at the centre. Weekly
                  Offline Classes held at Student's Dream Campus, Ghaziabad
                  Classes test
                </li>
                <li>
                  {" "}
                  will be conduct Hostel and Mess fee is included in Batch fees
                  Offline Classes held at Student's Dream Campus, Ghaziabad
                  Classes
                </li>
                <li>
                  {" "}
                  Classes will be start from 1st February Daily Problem Practice
                  Offline Classes held at Student's Dream Campus, Ghaziabad
                  Classes
                </li>
                <li>
                  {" "}
                  will be provided after class. Featuring Exclusive Career
                  Guidance Offline Classes held at
                </li>
                <li>
                  {" "}
                  Session with Yogendra Sir Exclusive Q&A Sessions with AgniVeer
                  Offline Classes held at Student's Dream Campus, Ghaziabad
                  Classes
                </li>
                <li>
                  Experts We will cover English, Quantitative Aptitude,
                  Reasoning, Offline Classes held at
                </li>
                <li>
                  GK, Science, Physics and Computer Weekly schedule will be
                  provided Offline Classes held at
                </li>
              </ul>
            </p>
          </div>
          <div className="afterlogin_coursedetails_right">
            <div className="quality_course_box">
              <img src={banner} alt="posterImg" height={150} width={400} />
              <div className="course_box_description">
                <h1>
                  {/* {item.batchName?.slice(0, 25)}
                  {item.batchName?.length > 25 ? "..." : ""} */}
                </h1>
                <p>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <IoCalendarOutline />
                    <span>
                      Start on{" "}
                      <span style={{ fontWeight: "600", color: "#000" }}>
                        START DATE
                      </span>
                      <span style={{ fontWeight: "600", color: "#000" }}>
                        END DATE
                      </span>
                    </span>
                  </span>
                </p>
                <p className="course_duration">
                  <IoTimer /> Duration :{" "}
                  <span style={{ fontWeight: "600", color: "#000" }}>
                    DAYS Days
                  </span>
                </p>
                <p className="price_discount">
                  <p className="course_price">Free</p>

                  <p className="course_price">
                    ₹REAL PRICE
                    <span>
                      <del>PRICE</del>
                    </span>
                  </p>

                  <p className="course_discount"></p>
                </p>
              </div>
              <div className="courses_buy_button">
                <button className="buy_now">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        <section className="top_educators" style={{ padding: "1rem" }}>
          <TopEducators />
        </section>

        <div style={{ marginTop: "1rem", padding: "1rem" }}>
          <NewAccordian />
        </div>

        <div style={{ marginTop: "1rem", padding: "1rem" }}>
          <Testimonial />
        </div>
      </div>
    </>
  );
};

export default Course_Details;
