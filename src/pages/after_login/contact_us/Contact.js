import React, { useContext } from "react";
import "./Contact.css";

import SideBar from "../../../components/Sidebar/SideBar";
import NavBar from "../NavBar/NavBar";
import { CoursesData } from "../../../context/courses/Courses";
import { HeadProvider, Title } from "react-head";
import helpIcon1 from "../../../assets/contactUS/1.png";
import helpIcon2 from "../../../assets/contactUS/2.png";
import helpIcon3 from "../../../assets/contactUS/3.png";
import helpIcon4 from "../../../assets/contactUS/4.png";
import helpIcon5 from "../../../assets/contactUS/5.png";
import helpIcon6 from "../../../assets/contactUS/6.png";
import helpIcon7 from "../../../assets/contactUS/7.png";
import helpIcon8 from "../../../assets/contactUS/8.png";
import support from "../../../assets/contactUS/support.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import toast from "react-hot-toast";

const Contact = () => {
  const { isSidebarExpanded } = useContext(CoursesData);

  const needHelp = [
    {
      icon: helpIcon1,
      title: "Course & Enrolments ",
    },
    {
      icon: helpIcon2,
      title: "Mock Tests & Quizzes",
    },
    {
      icon: helpIcon3,
      title: "live Classes ",
    },
    {
      icon: helpIcon4,
      title: "My Doubts",
    },
    {
      icon: helpIcon5,
      title: "Orders & payments",
    },
    {
      icon: helpIcon6,
      title: "Switch Courses",
    },
    {
      icon: helpIcon7,
      title: "Account Basics",
    },
    {
      icon: helpIcon8,
      title: "Refunds",
    },
  ];

  const bgColors = [
    "#F2ECFF",
    "#FFF8E5",
    "#EEFFF0",
    "#F2ECFF",
    "#EEFFF0",
    "#F2ECFF",
    "#FFF8E5",
    "#EEFFF0",
  ];
  return (
    <>
      <HeadProvider>
        <Title>Help & Support - SD Campus </Title>
      </HeadProvider>
      <NavBar from="after-login" width={isSidebarExpanded ? 250 : 93} />
      <div>
        {" "}
        <SideBar />
        <div
          className={
            isSidebarExpanded
              ? "after-login-mid open-sidebar"
              : "after-login-mid closed-sidebar"
          }
          style={{ marginLeft: isSidebarExpanded ? "250px" : "100px" }}
        >
          <div className="contactus_wrapper">
            <div className="contactus_container">
              {/* <div className="contactus_mid">
                <div className="mid-header">
                  <h2>Recommended Videos</h2>
                  <p>View All</p>
                </div>
                <p style={{ border: "1px solid #dfdfdf" }}></p>
                <div className="mid-lower"></div>
              </div> */}
              <div className="contactus_upper">
                <div className="contactus_header">
                  <h1>Need Help</h1>
                  <p>Related to any of the below Query:</p>
                </div>
                <p style={{ border: "1px solid #efefef" }}></p>

                <div className="contactus_bottom" onClick={() =>
                  alert("Coming soon...")
                }>
                  {needHelp.map((item, index) => (
                    <div
                      className="help-box"
                      key={index}
                      style={{ background: bgColors[index] }}
                    >
                      <img src={item.icon} alt="icon" loading="lazy" />
                      <p>{item.title}</p>
                      <div className="contact-arrow-container">
                        {" "}
                        <MdKeyboardArrowRight className="contact-arrow" />
                      </div>
                    </div>
                  ))}{" "}
                </div>
              </div>

              <div className="contactus_lower">
                <div className="contactus-lower-left">
                  <h1>Have any question about the courses purchase</h1>
                  <p>our expert can answer all your questions.</p>
                  <button
                    onClick={() => {
                      window.open(
                        `https://api.whatsapp.com/send/?phone=917428394519&text=Hi&type=phone_number&app_absent=0`
                      );
                    }}
                  >
                    Chat on WhatsApp
                  </button>
                  <p>
                    <a href="tel:917428394519">
                      Call Uss <BiSolidPhoneCall />
                      917428394519
                    </a>
                  </p>
                </div>

                <div className="contactus-lower-right">
                  <img src={support} alt="support" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
