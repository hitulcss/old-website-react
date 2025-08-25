import React, { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import Wrapper from "../../components/Wrapper/Wrapper";
import Explore from "./discover/Discover";
import Banner from "./banner/Banner";
import TopEducators from "./topEducators/TopEducators";
import WhySD from "./sdCampus/WhySD";
import Love from "./love/Love";
import Testimonial from "./testimonial/Testimonial";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { CoursesData } from "../../context/courses/Courses";
import { Toaster } from "react-hot-toast";
import Cookie from "../../components/Cookies/Cookie";
import NameModal from "../../components/NameModal/NameModal";
import StreamUpdate from "../../components/StreamModal/StreamUpdate";
import Centers from "./campus_centers/Centers";
import Result from "./results/Result";
import { HeadProvider, Title, Link, Meta } from "react-head";
import QualityCourse from "./quality_course/QualityCourse";
import Channel from "./channels/Channel";
import FreeLearning from "./free_learning/FreeLearning";
// import { CoursesData } from "../../context/courses/Courses";
import UseModal from "./cta/BatchCTA";
import USP from "./campus_USP/USP";
import CounsellingCTA from "./cta/CounsellingCTA";
import OnlinePrepare from "./online_prepration/OnlinePrepare";
import EmailNotifiPopup from "../../components/EmailPopup/EmailNotifiPopup";
import AddEmailPopup from "../../components/EmailPopup/AddEmailPopup";
import NamePopup from "../../components/NamePopup/NamePopup";
import PushNoti from "../../components/NotificationPopup/PushNoti";
import { pushToDataLayer } from "../../gtm/gtm";
import CategoryPopup from "../../components/CategoryPopup/CategoryPopup";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import NewAccordian from "../../components/Accordian/NewAccordian";
import TestimonialNew from "./testimonial/TestimonialNew";

const HomePage = () => {
  const [clicked, setClicked] = useState("All");

  const {
    getCourses,
    courses,
    getAllCategory,
    category,
    getBanner,
    banner,
    selectedCategory,
    setSelectedCategory,
    getSiteMap,
    getCTABanners,
    showPopups,
    setShowPopups,
    setDrawerOpen,
    selectedCategoryId,
  } = useContext(CoursesData);

  const details = JSON.parse(localStorage.getItem("details"));
  const isNameAdded = details?.name;
  const isStreamAdded = details?.stream;

  const [updateName, setUpdateName] = useState(false);
  const [updateStream, setUpdateStream] = useState(false);
  useEffect(() => {
    // setTimeout(() => {
    //   if (isNameAdded == "" || isNameAdded == "Name") {
    //     setUpdateName(true);
    //   }
    // }, 3000);

    setTimeout(() => {
      if (isStreamAdded?.length == 0) {
        setUpdateStream(true);
      }
    }, 6000);
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) setIsSmallScreen(true);
      else {
        setIsSmallScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // setSelectedCategory("All");
    getAllCategory();
  }, []);
  useEffect(() => {
    if (window.innerWidth < 450) {
      getBanner(selectedCategoryId, "APP");
    } else {
      getBanner(selectedCategoryId, "WEB");
    }
    getCTABanners("home", "");
  }, [isSmallScreen]);

  // console.log(selectedCategory)

  //page event

  let first = false;
  useEffect(() => {
    if (!first) {
      pushToDataLayer({
        ecommerce: null, // Clear the previous ecommerce object.
      });
      pushToDataLayer({
        event: "view_page",
        page: "Home Page",
        isLoggedIn: localStorage?.getItem("isLoggedIn"),
        // current_stream_id: item?.id,

        ecommerce: {},
      });
    }
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  let utm_campaign = searchParams.get("utm_campaign");
  let utm_source = searchParams.get("utm_source");
  let utm_medium = searchParams.get("utm_medium");

  //deep linking
  let route = searchParams.get("route");

  const navigate = useNavigate()
  useEffect(() => {

    //batch
    if (route == 'batchbyid') {
      let slug = searchParams.get("slug")
      navigate(`/${slug}`);
    }

    //quick-learning video
    if (route == 'quicklearningById') {
      let rootId = searchParams.get("rootId")
      navigate(`/learning/short-learning/short/${rootId}`);
    }

    //quick learning channel
    if (route == 'quicklearningChannel') {
      let rootId = searchParams.get("rootId")
      navigate(`/learning/learning-profile/${rootId}`);
    }

    //feed
    if (route == 'feedById') {
      let rootId = searchParams.get("rootId")
      navigate(`/learning/feed-details/${rootId}`);
    }

  }, [route])

  useEffect(() => {
    if (utm_campaign) {
      Cookies.set("utm_campaign", utm_campaign, { expires: 7 });
    } else {
      Cookies.set("utm_campaign", "cta_form", { expires: 7 });
    }
    if (utm_source) {
      Cookies.set("utm_source", utm_source, { expires: 7 });
    } else {
      Cookies.set("utm_source", "sdcampusweb", { expires: 7 });
    }
    if (utm_medium) {
      Cookies.set("utm_medium", utm_medium, { expires: 7 });
    } else {
      Cookies.set("utm_medium", "cta_form", { expires: 7 });
    }
  }, [utm_campaign, utm_source, utm_medium]);
  return (
    <>
      <div className="home-scroll">
        <HeadProvider>
          <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
          <Meta name="viewport" content="width=device-width,initial-scale=1" />
          <Link
            rel="apple-touch-icon"
            href="https://www.sdcampus.com/logo.png"
          />
          <Link rel="manifest" href="./site.webmanifest" />
          <Title>
            SD Campus: India’s Most Affordable Ed-tech Platform for School and
            Government Entrance Examinations
          </Title>
          <Meta
            name="description"
            content="SD Campus is India’s premier online learning platform. Trusted by thousands of students, SD Campus provides quality learning programs for school students for JNV and Sainik School admission tests. Apart from that we also provide Online Coaching for various government competitive exams including SSC, Defence, Teaching, Railway, Police, etc."
          />
          <Meta
            name="keywords"
            content="SD, SD Campus, sdcampus, sd campus website, student's dream campus"
          />
          <Meta
            name="robots"
            content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          />
          <Link rel="canonical" href={window.location.href} />
          <Meta property="og:locale" content="en_US" />
          <Meta property="og:site_name" content="SD Campus" />
          <Meta property="og:type" content="website" />
          <Meta
            property="og:title"
            content="SD Campus:India’s Most Affordable Ed-tech Platform for School and Government Entrance
    Examinations"
          />
          <Meta
            property="og:description"
            content="SD Campus is India’s premier online learning platform. Trusted by thousands of students, SD Campus provides quality learning programs for school students for JNV and Sainik School admission tests. Apart from that we also provide Online Coaching for various government competitive exams including SSC, Defence, Teaching, Railway, Police, etc."
          />
          <Meta
            property="og:image"
            content="https://static.sdcampus.com/assets/app_download_1732957227.png"
          />
          <Meta property="og:image:width" content="560" />
          <Meta property="og:image:height" content="292" />
          <Meta property="og:url" content={window.location.href} />
          <Meta name="twitter:card" content="summary_large_image" />
          <Meta
            name="twitter:title"
            content="SD Campus:India’s Most Affordable Ed-tech Platform for School and Government
    Entrance Examinations"
          />
          <Meta
            name="twitter:description"
            content="SD Campus is India’s premier online learning platform. Trusted by thousands of students, SD Campus provides quality learning programs for school students for JNV and Sainik School admission tests. Apart from that we also provide Online Coaching for various government competitive exams including SSC, Defence, Teaching, Railway, Police, etc."
          />
          <Meta
            name="twitter:image"
            content="https://static.sdcampus.com/assets/app_download_1732957227.png"
          />
        </HeadProvider>

        <Navbar />
        <Toaster />
        <StreamUpdate
          updateStream={updateStream}
          setUpdateStream={setUpdateStream}
        />
        <NameModal updateName={updateName} setUpdateName={setUpdateName} />

        {/* Popups */}

        <div className="email-notifi-home-page">
          {showPopups?.category && (
            <CategoryPopup setShowPopups={setShowPopups} />
          )}
          {showPopups?.email && (
            <EmailNotifiPopup setShowPopups={setShowPopups} />
          )}
          {showPopups?.addEmail && (
            <AddEmailPopup setShowPopups={setShowPopups} />
          )}
          {showPopups?.pushNotification && (
            <PushNoti setShowPopups={setShowPopups} />
          )}
          {showPopups?.name && <NamePopup setShowPopups={setShowPopups} />}
        </div>

        <section className="hero_section">
          <Banner banner={banner?.data} />
        </section>

        <section className="explore_learning">
          <Wrapper>
            <Explore
              category={category?.data}
              setSelectedCategory={setSelectedCategory}
              setClicked={setClicked}
              title="Learning"
            />
          </Wrapper>
        </section>

        <section className="why_sd_section">
          <Wrapper>
            <WhySD />
          </Wrapper>
        </section>
        {/* <section className="top_courses">
        <Wrapper>
          <TopCourses
            courses={courses?.data}
            category={category?.data}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            clicked={clicked}
            setClicked={setClicked}
          />
        </Wrapper>
      </section> */}

        <section className="course_cta">
          <div>
            <UseModal from='home' />
          </div>
        </section>

        <section className="course_cta">
          <div>
            <CounsellingCTA from="home-page" />
            {/* <CounsilingPopup from="home-page" /> */}
          </div>
        </section>

        <section className="quality_courses_section">
          <Wrapper>
            <QualityCourse />
          </Wrapper>
        </section>

        <section className="USP_section">
          <Wrapper>
            <USP />
          </Wrapper>
        </section>

        <section className="campus_center_section">
          <Wrapper>
            <Centers />
          </Wrapper>
        </section>

        <section className="top_educators">
          <Wrapper>
            <TopEducators from="Home Page" />
          </Wrapper>
        </section>

        <section className="results_section">
          <Wrapper>
            <Result />
          </Wrapper>
        </section>

        <section className="our_students_parents_love">
          <Wrapper>
            <Love />
          </Wrapper>
        </section>

        <section className="channel_section">
          <Wrapper>
            <Channel />
          </Wrapper>
        </section>

        {/* <section className="popular_exams">
        <Wrapper>
          <PopularExams title="Exams" />
        </Wrapper>
      </section> */}

        {/* 
      <section className="refer_section">
        <Wrapper>
          <Refer />
        </Wrapper>
      </section> */}

        <section className="free_learning_section">
          <Wrapper>
            <FreeLearning />
          </Wrapper>
        </section>
        {/* <section className="learn_section">
          <Wrapper>
            <Learn />
          </Wrapper>
        </section> */}
        <section className="lonline_preprtion">
          <Wrapper>
            <OnlinePrepare />
          </Wrapper>
        </section>
        <section className="testimonials_section">
          <Wrapper>
            <TestimonialNew />
          </Wrapper>
        </section>

        <div>
          <Wrapper>
            <NewAccordian />
          </Wrapper>
        </div>

        {/* <section className="learning_junction_section">
        <Wrapper>
          <LearningJunction />
        </Wrapper>
      </section> */}

        <Wrapper> {/* <YT_Player /> */}</Wrapper>

        {/* <Cookie /> */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
