import React, { useContext } from "react";
import "./Shishak.css";
import banner from "../../../assets/shishakBanner.png";
import { MdOutlineMapsUgc } from "react-icons/md";
import { IoMdAlarm } from "react-icons/io";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import mentorImg from "../../../assets/connectMentor.png";
import step1 from "../../../assets/step1.png";
import step2 from "../../../assets/step2.png";
import step3 from "../../../assets/step3.png";
import arrowIcon from "../../../assets/shishakArrow.png";
import Wrapper from "../../../components/Wrapper/Wrapper";
import TopEducators from "../../home/topEducators/TopEducators";
import referCoin from "../../../assets/coin1.png";
import { GoGift } from "react-icons/go";
import { MdContentCopy } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoPlayOutline } from "react-icons/io5";
import NavBar from "../NavBar/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import { CoursesData } from "../../../context/courses/Courses";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "@mui/material";
import { WhatsappShareButton } from "react-share";
import NewAccordian from "../../../components/Accordian/NewAccordian";

const Shishak = () => {
  const { setSidebarExpanded, isSidebarExpanded } = useContext(CoursesData);
  const referralCode = JSON.parse(localStorage?.getItem("details"));

  const title =
    "🌟 Exciting news! Discovered SD Campus App - top-notch courses & online bookstore. 📚 Join using my code ODCTZOOI  for exclusive benefits! Let's boost our learning journey together! 🚀 ";
  const shareUrl = "https://sdcampus.onelink.me/rnhk/SDCampusApp";

  const mentors = [
    {
      img: mentorImg,
      batchName: "अग्निवीर 2024 Army Air Force Navy",
    },
    {
      img: mentorImg,
      batchName: "अग्निवीर 2024 Army Air Force Navy",
    },
    {
      img: mentorImg,
      batchName: "अग्निवीर 2024 Army Air Force Navy",
    },
  ];

  return (
    <>
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
          {" "}
          <div className="shishak_wrapper">
            <div className="shishak_container">
              <div className="shishak_banner">
                <img src={banner} alt="banner" />
              </div>

              <div className="shishak_subs_section">
                <div className="shishak_subs_container">
                  <div className="shishak_subs_upper">
                    {" "}
                    <h1>
                      !! Your{" "}
                      <span style={{ color: "var(--primaryColor)" }}>
                        Apna Shikshak
                      </span>{" "}
                      is just one click away !!
                    </h1>
                    <p>
                      Connect live with your Shikshak mentor for a comprehensive
                      handholding experience.
                    </p>
                  </div>

                  <div className="shishak_subs_lower">
                    <div className="lower_facilities">
                      <div className="shakti_facilities">
                        <div className="facility_icon_container">
                          {" "}
                          <MdOutlineMapsUgc className="facility_icon" />
                        </div>
                        <p>Ask Unlimited Doubts</p>
                      </div>
                      <div className="shakti_facilities">
                        <div className="facility_icon_container">
                          <IoMdAlarm className="facility_icon" />
                        </div>
                        <p>Get Expert Resolution in 12 Hours*</p>
                      </div>
                      <div className="shakti_facilities">
                        <div className="facility_icon_container">
                          {" "}
                          <MdOutlineWorkspacePremium className="facility_icon" />
                        </div>
                        <p>Find High Quality Answers to Your Doubts</p>
                      </div>
                    </div>

                    <button>SUBSCRIBE NOW</button>
                    <p>“Resolution in 8 working hours(Mon-Sat, 10AM-6PM)”</p>
                  </div>
                </div>
              </div>

              <div className="connect_mentor">
                <h1>Batch-Wise Connect Our Mentors</h1>

                <div className="connect_mentor_container">
                  {mentors.map((item, index) => (
                    <>
                      {" "}
                      <div className="batches_box" key={index}>
                        <img src={item.img} alt="" />
                        <p style={{ fontWeight: "600" }}>{item.batchName}</p>
                        <p style={{ border: "1px solid #dfdfdf" }}></p>
                        <button>Choose Mentor</button>
                      </div>
                    </>
                  ))}
                </div>
              </div>

              <div className="how_works">
                <h1>How Shikshak Works?</h1>
                <p
                  style={{ border: "1px solid #dfdfdf", marginTop: "10px" }}
                ></p>
                <div className="how_works_container">
                  <div className="step1">
                    <img src={step1} alt="" />
                    <div className="step_lower">
                      <h2>Step - 01</h2>
                      <p>Select the Subject on which you have doubt.</p>
                    </div>
                  </div>
                  <img src={arrowIcon} alt="" className="shishak_arrow" />
                  <div className="step2">
                    <img src={step2} alt="" />
                    <div className="step_lower">
                      <h2>Step - 02</h2>
                      <p>Select the Subject on which you have doubt.</p>
                    </div>
                  </div>
                  <img src={arrowIcon} alt="" className="shishak_arrow" />
                  <div className="step3">
                    <img src={step3} alt="" />
                    <div className="step_lower">
                      <h2>Step - 03</h2>
                      <p>Select the Subject on which you have doubt.</p>
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "0.9rem",
                          color: "var(--primaryColor)",
                        }}
                      >
                        <IoPlayOutline />
                        <p
                          style={{
                            borderBottom: "1px solid black",
                            cursor: "pointer",
                          }}
                        >
                          Play Demo
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <section className="top_educators">
                <Wrapper>
                  <TopEducators />
                </Wrapper>
              </section>

              {/* <div className="shishak_refer_earn">
                <div className="shishak_refer_earn_container">
                  <div className="shishak_refer_earn_upper">
                    <div className="shishak_upper_left">
                      <div className="refer_gift_container">
                        <GoGift className="gift_icon" />
                        <p>REFER AND EARN</p>
                      </div>
                      <h2>Learn Together. Earn Together</h2>
                      <p>
                        Invite your Friends to join Sd Campus. You get upto 20%
                        of the purchase amount as Paytm cashback on your
                        friend’s purchase. Your friends get upto 10% discount on
                        their purchase with your code
                      </p>
                    </div>
                    <div className="shishak_upper_right">
                      <img src={referCoin} alt="refercoin" />
                    </div>
                  </div>
                  <div className="shishak_refer_earn_lower">
                    <div className="shishak_code_copy">
                      <p>SDV23Z</p>
                      <MdContentCopy />
                    </div>
                    <div className="shishak_invite">
                      <FaWhatsapp />
                      <p>Invite Your Friends</p>
                    </div>
                    <div className="shishak_share_icon">
                      <IoShareSocialOutline />
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="shishak_refer_earn">
                <div className="shishak_refer_earn_container">
                  <div
                    className="shishak_refer_earn_upper"
                    style={{ background: "#fff" }}
                  >
                    <div className="shishak_upper_left">
                      <div
                        className="refer_gift_container"
                        style={{ marginBottom: "10px" }}
                      >
                        <GoGift className="gift_icon" />
                        <p>REFER AND EARN</p>
                      </div>
                      <h2>Learn Together. Earn Together</h2>
                      <p>
                        Share app to your friends to learn and crack the exam
                        For every successful referral win up to 21 INR & your
                        friend will get 51 INR.
                      </p>
                    </div>
                    <div className="shishak_upper_right">
                      <img src={referCoin} alt="refercoin" />
                    </div>
                  </div>
                  <div className="shishak_refer_earn_lower home_refer_earn">
                    <div className="home_code_copy">
                      <p>{referralCode?.myReferralCode}Copy</p>
                      <Tooltip title="Copy">
                        <MdContentCopy
                          onClick={() => {
                            navigator.clipboard.writeText(
                              referralCode?.myReferralCode
                            );
                            toast.success("Copied");
                          }}
                        />
                      </Tooltip>
                    </div>
                    <WhatsappShareButton
                      url={shareUrl}
                      title={title}
                      separator="Download Now : "
                      className="Demo__some-network__share-button"
                    >
                      <div className="home_invite">
                        <FaWhatsapp className="refer_wp_icon refer_icon" />
                        <p>Invite Your Friends</p>
                      </div>
                    </WhatsappShareButton>
                    <div className="home_share_icon">
                      <IoShareSocialOutline />
                    </div>
                  </div>
                </div>
              </div>

              <div className="shishak_faq">
                <NewAccordian />
              </div>

              <div className="subscription_lower"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shishak;
