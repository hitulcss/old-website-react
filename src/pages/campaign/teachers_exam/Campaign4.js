import React from "react";
import "./Campaign4.css";
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
import Stars from "../components/jnv_stars/Stars";
import Testimonials from "../components/testimonials/Testimonials";
import Recruitment from "./recruitment/Recruitment";
import Vacancy from "./vacancy/Vacancy";
import EntranceExam from "./entrance_exam/EntranceExam";
import EligibilityTest from "./eligibility_test/EligibilityTest";
import StateTET from "./state_TET/StateTET";
import NET_Test from "./net_test/NET_Test";
import CampaignCTA from "../../home/cta/CampaignCTA";
import { Toaster } from "react-hot-toast";
import hero3 from "../../../assets/campaign/hero3.png";
import ugc4 from "../../../assets/campaign/ugc4.png";

import { HeadProvider, Title, Link, Meta } from "react-head";
const Campaign4 = () => {
  const teaching_exam = {
    title: "Teaching Recruitment Exams",
    p: [
      "   In India, central and state governments conduct teaching exams to appoint teachers and professors across the country. If you want to apply for a government teaching job or become a professor, you need to clear certain eligibility tests. These tests are mandatory for candidates aspiring to work as teachers or professors in government institutions.",
      "Below, we have provided the list of all Teaching Recruitment Exams including central as well as state entrance.",
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
          India's Best TET Coaching for DSSSB, UPTET, BPSC TRE & Chandigarh JBT
        </Title>
        <Meta
          name="description"
          content="Join India's best TET online coaching for DSSSB TGT, PRT, PGT,  UPTET, BPSC & Chandigarh JBT preparation. SD Campus offers Live & Recorded Classes, DPPs, Mock Test, Doubt Classes etc at one platform."
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
          content="India's Best TET Coaching for DSSSB, UPTET, BPSC TRE & Chandigarh JBT"
        />
        <Meta
          property="og:description"
          content="Join India's best TET online coaching for DSSSB TGT, PRT, PGT,  UPTET, BPSC & Chandigarh JBT preparation. SD Campus offers Live & Recorded Classes, DPPs, Mock Test, Doubt Classes etc at one platform."
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
          content="India's Best TET Coaching for DSSSB, UPTET, BPSC TRE & Chandigarh JBT"
        />
        <Meta
          name="twitter:description"
          content="Join India's best TET online coaching for DSSSB TGT, PRT, PGT,  UPTET, BPSC & Chandigarh JBT preparation. SD Campus offers Live & Recorded Classes, DPPs, Mock Test, Doubt Classes etc at one platform."
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
          <HeroSection imgSrc={hero3} />
        </div>

        <section className="course_cta">
          <div>
            <CampaignCTA from="campaign" title='Teaching Exams' />
          </div>
        </section>

        <div style={{ background: "rgba(10, 75, 122, 0.04)" }}>
          <Expertise />
        </div>

        <div>
          <Wrapper>
            {" "}
            <OfferCourses source="campaign2" slug="tet-online-coaching" />
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
            <UGC_Exam data={teaching_exam} imgSrc={ugc4} />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            {" "}
            <Recruitment />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            {" "}
            <Vacancy />
          </Wrapper>
        </div>

        <div style={{ background: "rgba(10, 75, 122, 0.04)" }}>
          <Wrapper>
            <EligibilityTest />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            <StateTET />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            <NET_Test />
          </Wrapper>
        </div>

        <div>
          <Wrapper>
            <EntranceExam />
          </Wrapper>
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

export default Campaign4;
