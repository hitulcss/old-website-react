import React, { useContext, useEffect, useState } from "react";
import "./CourseDetails.css";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdCalendar } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import playIcon from "../../../assets/playicon.png";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineRule } from "react-icons/md";
import { MdOutlineCampaign } from "react-icons/md";
import { MdOutlineNoteAlt } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";
import { CoursesData } from "../../../context/courses/Courses";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoCalendarOutline, IoTimer } from "react-icons/io5";
import { MdOutlineTrackChanges } from "react-icons/md";
import TeacherPopup from "../../../components/Teacher_Popup/TeacherPopup";
import CloseIcon from "@mui/icons-material/Close";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CancelIcon from "@mui/icons-material/Cancel";
import { FaFacebookSquare } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaWhatsappSquare } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import NewAccordian from "../../../components/Accordian/NewAccordian";
import BeforePurchaseClass from "./before_purchase_classes/BeforePurchaseClass";
import BeforePurchaseLecture from "./before_purchase_lecture/BeforePurchaseLecture";
import BeforePurchaseTabs from "./before_purchase_tabs/BeforePurchaseTabs";
import CourseDetailsTabs from "./course_details_tabs/CourseDetailsTabs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { MdOutlineSyncAlt } from "react-icons/md";
import ValidityPopup from "../ValidityPopup/ValidityPopup";


