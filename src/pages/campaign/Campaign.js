import React, { useContext, useState } from "react";
import "./Campaign.css";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import HeroSection from "./sections/heroSection/HeroSection";
import RegisterDemo from "./sections/registerDemo/RegisterDemo";
import AboutJNV from "./sections/aboutJNV/AboutJNV";
import Facilities from "./sections/facilities/Facilities";
import Footer from "./sections/footer/Footer";
import Faculties from "./components/faculties/Faculties";
import Stars from "./components/jnv_stars/Stars";
import Testimonials from "./components/testimonials/Testimonials";
import CampaignCTA from "../home/cta/CampaignCTA";
import { HeadProvider, Title, Link, Meta } from "react-head";

const Campaign = () => {
  return (
    <>
      <Navbar campaign={true} />
      <HeadProvider>
        <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
        <Meta name="viewport" content="width=device-width,initial-scale=1" />
        <Link rel="apple-touch-icon" href="https://www.sdcampus.com/logo.png" />
        <Link rel="manifest" href="./site.webmanifest" />
        <Title>India's No 1 JNV, Sainik, RMS & RIMC Coaching</Title>
        <Meta
          name="description"
          content="Are you looking for the best Sainik, JNV, RMS and RIMC Coaching for your child studying in Class 6 & Class 9? We at SD Campus offer India's 1st child mentorship program for students. Explore our new courses or fill the form, our support team will  contact you in 24 hrs. "
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
          content="SD Campus:India's No 1 JNV, Sainik, RMS & RIMC Coaching"
        />
        <Meta
          property="og:description"
          content="Are you looking for the best Sainik, JNV, RMS and RIMC Coaching for your child studying in Class 6 & Class 9? We at SD Campus offer India's 1st child mentorship program for students. Explore our new courses or fill the form, our support team will  contact you in 24 hrs. "
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
          content="SD Campus:India's No 1 JNV, Sainik, RMS & RIMC Coaching"
        />
        <Meta
          name="twitter:description"
          content="Are you looking for the best Sainik, JNV, RMS and RIMC Coaching for your child studying in Class 6 & Class 9? We at SD Campus offer India's 1st child mentorship program for students. Explore our new courses or fill the form, our support team will  contact you in 24 hrs. "
        />
        <Meta
          name="twitter:image"
          content="https://static.sdcampus.com/assets/app_download_1732957227.png"
        />
      </HeadProvider>

      <div className="campaign_wrapper">
        <Wrapper>
          <div>
            <HeroSection />

            <section className="course_cta">
              <div>
                <CampaignCTA from="campaign" title="School Entrance Exams" />
              </div>
            </section>
            <div>
              <RegisterDemo title="School Entrance Exams" />
            </div>

            {/* <div>
              <ExploreProgram />
            </div> */}

            <div>
              <AboutJNV />
            </div>

            <div>{/* <ExamPattern_Year /> */}</div>

            <div>{/* <ExamPattern_Class /> */}</div>

            <div>
              <Facilities />
            </div>

            <div>
              <Faculties />
            </div>

            <div>
              <Stars />
            </div>

            <div>
              <Testimonials />
            </div>
          </div>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default Campaign;
