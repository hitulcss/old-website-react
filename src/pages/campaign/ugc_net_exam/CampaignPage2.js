import React from "react";
import "./CampaignPage2.css";
import Navbar from "../../../components/Navbar/Navbar";
import Wrapper from "../../../components/Wrapper/Wrapper";
import Footer from "../../campaign/sections/footer/Footer";
import HeroSection from "../components/herosection/HeroSection";
import Expertise from "../components/expertise/Expertise";
import OfferCourses from "../components/offeredCourses/OfferCourses";
import Faculties from "../components/faculties/Faculties";
import Facilities from "../components/facilities/Facilities";
import Stars from "../components/jnv_stars/Stars";
import Testimonials from "../components/testimonials/Testimonials";
import Vision from "../components/ourVision/Vision";
import Journey from "../components/journey/Journey";
import Asset from "../components/asset/Asset";
import UGC_Exam from "../components/UGC_exam/UGC_Exam";
import Eligibility from "./eligibility/Eligibility";
import Pattern from "./pattern/Pattern";
import Dates from "./dates/Dates";
import Prepare from "../components/prepare/Prepare";
import CampaignCTA from "../../home/cta/CampaignCTA";
import { Toaster } from "react-hot-toast";
import heroImg from "../../../assets/campaign/herosec2.png";
import ugc2 from "../../../assets/campaign/ugc2.png";
import { HeadProvider, Title, Link, Meta } from "react-head";

const CampaignPage2 = () => {
  const ugc_exam = {
    title: "What is the UGC NET Exam?",
    p: [
      " The UGC NET Exam is an important test in India. It is also calledthe National Eligibility Test. This exam is organized twice a year, usually in June and December, by the National Testing Agenc (NTA). The NTA conducts the exam on behalf of the University Grants Commission (UGC).",
      " The UGC NET Exam is considered a very difficult and prestigious exam. It is taken by people who want to become assistant   professors or seek a Junior Research Fellowship (JRF) in universities and other institutions across India.",
      "Clearing this exam is crucial for those who wish to pursue a career in teaching or research at the university level in India. It tests the candidates' knowledge and aptitude in their  respective subjects, as well as their research abilities.",
    ],
  };

  return (
    <>
      <HeadProvider>
        <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
        <Meta name="viewport" content="width=device-width,initial-scale=1" />
        <Link rel="apple-touch-icon" href="https://www.sdcampus.com/logo.png" />
        <Link rel="manifest" href="./site.webmanifest" />
        <Title>Best UGC NET Online Coaching in India </Title>
        <Meta
          name="description"
          content="Are you struggling to crack UGC NET exam then no worry, SD Campus, India's best UGC NET Online Coaching has brought you the comprehnsive program for the examination. To know more, explore our courses or fill the form provided here."
        />
        <Meta
          name="keywords"
          content="SD, SD Campus, sdcampus, sd campus website, student's dream campus, sd empire"
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
          content="Best UGC NET Online Coaching in India"
        />
        <Meta
          property="og:description"
          content="Are you struggling to crack UGC NET exam then no worry, SD Campus, India's best UGC NET Online Coaching has brought you the comprehnsive program for the examination. To know more, explore our courses or fill the form provided here."
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
          content="Best UGC NET Online Coaching in India"
        />
        <Meta
          name="twitter:description"
          content="Are you struggling to crack UGC NET exam then no worry, SD Campus, India's best UGC NET Online Coaching has brought you the comprehnsive program for the examination. To know more, explore our courses or fill the form provided here. "
        />
        <Meta
          name="twitter:image"
          content="https://static.sdcampus.com/assets/app_download_1732957227.png"
        />
      </HeadProvider>
      <Toaster />
      <Navbar campaign={true} />
      <div className="campaign_wrapper">
        <div>
          <HeroSection imgSrc={heroImg} />
        </div>

        <section className="course_cta">
          <div>
            <CampaignCTA from="campaign" title='UGC NET Exams' />
          </div>
        </section>

        <div style={{ background: "rgba(10, 75, 122, 0.04)" }}>
          <Expertise />
        </div>

        <div>
          <Wrapper>
            {" "}
            <OfferCourses source="campaign2" slug="ugc-net-exams" />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            {" "}
            <Faculties />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            {" "}
            <Facilities />
          </Wrapper>
        </div>

        <div style={{ background: "rgba(133, 48, 125, 0.04)" }}>
          <Vision />
        </div>

        <div>
          <Wrapper>
            {" "}
            <Journey />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            <Asset />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            <UGC_Exam data={ugc_exam} imgSrc={ugc2} />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            <Eligibility />
          </Wrapper>
        </div>

        <div>
          <Wrapper>{/* <Pattern /> */}</Wrapper>
        </div>

        <div>
          <Wrapper>
            <Dates />
          </Wrapper>
        </div>

        <div style={{ background: "rgba(10, 75, 122, 0.04)" }}>
          <Prepare />
        </div>

        <div>
          <Wrapper>
            {" "}
            <Stars />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            {" "}
            <Testimonials />
          </Wrapper>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampaignPage2;