const CourseDetails = ({ from, list }) => {
  const { subCategorySlug } = useParams();

  const {
    getBatchDetailsById,
    course,
    getLecturesByBatchId,
    staff,
    getAllStaff,
    getBatchPlan,
    batchPlanData,
  } = useContext(CoursesData);
  const [showPopup, setShowPopup] = useState(false);
  const [size, setSize] = useState(0);

  const [count, setCount] = useState(6);
  const [staffData, setstaffData] = useState(null);

  useEffect(() => {
    //batch-details
    getBatchDetailsById(subCategorySlug);
    getLecturesByBatchId(subCategorySlug);
    getAllStaff();
    // getLecturesByBatchId(subCategorySlug);
    // setStickyNav(false);
  }, []);

  const handleClick = (to) => {
    if (to == "forward" && count <= staff?.data?.length) {
      setSize(size - 150);
      setCount(count + 1);
    } else if (to == "backward" && count > 6) {
      setSize(size + 150);
      setCount(count - 1);
    }
  };

  const validity = ["6", "12", "18", "24"];

  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("info");
  const handleClickScroll = () => {
    const element = document.getElementById("emi");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [demoVideo, setDemoVideo] = useState("");

  const [showShareModal, setShowShareModal] = useState(false);
  const [showShareModalLink, setShowShareModalLink] = useState("");

  const location = useLocation();

  const [show, setShow] = useState({
    classes: false,
    home: true,
    lecture: false,
    type: "",
  });

  //for pre-login feature navigation
  useEffect(() => {
    if (location?.state?.data) {
      if (
        location?.state?.data?.type == "community" ||
        location?.state?.data?.type == "announcement" ||
        location?.state?.data?.type == "doubt" ||
        location?.state?.data?.type == "quiz"
      ) {
        setShow({
          classes: false,
          home: false,
          lecture: true,
          type: location?.state?.data?.type,
        });
      } else {
        setShow({
          classes: true,
          home: false,
          lecture: false,
          type: location?.state?.data?.type,
        });
      }
    }
  }, [location]);

  let title = "Start preparing today ";

  //validity

  const [selectedValidity, setSelectedValidity] = useState('');

  useEffect(() => {
    if (course) {
      if (course?.data?.validities?.length > 0) {

        const isRecommendedIndex = course?.data?.validities?.findIndex((item) => item?.isRecommended)
        if (isRecommendedIndex == -1) {
          setSelectedValidity(course?.data?.validities[0])
        } else {
          setSelectedValidity(course?.data?.validities[isRecommendedIndex])
        }


        if (location?.state?.selectedValidity) {
          setSelectedValidity(location?.state?.selectedValidity);
        }
      } else {
        setSelectedValidity({
          id: "",
          salePrice: course?.data?.discount,
          regularPrice: course?.data?.amount,
        });
      }
    }
  }, [course]);

  //subject
  const [subjectId, setSubjectId] = useState(false);

  const [value, setValue] = useState(location?.data?.value ?? 0);

  //getBatchPlan
  useEffect(() => {
    if (course?.data?.id) {
      getBatchPlan({ batchId: course.data.id });
    }
  }, [course]);

  console.log('selected Validity', selectedValidity)

  return (
    <>
      <Toaster />

      {showShareModal && (
        <div className="share_modal_details" style={{ position: "fixed" }}>
          <CancelIcon
            className="share_modal_cancel"
            onClick={() => {
              setShowShareModal(false);
            }}
          />
          {/* <div className="text_share_modal">{showShareModalLink}</div> */}
          <div className="share_platforms">
            <div>
              {" "}
              <WhatsappShareButton
                url={showShareModalLink}
                title={title}
                separator=" : "
                className="Demo__some-network__share-button"
              >
                <FaWhatsappSquare className="link_share_icon share_wp" />{" "}
                Whatsapp
              </WhatsappShareButton>
            </div>
            <div>
              {" "}
              <TwitterShareButton
                url={showShareModalLink}
                title={title}
                separator=":"
                className="Demo__some-network__share-button"
              >
                <RiTwitterXFill className="link_share_icon " /> Twitter
              </TwitterShareButton>
            </div>
            <div>
              {" "}
              <FacebookShareButton
                url={showShareModalLink}
                title={title}
                separator=":"
                className="Demo__some-network__share-button"
              >
                <FaFacebookSquare className="link_share_icon  share_fb" />{" "}
                Facebook
              </FacebookShareButton>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigator.clipboard.writeText(showShareModalLink);
                toast.dismiss();
                toast.success("Copied");
              }}
            >
              {" "}
              <ContentCopyIcon className="refer_icon refer_copy_icon" /> Copy
              Link
            </div>
          </div>
        </div>
      )}
      <div>
        {show.home && (
          <div className="after_login_course_details_wrapper">
            <div className="after_login_course_details_container">
              {/* <div className="course_details_upperside">
                <div className="course_details_title">
                  <h1>{course?.data?.batchName}</h1>
                
                </div>

                <div className="course_details_tabs">
                  <p
                    style={{
                      borderBottom:
                        activeSection == "info" ? "5px solid #b042f5" : "",
                      borderRadius: "5px",
                      width: "50px",
                      textAlign: "center",
                      padding: "10px",
                    }}
                    onClick={() => {
                      const element = document.getElementById(
                        "info-course-details"
                      );
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        setActiveSection("info");
                      }
                    }}
                  >
                    Info
                  </p>
                  <p
                    style={{
                      borderBottom:
                        activeSection == "validity" ? "5px solid #b042f5" : "",
                      borderRadius: "5px",
                      width: "50px",
                      textAlign: "center",
                      padding: "10px",
                    }}
                    onClick={() => {
                      const element = document.getElementById(
                        "validity-course-details"
                      );
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        setActiveSection("validity");
                      }
                    }}
                  >
                    Validity
                  </p>
                  <p
                    style={{
                      borderBottom:
                        activeSection == "study" ? "5px solid #b042f5" : "",
                      borderRadius: "5px",
                      width: "50px",
                      textAlign: "center",
                      padding: "10px",
                    }}
                    onClick={() => {
                      const element = document.getElementById(
                        "study-course-details"
                      );
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        setActiveSection("study");
                      }
                    }}
                  >
                    Study
                  </p>
                  <p
                    style={{
                      borderBottom:
                        activeSection == "educators" ? "5px solid #b042f5" : "",
                      borderRadius: "5px",
                      width: "100px",
                      textAlign: "center",
                      padding: "10px",
                    }}
                    onClick={() => {
                      const element = document.getElementById(
                        "educators-course-details"
                      );
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        setActiveSection("educators");
                      }
                    }}
                  >
                    Educators
                  </p>
                  <p
                    style={{
                      borderBottom:
                        activeSection == "faq" ? "5px solid #b042f5" : "",
                      borderRadius: "5px",
                      width: "50px",
                      textAlign: "center",
                      padding: "10px",
                    }}
                    onClick={() => {
                      const element =
                        document.getElementById("faq-course-details");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        setActiveSection("faq");
                      }
                    }}
                  >
                    FAQ
                  </p>
                </div>
              </div> */}

              <CourseDetailsTabs
                course={course}
                setShowDemoVideo={setShowDemoVideo}
                showDemoVideo={showDemoVideo}
                demoVideo={demoVideo}
                setDemoVideo={setDemoVideo}
                selectedValidity={selectedValidity}
                setSelectedValidity={setSelectedValidity}
                show={show}
                setShow={setShow}
                setstaffData={setstaffData}
                staffData={staffData}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                setSize={setSize}
                size={size}
                setValue={setValue}
                value={value}
              />
              {/* 
              <div className="course_detail_loweside">
            
               

               
              


                <div className="course_details_faq" id="faq-course-details">
                  {course?.data?.faqs?.length > 0 && (
                    // <Faq data={course?.data?.faqs} staticData={false} />
                    <NewAccordian
                      data={course?.data?.faqs}
                      staticData={false}
                    />
                  )}
                </div>
              </div> */}
            </div>

            <div className="course_details_right_course">
              <div className="quality_course_box ">
                <div className="course_box_upper">
                  <h1 style={{ textOverflow: "ellipsis" }}>
                    {course?.data?.batchName?.slice(0, 28)}
                    {course?.data?.batchName?.length > 28 ? ".." : ""}
                  </h1>

                  <div
                    className="share_box_container"
                    onClick={() => {
                      setShowShareModal(!showShareModal);
                      setShowShareModalLink(
                        `${window.location.host}
                  /${course?.data?.categoryDetails?.slug || "category"}/${subCategorySlug || "batch-name"
                        }`
                      );
                    }}
                  >
                    <IoShareSocialOutline />
                  </div>
                </div>
                <img
                  src={course?.data?.banner}
                  alt="posterImg"
                  height={150}
                  width={400}
                  loading="lazy"
                />
                <div className="course_box_description">
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <MdOutlineTrackChanges />
                    <p>
                      Targeted Batch for {course?.data?.categoryDetails?.title}
                    </p>
                  </p>
                  {/* <p>
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
                          {course?.data?.startingDate} ||
                        </span>{" "}
                        End on
                        <span style={{ fontWeight: "600", color: "#000" }}>
                          {" "}
                          {course?.data?.endingDate}
                        </span>
                      </span>
                    </span>
                  </p> */}

                  <div className="select-validity">
                    <div>
                      <MdOutlineCalendarMonth />{" "}
                      <p>{selectedValidity?.month} months</p>
                    </div>
                    <div>
                      {batchPlanData && batchPlanData?.length > 1 && (
                        <ValidityPopup
                          data={batchPlanData}
                          subCategorySlug={subCategorySlug}
                          course={course}
                          setSelectedValidity={setSelectedValidity}
                          selectedValidity={selectedValidity}
                          from="after-login"
                        />
                      )}
                    </div>
                  </div>

                  <p className="price_discount">
                    {!course?.data?.paid && (
                      <p className="course_price">Free</p>
                    )}
                    {course?.data?.paid && (
                      <p className="course_price">
                        {/* ₹{course?.data?.discount} */}
                        <span
                          style={{
                            color: "var(--primaryColor)",
                            fontSize: "1.2rem",
                          }}
                        >
                          ₹{selectedValidity?.salePrice}
                        </span>{" "}
                        <span>
                          <del> ₹{selectedValidity?.regularPrice}</del>
                        </span>
                      </p>
                    )}

                    {course?.data?.paid && (
                      <p className="course_discount">
                        (
                        {(
                          ((selectedValidity?.regularPrice -
                            selectedValidity?.salePrice) /
                            selectedValidity?.regularPrice) *
                          100
                        ).toFixed(0)}
                        % Off)
                      </p>
                    )}
                  </p>
                </div>
                <div className="courses_buy_button">
                  <button
                    className="buy_now"
                    onClick={() => {
                      navigate(
                        `/learning/${course?.data?.categoryDetails?.slug}/${subCategorySlug}/checkout`,
                        {
                          state: {
                            selectedValidity: selectedValidity,
                          },
                        }
                      );
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {showPopup && (
              <TeacherPopup data={staffData} setShowPopup={setShowPopup} />
            )}
          </div>
        )}

        {show.classes && (
          <BeforePurchaseClass
            setShow={setShow}
            setSubjectId={setSubjectId}
            setValue={setValue}
            value={value}
            show={show}
          />
        )}
        {show.lecture && (
          <BeforePurchaseTabs
            setValue={setValue}
            course={course}
            selectedValidity={selectedValidity}
            show={show}
            setShow={setShow}
            subjectId={subjectId}
            setSubjectId={setSubjectId}
          />
        )}
        {/* {show.lecture && <BeforePurchaseLecture setShow={setShow} subjectId={subjectId} setSubjectId={setSubjectId} />} */}
      </div>
    </>
  );
};

export default CourseDetails;
