import React, { useContext, useEffect, useState } from "react";
import "./CourseDetails.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import DiscountBanner from "./discount_banner/DiscountBanner";
import CoursesDescription from "./courses_description/CoursesDescription";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { CoursesData } from "../../context/courses/Courses";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TopEducators from "../home/topEducators/TopEducators";
import { HeadProvider, Title, Link, Meta } from "react-head";
import EMI_Plan from "./emi_plan/EMI_Plan";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import BookBox from "../../components/Book_box/BookBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import NewAccordian from "../../components/Accordian/NewAccordian";
import { pushToDataLayer } from "../../gtm/gtm";
import Cookies from "js-cookie";
import TestimonialNew from "../home/testimonial/TestimonialNew";
import lectureImg from "../../assets/lecture_default.jpg";
import ValidityModal from "../after_login/ValidityPopup/ValidityPopup";

const CourseDetails = ({ from_after }) => {
  const [fullContentVisible, setFullContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setFullContentVisible(!fullContentVisible);
  };

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 400;

      setIsFixed(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const {
    getBatchDetailsById,
    course,
    getLecturesByBatchId,
    lectures,
    setStickyNav,
    freePurchaseCourses,
    ebooks,
    getEbooks,
    storeProducts,
    getAllStoreProduct,
    setDrawerOpen,
    getBatchPlan,
    batchPlanData,
  } = useContext(CoursesData);

  useEffect(() => {
    getEbooks({ page: 1, size: 25 });
  }, []);

  // console.log("Course", course);

  //slugs from url
  const { Id, subCategorySlug, slug } = useParams();

  // console.log("Bacth Slug", subCategorySlug);
  const location = useLocation();
  useEffect(() => {
    getBatchDetailsById(subCategorySlug);
    getLecturesByBatchId(subCategorySlug);
    setStickyNav(false);
  }, []);

  // console.log(location)
  const navigate = useNavigate();
  const payModal = location?.state?.payModal;
  const [open, setOpen] = useState(payModal ? payModal : false);
  const handleClickOpen = (from) => {
    if (localStorage.getItem("isLoggedIn")) {
      setOpen(true);
    } else {
      Cookies.set("utm_source", "sdcampusweb");
      Cookies.set("utm_medium", `${window.location.href}`);
      Cookies.set("utm_campaign", `${window.location.href}`);
      setDrawerOpen(true);
      // navigate(`/login?ref=${window.location.href}`);
    }
  };

  // const strippedString = course?.data?.description.replace(/(<([^>]+)>)/gi, "");

  const handleClickScroll = () => {
    // const element = document.getElementById("emi");
    // if (element) {
    //   element.scrollIntoView({ behavior: "smooth" });
    // }
  };

  const handleClickScrollForCallback = () => {
    // const element = document.getElementById("course_desc");
    // if (element) {
    //   element.scrollIntoView({ behavior: "smooth" });
    // }
  };
  const [from, setFrom] = useState("");
  const [emiInstallment, setEmiInstallment] = useState(0);

  const [openYT, setYTOpen] = React.useState(false);
  const [demoLink, setDemoLink] = React.useState("");
  const [lectTitle, setlectTitle] = React.useState("");
  const handleOpen = () => setYTOpen(true);
  const handleClose = () => setYTOpen(false);

  const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: 380,
    // backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: 24,
  };

  //api call for products(Books)
  useEffect(() => {
    if (course) {
      getAllStoreProduct("", "categoryFilter", 1, 9, course?.data?.stream);
    }
  }, [course]);

  let first = false;
  useEffect(() => {
    if (!first) {
      // console.log({
      //   event: "view_page",
      //   page: "Batch details",
      //   // current_stream_id: item?.id,

      //   ecommerce: {},
      // });
      pushToDataLayer({
        ecommerce: null, // Clear the previous ecommerce object.
      });
      pushToDataLayer({
        event: "view_page",
        page: "Batch details",
        isLoggedIn: localStorage?.getItem("isLoggedIn"),
        // current_stream_id: item?.id,

        ecommerce: {},
      });
    }
  }, []);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBatchFeature = (data) => {
    if (localStorage.getItem("isLoggedIn")) {
      localStorage.setItem("index", 0);
      navigate(`/learning/${slug}/${subCategorySlug}`, {
        state: {
          data: {
            value: 1,
            type: data?.type,
          },
        },
      });
    } else {
      Cookies.set("utm_medium", window?.location?.href);
      Cookies.set("utm_source", window?.location?.href);
      setDrawerOpen(true);
    }
  };

  //getBatchPlan
  useEffect(() => {
    if (course?.data?.id) {
      getBatchPlan({ batchId: course.data.id });
    }
  }, [course]);

  const [validityState, setValidityState] = useState(true);


  const controls = {
    volume: { volumeProgress: true, volumeLogo: true },
    forward: true,
    backward: true,
    play: true,
    progressBar: true,
    settings: true,
    expand: true

  }

  return (
    <>
      <HeadProvider>
        <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
        <Meta name="viewport" content="width=device-width,initial-scale=1" />
        <Link rel="apple-touch-icon" href="https://www.sdcampus.com/logo.png" />
        <Link rel="manifest" href="https://www.sdcampus.com/site.webmanifest" />
        <Title>{course?.data?.batchName}</Title>
        <Meta name="description" content={course?.data?.batchName} />
        <Meta name="keywords" content={course?.data?.batchName} />
        <Meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <Link rel="canonical" href={window.location.href} />
        <Meta property="og:locale" content="en_US" />
        <Meta property="og:site_name" content="SD Campus" />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content={course?.data?.batchName} />
        <Meta property="og:description" content={course?.data?.batchName} />
        <Meta property="og:image" content={course?.data?.banner} />
        <Meta property="og:image:width" content="560" />
        <Meta property="og:image:height" content="292" />
        <Meta property="og:url" content={window.location.href} />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:title" content={course?.data?.batchName} />
        <Meta name="twitter:description" content={course?.data?.batchName} />
        <Meta name=" twitter:image" content={course?.data?.banner} />
      </HeadProvider>
      {from_after !== "after-login" && <Navbar from="courseDetails" />}
      <div className="course_details_wrapper">
        <Wrapper>
          <div className="course_details_upper_header">
            <div className="course_details_leftside">
              <LazyLoadImage
                src={course?.data?.banner}
                alt="detailbanner"
                style={{ objectFit: "cover", width: "100%" }}
                effect="blur"
              />
            </div>
            <div className="course_details_rightside">
              <h1>
                {course?.data?.batchName} <span>({course?.data?.batchId})</span>
              </h1>
              <div>
                <p className="details_batch">
                  <span>Targeted For : </span>
                  {course?.data?.subCategories?.map((item, index) => (
                    <span key={index}>
                      {item?.title}
                      {index !== course.data.subCategories.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>

              <div className="course-detail-facility">
                {/* <div>
                  {" "}
                  <Tooltip
                    title={
                      <span style={{ fontSize: "0.875rem", color: "#fff" }}>
                        Batch Starts
                      </span>
                    }
                    placement="top"
                    arrow
                  >
                    <div className="batch_educator">
                      <div className="batch_educator_container">
                        <FaRegCalendarAlt className="course_detail_icon" />
                      </div>
                      <div className="batch-edu-details">
                        <p>Batch Starts On</p>
                        <p className="batch-edu-lower">
                          {course?.data?.startingDate}
                        </p>
                      </div>
                    </div>
                  </Tooltip>
                  <Tooltip
                    title={
                      <span style={{ fontSize: "0.875rem", color: "#fff" }}>
                        Top Educators
                      </span>
                    }
                    placement="top"
                    arrow
                  >
                    {" "}
                    <div className="batch_educator">
                      <div className="batch_educator_container">
                        <MdOutlineAssignmentInd className="course_detail_icon" />
                      </div>
                      <div className="batch-edu-details">
                        <p>Top Educators</p>
                        <p className="batch-edu-lower">
                          {course?.data?.teachers[0]?.name},{" "}
                          <span
                            className="more-teachers"
                            onClick={() => {
                              const element =
                                document.getElementById("more-teacher");
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                          >
                            More...
                          </span>
                        </p>
                      </div>
                    </div>
                  </Tooltip>
                  <Tooltip
                    title={
                      <span style={{ fontSize: "0.875rem", color: "#fff" }}>
                        Batch Validity
                      </span>
                    }
                    placement="top"
                    arrow
                  >
                    {" "}
                    <div className="batch_educator">
                      <div className="batch_educator_container">
                        <IoMdTime className="course_detail_icon" />
                      </div>
                      <div className="batch-edu-details">
                        <p>Batch Validity</p>
                        <p className="batch-edu-lower">
                          {course?.data?.validity} Months
                        </p>
                      </div>
                    </div>
                  </Tooltip>{" "}
                  {course?.data?.isLive == "live" ? (
                    <Tooltip
                      title={
                        <span style={{ fontSize: "0.875rem", color: "#fff" }}>
                          Live Classes & Their Recordings
                        </span>
                      }
                      placement="top"
                      arrow
                    >
                      {" "}
                      <div className="batch_educator">
                        <div className="batch_educator_container">
                          <FaChromecast className="course_detail_icon" />
                        </div>
                        <div className="batch-edu-details">
                          <p>Live Classes</p>
                        </div>
                      </div>
                    </Tooltip>
                  ) : course?.data?.isLive == "recorded" ? (
                    <Tooltip
                      title={
                        <span style={{ fontSize: "0.875rem", color: "#fff" }}>
                          Recorderd Leatures
                        </span>
                      }
                      placement="top"
                      arrow
                    >
                      <div className="batch_educator">
                        <div className="batch_educator_container">
                          <MdOutlineLiveTv className="course_detail_icon" />
                        </div>
                        <div className="batch-edu-details">
                          <p>Recorded Lectures</p>
                        </div>
                      </div>
                    </Tooltip>
                  ) : (
                    course?.data?.isLive == "both" && (
                      <>
                        <Tooltip
                          title={
                            <span
                              style={{ fontSize: "0.875rem", color: "#fff" }}
                            >
                              Live Classes & Their Recordings
                            </span>
                          }
                          placement="top"
                          arrow
                        >
                          {" "}
                          <div className="batch_educator">
                            <div className="batch_educator_container">
                              <FaChromecast className="course_detail_icon" />
                            </div>
                            <div className="batch-edu-details">
                              <p>Live Lectures</p>
                            </div>
                          </div>
                        </Tooltip>
                        <Tooltip
                          title={
                            <span
                              style={{ fontSize: "0.875rem", color: "#fff" }}
                            >
                              Recorderd Leatures
                            </span>
                          }
                          placement="top"
                          arrow
                        >
                          <div className="batch_educator">
                            <div className="batch_educator_container">
                              <MdOutlineLiveTv className="course_detail_icon" />
                            </div>
                            <div className="batch-edu-details">
                              <p>Recorded Lectures</p>
                            </div>
                          </div>
                        </Tooltip>
                      </>
                    )
                  )}
                </div>{" "} */}

                <div className="course-detail-facility-container">
                  {course?.data?.batchFeatures.map((item, index) => (
                    <div
                      className="course-detail-facility-box"
                      key={index}
                      onClick={() => {
                        handleBatchFeature({ type: item?.feature });
                      }}
                    >
                      <img src={item.icon} alt="icon" />
                      <p>
                        {item.feature == "lecture" && "Live & Recorded Classes"}
                        {item.feature == "quiz" && "Mock Tests & Quizzes"}
                        {item.feature == "announcement" && "Announcements"}
                        {item.feature == "community" &&
                          "Community Group Discussion"}
                        {item.feature == "dpp" && "Daily Practice Platform"}
                        {item.feature == "note" && "Notes & Pdfs"}
                        {item.feature == "planner" && "Batch Planner"}
                        {![
                          "lecture",
                          "quiz",
                          "dpp",
                          "note",
                          "planner",
                          "community",
                          "announcement",
                        ]?.includes(item?.feature) && item?.feature}
                        {item?.feature == "planner" && (
                          <span
                            style={{
                              display: "block",
                              color: "var(--primaryColor)",
                            }}
                          >
                            <a
                              style={{ textDecoration: "none" }}
                              href="tel: 7428394519"
                            >
                              {" "}
                              Contact to Support
                            </a>
                          </span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="course_details_header_para">
                {/* <span>
                  <ul style={{ listStyleType: 'none' }}>
                    <li>
                      <ArrowCircleRightOutlinedIcon style={{ color: "#b042f5" }} />   Live Classess
                    </li>
                  </ul>

                </span> */}
                {/* <span
              <span className="details_batch">
                For {course?.data?.categoryDetails?.title}
              </span>
              <p className="course_details_header_para">
                {fullContentVisible
                  ? `${strippedString?.slice(0, 800)}`
                  : `${strippedString?.slice(0, 300)}...`}{" "}
                <span
                  onClick={toggleContentVisibility}
                  style={{ color: "red", fontWeight: "600", cursor: "pointer" }}
                >
                  {fullContentVisible ? "See Less" : "See More"}
                </span> */}
              </p>
            </div>
          </div>

          <p
            style={{ border: "1px solid var(--primaryColor)", opacity: "40%" }}
          ></p>

          <div
            className={`course_details_lower_header" ${isFixed ? "course_header_fix" : "course_details_lower_header"
              }`}
          >
            <div className="course_details_lower_left">
              {course?.data?.validities?.length > 0 && <h2>{course?.data?.validities?.length > 1 && "Select"  } {" "} Validity</h2>}
              <div>
                {" "}
                {course?.data?.validities?.map((item, index) => {
                  return (
                    <p
                      className="validity"
                      key={index}
                      style={{
                        background:
                          (item?.id == selectedValidity?.id ||
                            item?.id == selectedValidity?.validityId) &&
                          "var(--primaryColor)",
                        color:
                          (item?.id == selectedValidity?.id ||
                            item?.id == selectedValidity?.validityId) &&
                          "white",
                      }}
                      onClick={() => {
                        setSelectedValidity(item);
                        setValidityState(true);
                      }}
                    >
                      {item?.month} {
                        (item?.month == '5') ? "days" : "Months"
                      }
                    </p>
                  );
                })}
                <div>
                  {batchPlanData && batchPlanData?.length > 1 && (
                    <ValidityModal
                      setValidityState={setValidityState}
                      validityState={validityState}
                      freePurchaseCourses={freePurchaseCourses}
                      handleClickOpen={handleClickOpen}
                      data={batchPlanData}
                      course={course}
                      setSelectedValidity={setSelectedValidity}
                      selectedValidity={selectedValidity}
                      from="pre-login"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="course_details_lower_right tab-phone">
              <div>
                {" "}
                {parseInt(course?.data?.discount) > 0 &&
                  parseInt(course?.data?.amount) > 0 ? (
                  <span className="details_batch_amount">
                    <span
                      style={{ color: "var(--dimBlack)", fontSize: "1.3rem" }}
                    >
                      {" "}
                      ₹{selectedValidity?.salePrice}{" "}
                    </span>
                    &nbsp;
                    <del style={{ color: "var(--textGray)", fontSize: "1rem" }}>
                      ₹{selectedValidity?.regularPrice}
                    </del>{" "}
                    <br />
                    <span>
                      {" "}
                      (
                      {(
                        ((selectedValidity?.regularPrice -
                          selectedValidity?.salePrice) /
                          selectedValidity?.regularPrice) *
                        100
                      ).toFixed(0)}
                      % OFF)
                    </span>
                  </span>
                ) : (
                  <span className="details_batch_amount">Free</span>
                )}
              </div>

              <div>
                {" "}
                <button
                  onClick={() => {
                    if (course?.data?.amount == 0) {
                      freePurchaseCourses(course?.data?.id);
                      setTimeout(() => {
                        localStorage.setItem("index", 1);
                        navigate("/learning/my-courses");
                      }, 1500);
                    } else {
                      setFrom("");
                      handleClickOpen();
                    }
                  }}
                >
                  {" "}
                  Enroll Now
                </button>
                {course?.data?.isEmi && (
                  <span onClick={() => handleClickScroll()}>
                    {" "}
                    <p className="see_emi_option" id="see_emi_option">
                      View EMI Options
                    </p>
                  </span>
                )}
              </div>

              {/* <div className="batch_educator_container">

                <ShareButton url={window.location.href} title="Test">
                  <IoShareSocialOutline
                  className="course_detail_icon"
                  style={{ cursor: "pointer" }}
                  />
                </ShareButton>
              </div> */}
            </div>
          </div>
        </Wrapper>
      </div>

      {/* <div className="course_details_option_wrapper">
        <Wrapper>
          <div className="course_details_option_container">
            <div className="option_box">
              <div className="option_box_upper">
                <p>Live Classes</p>
                <MdOutlineCastForEducation className="option_box_icon" />
              </div>
              <div className="option_box_lower">
                <p>
                  Watch free online coaching classes by our best educators.{" "}
                </p>
              </div>
            </div>
            <div className="option_box">
              <div className="option_box_upper">
                <p>Language</p>
                <IoLanguageSharp className="option_box_icon" />
              </div>
              <div className="option_box_lower">
                <p>
                  {course?.data?.language === "en"
                    ? "English"
                    : course?.data?.language === "hi"
                    ? "Hindi"
                    : "English & Hindi"}
                </p>
              </div>
            </div>
            <div className="option_box">
              <div className="option_box_upper">
                <p>Batch Planner</p>
                <div className="download_course_btn">
                  {localStorage.getItem("isLoggedIn") &&
                  course?.data?.planner?.fileLoc != "" ? (
                    <button>
                      <a href={course?.data?.planner?.fileLoc}>
                        {" "}
                        <AiOutlineCloudDownload style={{ fontSize: "18px" }} />
                        Download Batch Planner{" "}
                      </a>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        window.open(
                          `https://wa.me/7428394519?text=${course?.data?.batchName}`
                        )
                      }
                    >
                      <AiOutlineWhatsApp style={{ fontSize: "18px" }} />
                      Contact to Support
                    </button>
                  )}
                </div>
              
              </div>
              <div className="option_box_lower">
                <p>
                  All the learning material you get when you join this batch
                </p>
              </div>
            </div>
          </div>
        </Wrapper>
      </div> */}

      <div className="discount_banner">
        <Wrapper>
          <DiscountBanner
            setSelectedValidity={setSelectedValidity}
            batchPlanData={batchPlanData}
            emiInstallment={emiInstallment}
            course={course?.data}
            selectedValidity={selectedValidity}
            payModal={location?.state?.payModal}
            setOpen={setOpen}
            open={open}
            from={from}
            data={course}
          />
        </Wrapper>
      </div>

      <div className="course_description" id="course_desc">
        <Wrapper>
          <CoursesDescription course={course?.data} />
        </Wrapper>
      </div>

      {storeProducts?.data1?.products?.length > 0 && (
        <div className="related-exambook">
          <Wrapper>
            <div className="related-exambook-upper">
              <h1>
                Related{" "}
                <span style={{ color: "var(--primaryColor)" }}>Exam Books</span>
              </h1>
              <p
                onClick={() => {
                  window.open(
                    `https://sdpublication.com/c/${storeProducts?.data1?.products?.[0]?.category?.slug}`
                  );
                }}
              >
                View All
              </p>
            </div>
            <div className="related-exambook-lower">
              <BookBox books={storeProducts} />
            </div>
          </Wrapper>
        </div>
      )}

      {course?.data?.teachers?.length > 0 ? (
        <div className="course_details_educators" id="more-teacher">
          <Wrapper>
            <TopEducators
              from="Course Details"
              list={lectures?.data?.faculty}
            />
          </Wrapper>
        </div>
      ) : (
        ""
      )}

      {/* {ebooks?.ebooks?.length > 0 && (
        <div className="recomm-ebooks">
          <Wrapper>
            <div className="recomm-ebooks-upper">
              <h1>
                Recommended{" "}
                <span style={{ color: "var(--primaryColor)" }}>E-Books</span>
              </h1>
              <p>View All</p>
            </div>
            <div className="recomm-ebooks-lower">
              <E_Book_Box ebooks={ebooks} />
            </div>
          </Wrapper>
        </div>
      )} */}

      {course?.data?.isEmi && (
        <div className="emi_plan_section" id="emi">
          <Wrapper>
            <EMI_Plan
              id="see_emi_option"
              course={course}
              // course={course?.data}
              // payModal={location?.state?.payModal}
              handleClickScrollForCallback={handleClickScrollForCallback}
              setEmiInstallment={setEmiInstallment}
              setFrom={setFrom}
              setOpen={setOpen}
              open={open}
              handleClickOpen={handleClickOpen}
            />
          </Wrapper>
        </div>
      )}
      {/* {
        lectures?.data?.batchLectures?.length > 0 ? <div className="free_live_classess">
          <Wrapper>
            <FreeLive Id={location?.state?.subCategorySlug} />
          </Wrapper>
        </div> : ""
      } */}

      <Modal
        open={openYT}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="video_player_box">
          <Container maxWidth="md">
            <div
              className="video_player_header"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <span onClick={handleClose}>
                <CloseIcon />
              </span>
            </div>

            <div className="playerDiv">
              {/* <ReactPlayer width={"100%"} height={300} url={demoLink} /> */}
              <VideoPlayer
                link={demoLink}
                type="Recorded"
                title={lectTitle}
                platform="yt"
                showControls={controls}
              />
            </div>
          </Container>
        </div>
      </Modal>

      <div className="top_educators_yt" data-aos="fade-right" id="liveclasses">
        <Wrapper>
          <div className="top_educators_yt" data-aos="fade-left">
            <h1>
              Demo <span style={{ color: "var(--primaryColor)" }}>Classes</span>
            </h1>
            <div className="top_educators_yt_container">
              {true ? (
                course?.data?.demoVideo?.map((item, index) => {
                  return (
                    <div
                      className="lecture-box"
                      style={{ cursor: "pointer", fontSize: "1.6rem" }}
                      key={index}
                      onClick={() => {
                        pushToDataLayer({
                          ecommerce: null,
                        });
                        pushToDataLayer({
                          isLoggedIn: localStorage?.getItem("isLoggedIn"),
                          event: "view_demo_video",
                          demo_video_url: item,
                          ecommerce: {},
                        });
                        handleOpen();
                        setlectTitle("Demo video");
                        setDemoLink(item);
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          src={item?.banner ? item?.banner : lectureImg}
                          alt="banner"
                          className="main-lecture-img purchase-lec-banner"
                        />
                      </div>
                      <div
                        className="lecture-descrip"
                        style={{ height: "60%" }}
                      >
                        <h1 style={{ color: "#000", fontSize: "1.1rem" }}>
                          {course?.data?.batchName} Demo Video {index + 1}
                        </h1>
                        {/* <div className="lecture-descrip-lower">
                          <div className="lec-right-descrip">
                            {" "}
                            <span>
                              By:{" "}
                              <span style={{ color: "var(--primaryColor)" }}>
                                Sanjay Sir
                              </span>
                           
                            </span>
                          </div>
                          <div className="lec-left-descrip">
                            <span style={{ color: "#000" }}>
                           
                            </span>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  );
                })
              ) : (
                // <NotFound title="Lecture" />
                <></>
              )}
            </div>
            {/* <Toaster /> */}
          </div>
        </Wrapper>
      </div>

      {/* <div className="book_counselling">
        <Wrapper>
          <BookCounselling />
        </Wrapper>
      </div> */}
      {/* 
      <div className="similar_courses">
        <Wrapper>
          <SimilarCourses course={course?.data?.stream} />
        </Wrapper>
      </div> */}
      <div className="testimonials_section">
        <Wrapper>
          <TestimonialNew />
        </Wrapper>
      </div>

      <div className="FAQ_Section">
        <Wrapper>
          {course?.data?.faqs?.length > 0 && (
            <NewAccordian data={course?.data?.faqs} staticData={false} />
          )}
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;
