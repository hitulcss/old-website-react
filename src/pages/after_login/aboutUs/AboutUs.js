import React, { useContext } from "react";
import "./AboutUs.css";
import NavBar from "../NavBar/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import { CoursesData } from "../../../context/courses/Courses";
import { HeadProvider, Title } from "react-head";
import banner from "../../../assets/aboutusBanner.png";
import JoinUs from "../../../components/Join_us/JoinUs";

const AboutUs = () => {
  const { setSidebarExpanded, isSidebarExpanded } = useContext(CoursesData);

  const advantages = [
    {
      title: " Batch Lectures & Notes from India ‘s best Educator",
      descrip:
        "The teaching faculty of SD Campus is highly skilled and experienced. Their teaching methods emphasize conceptual clarity and practical problem-solving.",
    },
    {
      title: " Focused Content",
      descrip:
        "The platform provides well-structured and concise study material tailored for competitive exams, ensuring students focus on key concepts without getting overwhelmed.",
    },
    {
      title: "Engaging and Simplified Teaching",
      descrip:
        "SD Campus their team use simple language, humor, and relatable examples to explain complex topics, make learning enjoyable and effective.",
    },
    {
      title: "Variety of Resources",
      descrip:
        " The platform offers video lectures, live classes, doubt-solving sessions, test series, and study materials, covering all aspects of exam preparation.",
    },
    {
      title: "  Strong Community Support",
      descrip:
        "A large, active student community allows learners to share doubts, solutions, and tips, fostering collaborative learning.        ",
    },
    {
      title: "Regular Updates and Tests",
      descrip:
        " Regular assessments and updates keep students on track, helping them evaluate their performance and improve over time.",
    },
  ];

  return (
    <>
      <HeadProvider>
        <Title>About Us - SD Campus </Title>
      </HeadProvider>
      <NavBar width={isSidebarExpanded ? 250 : 93} />
      <div>
        {" "}
        <SideBar />
        <div
          className={
            isSidebarExpanded
              ? "after-login-mid open-sidebar"
              : "after-login-mid closed-sidebar"
          }
          style={{
            marginLeft: isSidebarExpanded ? "250px" : "95px",
          }}
        >
          <div className="aboutus_wrapper">
            <div className="aboutus-container">
              {" "}
              <div className="about-us-title">
                {" "}
                <h1>ABOUT US</h1>
              </div>
              <p style={{ border: "1px solid #efefef" }}></p>
              <div className="about-us-descrip">
                {" "}
                <p data-aos="fade-left">
                  SD Empire began its journey in 2018 with SD Publication and SD Campus offline centers, driven by a vision to transform education through academic excellence and holistic development. Dedicated to nurturing future leaders with integrity and dedication, SD Empire has grown into a beacon of hope for students across India.
                </p>
                <p data-aos="fade-left">
                  In 2024, SD Campus expanded into the digital realm, breaking barriers of geography and accessibility. Supported by a passionate team of experts, SD Empire stands by its motto: "Our Efforts & Your Success" emphasizing the organization's commitment to every student's journey.
                </p>
                <p data-aos="fade-left">
                  The place where unshakeable dedication and academic
                  achievement collide! Founded with the goal of revolutionising
                  the educational experience, we are proud of our outstanding
                  faculty and innovative approach to content that equips
                  students to succeed in any exam.
                </p>
              </div>
            </div>
            <figure>
              <img src={banner} alt="banner" loading="lazy" />
            </figure>

            <div className="aboutus-container" style={{ marginTop: "1rem" }}>
              {" "}
              <div className="about-us-title">
                {" "}
                <h1>The Advantage of SD Campus </h1>
              </div>
              <p style={{ border: "1px solid #efefef" }}></p>
              <div className="about-us-descrip">
                {advantages.map((item, index) => (
                  <div key={index} className="inner-about-descrip">
                    <h2>
                      {item.title} : <span>{item.descrip}</span>
                    </h2>
                  </div>
                ))}
              </div>
            </div>
            <JoinUs />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
