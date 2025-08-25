import React from "react";
import "./Campaign3.css";
import Navbar from "../../../components/Navbar/Navbar";
import Wrapper from "../../../components/Wrapper/Wrapper";
import Footer from "../../campaign/sections/footer/Footer";
import HeroSection from "../components/herosection/HeroSection";
import Expertise from "../components/expertise/Expertise";
import OfferCourses from "../components/offeredCourses/OfferCourses";
import Faculties from "../components/faculties/Faculties";
import Facilities from "../components/facilities/Facilities";
import Vision from "../components/ourVision/Vision";
import Journey from "../components/journey/Journey";
import Asset from "../components/asset/Asset";
import UGC_Exam from "../components/UGC_exam/UGC_Exam";
import DelhiPolice from "./delhi_police/DelhiPolice";
import Salary from "./salary/Salary";
import SelectionProcess from "./selection_process/SelectionProcess";
import Prepare from "../components/prepare/Prepare";
import Stars from "../components/jnv_stars/Stars";
import Testimonials from "../components/testimonials/Testimonials";
import ExamPattern from "./delhi_exam_pattern/ExamPattern";
import DelhiPolice_Syllabus from "./delhi_police_syllabus/DelhiPolice_Syllabus";
import Tests from "./pe_mt_tests/Tests";
import CampaignCTA from "../../home/cta/CampaignCTA";
import { Toaster } from "react-hot-toast";
import hero2 from "../../../assets/campaign/hero2.png";
import { HeadProvider, Title, Link, Meta } from "react-head";
import ugc3 from "../../../assets/campaign/ugc3.png";

const Campaign3 = () => {
  const competitive_exam = {
    title: "Delhi Police Constable Recruitment 2024",
    p: [
      "SSC will release the Delhi Police Constable Recruitment Drive 2024 to hire new Constables (Executive) for both male and female candidates. This upcoming recruitment drive aims to fill more than 7,500 vacancies (tentative) for the position of Constable (Executive)",
      "Interested candidates can apply for the Delhi Police Constable Recruitment once the notification is released.",
    ],
  };

  return (
    <>
      <HeadProvider>
        <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
        <Meta name="viewport" content="width=device-width,initial-scale=1" />
        <Link rel="apple-touch-icon" href="https://www.sdcampus.com/logo.png" />
        <Link rel="manifest" href="./site.webmanifest" />
        <Title>
          India's No 1 Coaching for SSC, Railway, Delhi Police & All Government
          Exam
        </Title>
        <Meta
          name="description"
          content="Join SD Campus India's No 1 Coaching for SSC, Railway, Delhi Police and All Government Exam preparation. We provide target batch for all competitive exam with Live and Recorded lecture facilities, Regular Doubt sessions, DPPs, Mock Tests and many more. "
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
          content="India's No 1 Coaching for SSC, Railway, Delhi Police & All Government Exam"
        />
        <Meta
          property="og:description"
          content="Join SD Campus India's No 1 Coaching for SSC, Railway, Delhi Police and All Government Exam preparation. We provide target batch for all competitive exam with Live and Recorded lecture facilities, Regular Doubt sessions, DPPs, Mock Tests and many more. "
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
          content="India's No 1 Coaching for SSC, Railway, Delhi Police & All Government Exam"
        />
        <Meta
          name="twitter:description"
          content="Join SD Campus India's No 1 Coaching for SSC, Railway, Delhi Police and All Government Exam preparation. We provide target batch for all competitive exam with Live and Recorded lecture facilities, Regular Doubt sessions, DPPs, Mock Tests and many more. "
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
          <HeroSection imgSrc={hero2} />
        </div>

        <div style={{ background: "rgba(10, 75, 122, 0.04)" }}>
          <Expertise />
        </div>

        <section className="course_cta">
          <div>
            <CampaignCTA from="campaign" title='Competitive Exam' />
          </div>
        </section>
        <div>
          <Wrapper>
            {" "}
            <OfferCourses source="campaign2" slug="competitive-exam" />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            {" "}
            <Faculties />
          </Wrapper>
        </div>

        <div>
          <Facilities />
        </div>

        <div style={{ background: "rgba(133, 48, 125, 0.04)" }}>
          <Vision />
        </div>

        <div>
          <Journey />
        </div>

        <div>
          <Asset />
        </div>

        <div>
          <Wrapper>
            {" "}
            <UGC_Exam data={competitive_exam} imgSrc={ugc3} />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            {" "}
            <DelhiPolice />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            {" "}
            <Salary />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            {" "}
            <SelectionProcess />
          </Wrapper>
        </div>

        <div style={{ background: "rgba(10, 75, 122, 0.04)" }}>
          <Wrapper>
            {" "}
            <ExamPattern />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            {" "}
            <DelhiPolice_Syllabus />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            {" "}
            <Tests />
          </Wrapper>
        </div>

        <div style={{ background: "rgba(10, 75, 122, 0.04)" }}>
          {" "}
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

export default Campaign3;
